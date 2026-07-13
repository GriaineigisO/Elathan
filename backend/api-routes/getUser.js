import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const { username } = req.body;

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    //find the username
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (error) {
      console.error("Error getting username:", error);
      return res.status(500).json({ message: "Error getting username" });
    }

    if (data.length === 0) {
        return res.status(200).json({
      username: null,
      user_id: null,
    });
    }

    return res.status(200).json({
      username: data[0].username,
      user_id: data[0].user_id,
    });

  } catch (error) {
    console.error("Error getting user info:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
