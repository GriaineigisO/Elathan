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
      const { id } = req.body;

      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("group_id", Number(id));

      if (error) {
        console.error("Error getting group:", error);
        res.status(500).json({ message: "Error getting group" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting groups:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
