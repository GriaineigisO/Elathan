import { createClient } from "@supabase/supabase-js";

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

    const { data, error } = await supabase
      .from("languages")
      .select("user_id, collaborators, privacy")
      .eq("language_id", Number(id))
      .limit(1);

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching language" });
    }

    const lang = data[0];

    // Public or unlisted — always allowed
    if (lang.privacy !== "private") return res.json(true);

    // Owner
    if (lang.user_id == userId) return res.json(true);

    // Collaborator
    const isCollaborator = lang.collaborators?.some(
      (c) => c.user_id == userId
    );

    return res.json(isCollaborator);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
