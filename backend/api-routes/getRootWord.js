import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { id, isFirstElement, isSecondElement, isThirdElement } = req.body;

    // Step 1: Get derivation info
    const { data, error } = await supabase
      .from("etymology")
      .select("*")
      .eq("word_id", id);

    if (error || !data || data.length === 0) {
      console.error("Could not find derivation record for", id, error);
      return res.status(404).json({ message: "Derivation not found" });
    }

    const derivation = data[0];
    let rootWordId = null;

    if (isFirstElement || isThirdElement) {
      rootWordId = derivation.second_element_id;
    } else if (isSecondElement) {
      rootWordId = derivation.first_element_id;
    }



    if (!rootWordId) {
      return res.status(400).json({ message: "No root element resolved" });
    }

    const { data: rootWordData, error: rootWordError } = await supabase
      .from("dictionary")
      .select("*")
      .eq("word_id", rootWordId);

    if (rootWordError || !rootWordData || rootWordData.length === 0) {
      console.error("Root word fetch failed:", rootWordError);
      return res.status(404).json({ message: "Root word not found" });
    }
    return res.status(200).json(rootWordData[0]);

  } catch (err) {
    console.error("Unhandled server error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
