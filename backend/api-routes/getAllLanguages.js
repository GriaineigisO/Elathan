import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  if (req.method === "POST") {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Step 1: Get all languages
    const { data: languages, error: langError } = await supabase
      .from("languages")
      .select("*")
      .eq("privacy", "public")

    if (langError) {
      console.error("Error getting all languages:", langError);
      return res.status(500).json({ message: "Error getting all languages" });
    }

    // Step 2: Extract unique user IDs
    const userIds = [...new Set(languages.map(lang => lang.user_id))];

    // Step 3: Fetch all relevant users
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("user_id, username")
      .in("user_id", userIds);

    if (userError) {
      console.error("Error fetching usernames:", userError);
      return res.status(500).json({ message: "Error fetching usernames" });
    }

    // Step 4: Map user_id to username
    const userMap = new Map(users.map(u => [u.user_id, u.username]));

    // Step 5: Attach username to each language row
    const enrichedLanguages = languages.map(lang => ({
      ...lang,
      username: userMap.get(lang.user_id) || null,
    }));

    // Step 6: Sort if needed
    enrichedLanguages.sort((a, b) =>
      a.language_name.localeCompare(b.language_name)
    );

    return res.status(200).json(enrichedLanguages);
  } catch (err) {
    console.error("Error in handler:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

}
