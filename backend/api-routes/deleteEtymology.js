import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const {
        etymologyId
      } = req.body;


      const { data, error } = await supabase
        .from("etymology")
        .delete()
        .eq("etymology_id", etymologyId)
        .single();


      if (error) {
        console.error("Error deleting etymology:", error);
        res.status(500).json({ message: "Error deleting etymology" });
      }

      res.status(200).json({ message: "succesfully deleted etymology" });


      
    } catch (error) {
      console.error("Error deleting etymology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
