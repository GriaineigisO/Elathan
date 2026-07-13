import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {


  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Step 1: Get all etymology rows for this word
      const { data: etymologyRows, error: etymError } = await supabase
        .from("etymology")
        .select("*")
        .or(`first_element_id.eq.${id},second_element_id.eq.${id},third_element_id.eq.${id}`);

      if (etymError) {
        console.error("Error fetching etymology rows:", etymError);
        return res
          .status(500)
          .json({ message: "Failed to fetch etymology rows" });
      }

      // Step 1: Gather all IDs
const wordIds = etymologyRows.map(e => e.word_id);

// Step 2: Single query for all words
const { data: allEntries, error } = await supabase
  .from("dictionary")
  .select(`
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
  `)
  .in("word_id", wordIds);

if (error) {
  console.error("Error fetching dictionary entries:", error);
  return [];
}

// Step 3: Map by ID for quick lookup
const entryMap = new Map(allEntries.map(e => [e.word_id, e]));
// Step 4: Build results array
const results = etymologyRows
  .map(etym => {
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

    return {
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
    };
  })
  .filter(Boolean);
      res.status(200).json(results);
    } catch (error) {
      console.error("Error getting etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
