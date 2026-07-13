import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client

    try {
      const { rootIds } = req.body;

      const supabase = createClient(supabaseUrl, supabaseKey);

      let frontier = [...rootIds];
      const relevantRows = [];
      const visited = new Set(rootIds);

      const storedRows = new Set();

      while (frontier.length > 0) {
        const { data: firstRows, error: firstError } = await supabase
          .from("etymology")
          .select("*")
          .in("first_element_id", frontier);

        const { data: secondRows, error: secondError } = await supabase
          .from("etymology")
          .select("*")
          .in("second_element_id", frontier);

        const { data: thirdRows, error: thirdError } = await supabase
          .from("etymology")
          .select("*")
          .in("third_element_id", frontier);

        const { data: motherRows, error: motherError } = await supabase
          .from("etymology")
          .select("*")
          .in("mother_word_id", frontier);

        const { data: loanRows, error: loanError } = await supabase
          .from("etymology")
          .select("*")
          .in("loanword_id", frontier);

        if (
          firstError ||
          secondError ||
          thirdError ||
          motherError ||
          loanError
        ) {
          console.log({
            firstError,
            secondError,
            thirdError,
            motherError,
            loanError,
          });
        }

        const rows = [
          ...(motherRows ?? []),
          ...(loanRows ?? []),
          ...(firstRows ?? []),
          ...(secondRows ?? []),
          ...(thirdRows ?? []),
        ];

        const nextFrontier = [];

        for (const row of rows) {
          if (!storedRows.has(row.word_id)) {
            storedRows.add(row.word_id);
            relevantRows.push(row);
          }

          if (!visited.has(row.word_id)) {
            visited.add(row.word_id);
            nextFrontier.push(row.word_id);
          }
        }

        frontier = nextFrontier;
      }

      const children = {};
      for (const row of relevantRows) {
        for (const parentId of [
          row.first_element_id,
          row.second_element_id,
          row.third_element_id,
          row.mother_word_id,
          row.loanword_id,
        ]) {
          if (!parentId) continue;

          if (!children[parentId]) {
            children[parentId] = [];
          }

          children[parentId].push(row);
        }
      }

      const wordIds = new Set(rootIds);

for (const row of relevantRows) {
  wordIds.add(row.word_id);

  if (row.first_element_id) wordIds.add(row.first_element_id);
  if (row.second_element_id) wordIds.add(row.second_element_id);
  if (row.third_element_id) wordIds.add(row.third_element_id);
  if (row.mother_word_id) wordIds.add(row.mother_word_id);
  if (row.loanword_id) wordIds.add(row.loanword_id);
}

      const ids = [...wordIds];

      const words = {};

      for (let i = 0; i < ids.length; i += 100) {
        const batch = ids.slice(i, i + 100);

        const { data, error } = await supabase
          .from("dictionary")
          .select("*")
          .in("word_id", batch);

        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Failed to fetch words" });
        }

        for (const word of data) {
          words[word.word_id] = word;
        }
      }
      
      const etymologyLookup = {};

      function buildTree(wordId, parentWordId = null) {
        const descendants = children[wordId] ?? [];

        

        for (const row of relevantRows) {
          etymologyLookup[row.word_id] = row;
        }

        const etymology = etymologyLookup[wordId];

return {
  word: words[wordId],
  etymology,

  components: [
  etymology?.first_element_id && {
    position: 1,
    id: etymology.first_element_id,
    word: words[etymology.first_element_id],
  },
  etymology?.second_element_id && {
    position: 2,
    id: etymology.second_element_id,
    word: words[etymology.second_element_id],
  },
  etymology?.third_element_id && {
    position: 3,
    id: etymology.third_element_id,
    word: words[etymology.third_element_id],
  },
]
.filter(Boolean)
.filter(component => component.id !== parentWordId),

  motherWord: etymology?.mother_word_id
    ? words[etymology.mother_word_id]
    : null,

  loanWord: etymology?.loanword_id
    ? words[etymology.loanword_id]
    : null,

descendants: descendants.map((child) =>
  buildTree(child.word_id, wordId)
),};
      }

      const trees = rootIds.map((rootId) => buildTree(rootId));


      //now get all language names
      const { data: languages, error: languagesError } = await supabase
        .from("languages")
        .select("*");

      if (languagesError) {
        console.error(languagesError);
        return res.status(500).json({ message: "Failed to fetch languages" });
      }

      res.status(200).json({ trees: trees, languages: languages });
    } catch (error) {
      console.error("Error getting etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
