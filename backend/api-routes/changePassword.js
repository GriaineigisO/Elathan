import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { userId, password } = req.body;

      // 2. Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

      const { data, error } = await supabase
        .from("users")
        .update({ password: hashedPassword })
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Error changing password" });
      }

      res.status(200).json({ message: "password succesfully changed" });
    } catch (error) {
      console.error("Error editing text:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
