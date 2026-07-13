import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";


export default async function handler(req, res) {

  if (req.method === "POST") {
    const { email, password } = req.body;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { id } = req.body;

      const { data, error } = await supabase
        .from("groups")
        .delete()
        .eq("group_id", id)
        .single();

      if (error) {
        console.error("Error deleting word:", error);
        res.status(500).json({ message: "Error deleting group" });
      }

      res.status(200).json({ message: "group succesfully deleted" });
    } catch (error) {
      console.error("Error deleting group:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
