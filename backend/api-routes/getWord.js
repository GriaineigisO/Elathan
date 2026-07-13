import { createClient } from "@supabase/supabase-js";



export default async function handler(req, res) {
  const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, userId } = req.body;

    // 1️⃣ FIRST QUERY → Get the word itself
    const { data: wordRows, error: wordError } = await supabase
      .from("dictionary")
      .select("word_id, word, language_id, noun_meaning, num_meaning, adj_meaning, adv_meaning, verb_meaning, adp_meaning, conj_meaning, interj_meaning, pron_meaning, affix_meaning, clitic_meaning, part_meaning, made_by, edited_by, date_added, word_type, variant_of, ipa, noun_word_categories, noun_word_forms, verb_word_categories, verb_word_forms, adj_word_categories, adj_word_forms, adv_word_categories, adv_word_forms, conj_word_forms, conj_word_categories, interj_word_forms, interj_word_categories, adp_word_forms, adp_word_categories, pron_word_forms, pron_word_categories, part_word_forms, part_word_categories, num_word_forms, num_word_categories, affix_word_forms, affix_word_categories, clitic_word_forms, clitic_word_categories, word_note, inflection, tags, thesaurus, made_by, edited_by")
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
      { data: langRows, error: langError }
    ] = await Promise.all([
      supabase
        .from("dictionary")
        .select("word, word_id")
        .filter("variant_of->>word_id", "eq", id.toString()),

      supabase
        .from("languages")
        .select("language_id, privacy, collaborators, user_id")
        .eq("language_id", langId)
        .limit(1)
    ]);

    if (langError || !langRows?.length) {
      console.error("Language error:", langError);
      return res.status(500).json({ message: "Language not found" });
    }

    const lang = langRows[0];

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
      (c) => c.user_id == userId
    );

    if (isCollaborator) {
      privacy = true;
      permission = true;
    }

    // 4️⃣ Respond
    return res.status(200).json({
      wordData: { ...word, variants: variants || [] },
      languageData: lang,
      privacy,
      permission
    });
    res.end();


  } catch (error) {
    console.error("Unexpected error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
}
