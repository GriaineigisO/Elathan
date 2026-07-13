import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

export default async function handler(req, res) {
 
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { userId } = req.body;

      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("user_id", Number(userId));

      if (error) {
        console.error("Error getting groups:", error);
        res.status(500).json({ message: "Error getting groups" });
      }

      data.sort((a, b) => a.group_name.localeCompare(b.group_name));

      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting groups:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
