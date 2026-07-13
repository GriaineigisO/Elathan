import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const {
        date,
        wordId,
        userId,
        languageId,
        word,
        meanings,
        wordType,
        note,
        inflection,
        pronunciation,
        adjWordFormInputs,
        nounWordFormInputs,
        numWordFormInputs,
        verbWordFormInputs,
        advWordFormInputs,
        adpWordFormInputs,
        partWordFormInputs,
        conjWordFormInputs,
        interjWordFormInputs,
        affixWordFormInputs,
        cliticWordFormInputs,
        pronWordFormInputs,
        adjWordCategoryInputs,
        nounWordCategoryInputs,
        numWordCategoryInputs,
        verbWordCategoryInputs,
        advWordCategoryInputs,
        adpWordCategoryInputs,
        partWordCategoryInputs,
        conjWordCategoryInputs,
        interjWordCategoryInputs,
        affixWordCategoryInputs,
        pronWordCategoryInputs,
        cliticWordCategoryInputs,
        tagInputs,
        variants,
        thesaurusDomains
      } = req.body;

      const removeNulls = (arr) => {
        let filteredArr = arr.filter((obj) => obj !== null);
        return filteredArr;
      };

      

      const { data, error } = await supabase
        .from("dictionary")
        .insert([
          {
            word_id: wordId,
            language_id: languageId,
            word: word,
            word_type: wordType,
            word_note: note,
            inflection: inflection,
            ipa: pronunciation,
            noun_meaning: Array.isArray(meanings.noun) ? meanings.noun : null,
            num_meaning: Array.isArray(meanings.num) ? meanings.num : null,
            adp_meaning: Array.isArray(meanings.adp) ? meanings.adp : null,
            verb_meaning: Array.isArray(meanings.verb) ? meanings.verb : null,
            adj_meaning: Array.isArray(meanings.adj) ? meanings.adj : null,
            conj_meaning: Array.isArray(meanings.conj) ? meanings.conj : null,
            adv_meaning: Array.isArray(meanings.adv) ? meanings.adv : null,
            pron_meaning: Array.isArray(meanings.pron) ? meanings.pron : null,
            affix_meaning: Array.isArray(meanings.affix)
              ? meanings.affix
              : null,
            clitic_meaning: Array.isArray(meanings.clitic)
              ? meanings.clitic
              : null,
            interj_meaning: Array.isArray(meanings.interj)
              ? meanings.interj
              : null,
            part_meaning: Array.isArray(meanings.part) ? meanings.part : null,
            noun_word_forms: removeNulls(nounWordFormInputs),
            num_word_forms: removeNulls(numWordFormInputs),
            verb_word_forms: removeNulls(verbWordFormInputs),
            adj_word_forms: removeNulls(adjWordFormInputs),
            adv_word_forms: removeNulls(advWordFormInputs),
            pron_word_forms: removeNulls(pronWordFormInputs),
            interj_word_forms: removeNulls(interjWordFormInputs),
            conj_word_forms: removeNulls(conjWordFormInputs),
            affix_word_forms: removeNulls(affixWordFormInputs),
            part_word_forms: removeNulls(partWordFormInputs),
            adp_word_forms: removeNulls(adpWordFormInputs),
            clitic_word_forms: removeNulls(cliticWordFormInputs),

            noun_word_categories: removeNulls(nounWordCategoryInputs),
             num_word_categories: removeNulls(numWordCategoryInputs),
            verb_word_categories: removeNulls(verbWordCategoryInputs),
            adj_word_categories: removeNulls(adjWordCategoryInputs),
            adv_word_categories: removeNulls(advWordCategoryInputs),
            pron_word_categories: removeNulls(pronWordCategoryInputs),
            interj_word_categories: removeNulls(interjWordCategoryInputs),
            conj_word_categories: removeNulls(conjWordCategoryInputs),
            affix_word_categories: removeNulls(affixWordCategoryInputs),
            part_word_categories: removeNulls(partWordCategoryInputs),
            adp_word_categories: removeNulls(adpWordCategoryInputs),
            clitic_word_categories: removeNulls(cliticWordCategoryInputs),

            made_by: userId,
            date_added: date,
            tags: removeNulls(tagInputs),
            thesaurus: thesaurusDomains ? thesaurusDomains : {}
          },
        ])
        .single();

      if (error) {
        console.error("Error getting languages:", error);
        res.status(500).json({ message: "Error getting languages" });
      }

      //now, manage the variants
      if (variants) {
        let variantArr = variants.split(", ");

        for (let i = 0; i < variantArr.length; i++) {
          const { data, error } = await supabase
            .from("dictionary")
            .insert([
              {
                word_id: Date.now(),
                language_id: languageId,
                word: variantArr[i],
                word_type: wordType,
                word_note: note,
                ipa: pronunciation,
                made_by: userId,
                date_added: date,
                tags: tagInputs,
                variant_of: {
                  word: word,
                  word_id: wordId,
                },
                noun_word_categories: removeNulls(nounWordCategoryInputs),
             num_word_categories: removeNulls(numWordCategoryInputs),
            verb_word_categories: removeNulls(verbWordCategoryInputs),
            adj_word_categories: removeNulls(adjWordCategoryInputs),
            adv_word_categories: removeNulls(advWordCategoryInputs),
            pron_word_categories: removeNulls(pronWordCategoryInputs),
            interj_word_categories: removeNulls(interjWordCategoryInputs),
            conj_word_categories: removeNulls(conjWordCategoryInputs),
            affix_word_categories: removeNulls(affixWordCategoryInputs),
            part_word_categories: removeNulls(partWordCategoryInputs),
            adp_word_categories: removeNulls(adpWordCategoryInputs),
            clitic_word_categories: removeNulls(cliticWordCategoryInputs),
                 noun_meaning: Array.isArray(meanings.noun) ? meanings.noun : null,
            num_meaning: Array.isArray(meanings.num) ? meanings.num : null,
            adp_meaning: Array.isArray(meanings.adp) ? meanings.adp : null,
            verb_meaning: Array.isArray(meanings.verb) ? meanings.verb : null,
            adj_meaning: Array.isArray(meanings.adj) ? meanings.adj : null,
            conj_meaning: Array.isArray(meanings.conj) ? meanings.conj : null,
            adv_meaning: Array.isArray(meanings.adv) ? meanings.adv : null,
            pron_meaning: Array.isArray(meanings.pron) ? meanings.pron : null,
            affix_meaning: Array.isArray(meanings.affix)
              ? meanings.affix
              : null,
            clitic_meaning: Array.isArray(meanings.clitic)
              ? meanings.clitic
              : null,
            interj_meaning: Array.isArray(meanings.interj)
              ? meanings.interj
              : null,
              },
            ])
            .single();

          if (error) {
            console.error("Error adding variants:", error);
            res.status(500).json({ message: "Error adding variants" });
          }
        }
      }

      res.status(200).json({ message: "word succesfully added" });
    } catch (error) {
      console.error("Error adding new language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
