import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, userId } = req.body;

    let lang = {};

    async function getUserInfo() {
      //find the username
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error getting username:", error);
        return res.status(500).json({ message: "Error getting username" });
      }

      // const { data: languages, error: languagesError } = await supabase
      //   .from("languages")
      //   .select("language_id")
      //   .eq("user_id", userId);

      // if (languagesError) {
      //   console.error("Error getting user languages:", languagesError);
      //   return res
      //     .status(500)
      //     .json({ message: "Error getting user languages" });
      // }

      // const languageIds = languages.map((lang) => lang.language_id);

      // //find all words where the language ID is present in the languages array. Number of returned rows is number of all words added by user
      // let allLanguages = [];
      // let from = 0;
      // let chunkSize = 1000;
      // let keepGoing = true;

      // while (keepGoing) {
      //   const to = from + chunkSize - 1;

      //   const { data: getWordChunk, error: getWordChunkError } = await supabase
      //     .from("dictionary")
      //     .select("*")
      //     .in("language_id", languageIds)
      //     .range(from, to);

      //   if (getWordChunkError) {
      //     console.error("Error getting user word count:", getWordChunkError);
      //     return res.status(500).json({ message: "Error getting word count" });
      //   }

      //   if (getWordChunk.length === 0) {
      //     keepGoing = false;
      //   } else {
      //     allLanguages = allLanguages.concat(getWordChunk);
      //     from += chunkSize;
      //   }
      // }

      // const wordCount = allLanguages.length;

      if (!data || data.length === 0) {
        return res.status(200).json({
          loggedIn: false,
          username: null,
          totalWordCount: 0,
          userLanguage: null,
        });
      }

      return {
        username: data[0].username,
       // totalWordCount: wordCount,
        userLanguage: data[0].interface_language,
      };
    }

    async function getWord() {
      // 1️⃣ FIRST QUERY → Get the word itself
      const { data: wordRows, error: wordError } = await supabase
        .from("dictionary")
        .select("*")
        .eq("word_id", id)
        .limit(1);

      if (wordError || !wordRows?.length) {
        console.error("Word error:", wordError);
        return res.status(404).json({ message: "Word not found" });
      }

      const word = wordRows[0];
      const langId = word.language_id;

      // 2️⃣ SECOND + THIRD QUERIES → Run in parallel
      const [
        { data: variants, error: variantsError },
        { data: langRows, error: langError },
      ] = await Promise.all([
        supabase
          .from("dictionary")
          .select("word, word_id")
          .filter("variant_of->>word_id", "eq", id.toString()),

        supabase
          .from("languages")
          .select("*")
          .eq("language_id", langId)
          .limit(1),
      ]);

      if (langError || !langRows?.length) {
        console.error("Language error:", langError);
        return res.status(500).json({ message: "Language not found" });
      }

      lang = langRows[0];

      // 3️⃣ Permission logic
      let privacy = false;
      let permission = false;

      if (lang.privacy !== "private") {
        privacy = true;
      }

      if (lang.user_id == userId) {
        privacy = true;
        permission = true;
      }

      const isCollaborator = lang.collaborators?.some(
        (c) => c.user_id == userId,
      );

      if (isCollaborator) {
        privacy = true;
        permission = true;
      }

      return {
        wordData: { ...word, variants: variants || [] },
        languageData: lang,
        privacy,
        permission,
      };
    }

    async function getAllWords() {
      const BATCH_SIZE = 1000;
      let from = 0;
      let to = BATCH_SIZE - 1;
      let allWords = [];
      let hasMore = true;

      while (hasMore) {
        const { data, error, count } = await supabase
          .from("dictionary")
          .select("*")
          .eq("language_id", id)
          .range(from, to);

        if (error) {
          console.error("Error getting batch:", error);
          res.status(500).json({ message: "Error getting words" });
          return;
        }

        allWords = allWords.concat(data);
        hasMore = data.length === BATCH_SIZE;
        from += BATCH_SIZE;
        to += BATCH_SIZE;
      }

      allWords.sort((a, b) => a.word.localeCompare(b.word));
      return allWords;
    }

    async function getCognates() {
      // Step 1: find the ancestor of the word if it is not derived
      const { data: etymologyRows, error: etymError } = await supabase
        .from("etymology")
        .select("*")
        .eq("word_id", id);

      if (etymError) {
        console.error("Error fetching etymology rows:", etymError);
        return res
          .status(500)
          .json({ message: "Failed to fetch etymology rows" });
      }

      if (
        etymologyRows[0] &&
        etymologyRows[0].etymology_type === "fromMother"
      ) {
        const { data: motherRows, error: motherRowsError } = await supabase
          .from("etymology")
          .select("")
          .eq("mother_word_id", etymologyRows[0].mother_word_id);

        //now that the ancestor word has been found, find all words which also list this as mother word or loan word

        const { data: cognateRows, error: cognateRowsError } = await supabase
          .from("etymology")
          .select("*")
          .or(
            `mother_word_id.eq.${motherRows[0].mother_word_id},loanword_id.eq.${motherRows[0].mother_word_id}`,
          )
          .neq("word_id", id);

       // let resultArr = [];

        const wordIds = cognateRows.map((row) => row.word_id);

        const { data: words, error: wordsError } = await supabase
          .from("dictionary")
          .select("*")
          .in("word_id", wordIds);

        if (wordsError) {
          console.error(wordsError);
          return [];
        }

        let languageNameArr = [];
        const languageIds = [...new Set(words.map((w) => w.language_id))];

        const { data: languages, error: languageError } = await supabase
          .from("languages")
          .select("language_id, language_name, is_proto")
          .in("language_id", languageIds);

        if (languageError) {
          console.error("Error fetching language:", error);
         // resultArr[i]["language_name"] = null; // Fallback if error occurs
        }

        const languageLookup = {};


languages.forEach((lang) => {
  languageLookup[lang.language_id] = {
    language_name: lang.language_name,
    is_proto: lang.is_proto,
  };
});

       const resultArr = words.map((word) => {
  const meanings = [
    word.noun_meaning,
    word.num_meaning,
    word.verb_meaning,
    word.adj_meaning,
    word.pron_meaning,
    word.adv_meaning,
    word.adp_meaning,
    word.interj_meaning,
    word.conj_meaning,
    word.part_meaning,
  ]
    .filter(Array.isArray)
    .flat();

  return {
    ...word,
    language_name: languageLookup[word.language_id]?.language_name ?? null,
    is_proto: languageLookup[word.language_id]?.is_proto ?? false,
    meaning: meanings,
  };
});
        return resultArr;
      }
    }

    async function getDerivations() {
      // Step 1: Get all etymology rows for this word
      const { data: etymologyRows, error: etymError } = await supabase
        .from("etymology")
        .select("*")
        .or(
          `first_element_id.eq.${id},second_element_id.eq.${id},third_element_id.eq.${id}`,
        );

      if (etymError) {
        console.error("Error fetching etymology rows:", etymError);
        return res
          .status(500)
          .json({ message: "Failed to fetch etymology rows" });
      }

      

      // Step 1: Gather all IDs
      const wordIds = etymologyRows.map((e) => e.word_id);

      // Step 2: Single query for all words
      const { data: allEntries, error } = await supabase
        .from("dictionary")
        .select(
          `
    word_id,
    word,
    noun_meaning,
    num_meaning,
    verb_meaning,
    adj_meaning,
    adv_meaning,
    adp_meaning,
    pron_meaning,
    interj_meaning,
    conj_meaning,
    part_meaning,
    affix_meaning
  `,
        )
        .in("word_id", wordIds);

      if (error) {
        console.error("Error fetching dictionary entries:", error);
        return [];
      }

      // Step 3: Map by ID for quick lookup
      const entryMap = new Map(allEntries.map((e) => [e.word_id, e]));
      // Step 4: Build results array
      const results = etymologyRows
        .map((etym) => {
          const entry = entryMap.get(etym.word_id);
          if (!entry) return null;

          const meanings = [
            ...(entry.noun_meaning || []),
            ...(entry.num_meaning || []),
            ...(entry.verb_meaning || []),
            ...(entry.adj_meaning || []),
            ...(entry.adv_meaning || []),
            ...(entry.adp_meaning || []),
            ...(entry.pron_meaning || []),
            ...(entry.interj_meaning || []),
            ...(entry.conj_meaning || []),
            ...(entry.part_meaning || []),
            ...(entry.affix_meaning || []),
          ];


          return ({
            derived_word_id: etym.word_id,
            word: entry.word,
            meaning: meanings.join(", "),
            noun_meaning: entry.noun_meaning,
            num_meaning: entry.num_meaning,
            verb_meaning: entry.verb_meaning,
            adj_meaning: entry.adj_meaning,
            adv_meaning: entry.adv_meaning,
            adp_meaning: entry.adp_meaning,
            pron_meaning: entry.pron_meaning,
            part_meaning: entry.part_meaning,
            interj_meaning: entry.interj_meaning,
            conj_meaning: entry.conj_meaning,
            affix_meaning: entry.affix_meaning,
            is_first_element: etym.first_element_id === id,
            is_second_element: etym.second_element_id === id,
            is_third_element: etym.third_element_id === id,
          });
        })
        .filter(Boolean);

      return results;
    }

    async function getSynonyms(selectedWord) {
      //getSynonyms
      const { data: words, error: wordError } = await supabase
        .from("dictionary")
        .select("*")
        .eq("language_id", lang.language_id);

      if (wordError) {
        console.error("Error fetching word:", etymError);
        return res.status(500).json({ message: "Failed to fetch word" });
      }

      //match meanings to meanings of other words

      let synonyms = [];

      const matchWords = (arr1, arr2, word, synonym) => {
        if (arr1 && arr2) {
          const isMatch = arr1.some((item) => arr2.includes(item));

          if (
            isMatch &&
            synonym !== word.word &&
            !synonyms.includes(word.word)
          ) {
            //exclude the word from matching with itself
            synonyms.push(word);
          }
        }
      };

      words.forEach((word) => {
        if (word.noun_meaning && selectedWord.noun_meaning) {
          matchWords(
            word.noun_meaning,
            selectedWord.noun_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.num_meaning && selectedWord.num_meaning) {
          matchWords(
            word.num_meaning,
            selectedWord.num_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.verb_meaning && selectedWord.verb_meaning) {
          matchWords(
            word.verb_meaning,
            selectedWord.verb_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.adj_meaning && selectedWord.adj_meaning) {
          matchWords(
            word.adj_meaning,
            selectedWord.adj_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.adv_meaning && selectedWord.adv_meaning) {
          matchWords(
            word.adv_meaning,
            selectedWord.adv_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.adp_meaning && selectedWord.adp_meaning) {
          matchWords(
            word.adp_meaning,
            selectedWord.adp_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.conj_meaning && selectedWord.conj_meaning) {
          matchWords(
            word.conj_meaning,
            selectedWord.conj_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.interj_meaning && selectedWord.interj_meaning) {
          matchWords(
            word.interj_meaning,
            selectedWord.interj_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.pron_meaning && selectedWord.pron_meaning) {
          matchWords(
            word.part_meaning,
            selectedWord.part_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.part_meaning && selectedWord.part_meaning) {
          matchWords(
            word.part_meaning,
            selectedWord.part_meaning,
            word,
            selectedWord.word,
          );
        }

        if (word.affix_meaning && selectedWord.affix_meaning) {
          matchWords(
            word.affix_meaning,
            selectedWord.affix_meaning,
            word,
            selectedWord.word,
          );
        }
      });

      synonyms.forEach((synonym) => {
        let synonymMeaning = [];

        const mergeMeanings = (meaning) => {
          if (meaning) {
            meaning.forEach((i) => synonymMeaning.push(i));
          }
        };

        if (synonym.noun_meaning) mergeMeanings(synonym.noun_meaning);
        if (synonym.num_meaning) mergeMeanings(synonym.num_meaning);
        if (synonym.verb_meaning) mergeMeanings(synonym.verb_meaning);
        if (synonym.adj_meaning) mergeMeanings(synonym.adj_meaning);
        if (synonym.adp_meaning) mergeMeanings(synonym.adp_meaning);
        if (synonym.part_meaning) mergeMeanings(synonym.part_meaning);
        if (synonym.pron_meaning) mergeMeanings(synonym.pron_meaning);
        if (synonym.conj_meaning) mergeMeanings(synonym.conj_meaning);
        if (synonym.interj_meaning) mergeMeanings(synonym.interj_meaning);
        if (synonym.affix_meaning) mergeMeanings(synonym.affix_meaning);
        if (synonym.adv_meaning) mergeMeanings(synonym.adv_meaning);

        synonym["meaning"] = synonymMeaning;
      });

      return synonyms;
    }

    async function getMotherLanguage(lang) {
     
        const motherId = lang.mother_language_id;

        if (motherId) {
          const { data: getMother, error: getMotherError } = await supabase
            .from("languages")
            .select("*")
            .eq("language_id", motherId);


         return {
            language_id: getMother[0].language_id,
            language_name: getMother[0].language_name,
            mother_language_id: getMother[0].mother_language_id,
            is_proto: getMother[0].is_proto
          };
        } 
      
    }

    async function getDescendants(selectedWord) {
      // Step 1: Get all etymology rows for this word
      const { data: etymologyRows, error: etymError } = await supabase
        .from("etymology")
        .select("*")
        .or(`mother_word_id.eq.${id},loanword_id.eq.${id}`);
        //.eq("mother_word_id", id)


      if (etymError) {
        console.error("Error fetching etymology rows:", etymError);
        return res
          .status(500)
          .json({ message: "Failed to fetch etymology rows" });
      }

      const wordIds = etymologyRows.map((row) => row.word_id);

      const { data: words, error: wordError } = await supabase
        .from("dictionary")
        .select(
          `
      word_id,
      word,
      word_type,
      language_id,
      noun_meaning,
      num_meaning,
      verb_meaning,
      adj_meaning,
      adv_meaning,
      adp_meaning,
      pron_meaning,
      interj_meaning,
      conj_meaning,
      part_meaning,
      affix_meaning
  `,
        )
        .in("word_id", wordIds);

      if (wordError) {
        console.error(wordError);
        return [];
      }

      const languageIds = [...new Set(words.map((w) => w.language_id))];

      const { data: languages, error: languageError } = await supabase
        .from("languages")
        .select("language_id, language_name, is_proto")
        .in("language_id", languageIds);

      if (languageError) {
        console.error(languageError);
        return [];
      }

      const wordLookup = {};

      words.forEach((word) => {
        wordLookup[word.word_id] = word;
      });

      const languageLookup = {};

      languages.forEach((lang) => {
        languageLookup[lang.language_id] = lang;
      });

      const results = etymologyRows
        .map((etym) => {
          const word = wordLookup[etym.word_id];

          if (!word) return null;

          const language = languageLookup[word.language_id];

          const meanings = [
            word.noun_meaning,
            word.num_meaning,
            word.verb_meaning,
            word.adj_meaning,
            word.adv_meaning,
            word.adp_meaning,
            word.pron_meaning,
            word.interj_meaning,
            word.conj_meaning,
            word.part_meaning,
            word.affix_meaning,
          ]
            .filter(Array.isArray)
            .flat()
            .join(", ");

          return {
            descendant_word_id: etym.word_id,
            etymology_type: etym.etymology_type,

            word_id: word.word_id,
            word: word.word,

            meaning: meanings,

            noun_meaning: word.noun_meaning,
            num_meaning: word.num_meaning,
            verb_meaning: word.verb_meaning,
            adj_meaning: word.adj_meaning,
            adv_meaning: word.adv_meaning,
            adp_meaning: word.adp_meaning,
            pron_meaning: word.pron_meaning,
            part_meaning: word.part_meaning,
            interj_meaning: word.interj_meaning,
            conj_meaning: word.conj_meaning,
            affix_meaning: word.affix_meaning,

            word_type: word.word_type,

            language_name: language?.language_name ?? null,
            is_proto: language?.is_proto ?? false,
          };
        })
        .filter(Boolean);

      return results;
    }


    const word = await getWord();

   const [
     userInfo,
      allWords,
      motherLanguage,
      synonyms,
      derivations,
      descendants,
      cognates,
    ] = await Promise.all([
      getUserInfo(),
      getAllWords(),
      getMotherLanguage(lang),
      getSynonyms(word),
      getDerivations(),
      getDescendants(),
      getCognates(),
    ]);


    return res.status(200).json({
      userInfo,
      word,
      allWords,
      motherLanguage,
      cognates,
      descendants,
      derivations,
      synonyms,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
}
