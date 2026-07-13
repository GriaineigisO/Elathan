import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { userId, title, template } = req.body;

      //first, check if a template of the same name already exists
      const { data: findName, error: findNameError } = await supabase
        .from("phonologyTemplates")
        .select("template_name")
        .eq("template_name", title);

      if (!findName.length > 0) {

           const { data: getUsername, error: getUsernameError } = await supabase
        .from("users")
        .select("username")
        .eq("user_id", userId)
        .single();


        const { data, error } = await supabase
          .from("phonologyTemplates")
          .insert([
            {
              id: Date.now(),
              template_name: title,
              created_by: getUsername.username,
              phonology: template,
            },
          ]);

        if (error) {
          console.error("Error saving phonology:", error);
          res.status(500).json({ message: "Error saving phonology" });
        }

        res.status(200).json({ nameAlreadyExists: false });
      } else {
        res.status(200).json({ nameAlreadyExists: true });
      }
    } catch (error) {
      console.error("Error saving phonology:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
