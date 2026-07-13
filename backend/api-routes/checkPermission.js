import { createClient } from "@supabase/supabase-js";

// Initialize Supabase ONCE (important for speed)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, userId } = req.body;

    // Fast indexed lookup + limit
    const { data, error } = await supabase
      .from("languages")
      .select("user_id, collaborators")
      .eq("language_id", Number(id))
      .limit(1);

    if (error || !data || data.length === 0) {
      console.error("Error getting language:", error);
      return res.status(500).json({ message: "Error getting language" });
    }

    const lang = data[0];

    // Owner check (fastest)
    if (lang.user_id == userId) {
      return res.json(true);
    }

    // Collaborator check
    const isCollaborator =
      Array.isArray(lang.collaborators) &&
      lang.collaborators.some((c) => c.user_id == userId);

    return res.json(isCollaborator);

  } catch (err) {
    console.error("Error checking permission:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
