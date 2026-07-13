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
      const {
        groupName,
        addedLanguages,
        wordForms,
        userId,
        id,
        wordCategories,
        privacy,
        permission,
        collaborators,
        removedCollaborators,
      } = req.body;

      const { data, error } = await supabase
        .from("groups")
        .update({
          group_name: groupName,
          word_forms: wordForms,
          word_categories: wordCategories,
          languages:
            Array.isArray(addedLanguages) && addedLanguages.length > 0
              ? addedLanguages
              : null,
          privacy: privacy,
          collaborators: collaborators,
          permission: permission,
        })
        .eq("group_id", id)
        .single();

      if (error) {
        console.error("Error editing group:", error);
        res.status(500).json({ message: "Error editing group" });
      }

      //now change collaborator status on all member languages

      const deleteRemovedCollaborators = (collaborators, removed) => {
        //now to delete any removed collaborators from the collaborator list in each member language
        if (removed.length > 0) {
          const filtered = collaborators.filter(
            (c) => !removed.some((r) => r.user_id === c.user_id)
          );
          return filtered;
        } else {
          return collaborators;
        }
      };

      //first, get the pre-existing list of collaborators
      for (const language of addedLanguages) {
        const { data: languageCollab, error: languageCollabError } =
          await supabase
            .from("languages")
            .select("collaborators")
            .eq("language_id", language.language_id);

        if (languageCollabError) {
          console.error("Error fetching member language:", error);
          res.status(500).json({ message: "Error fetching member language" });
        }

        //now that we have the list of collaborators, we can append any new collaborators who were assigned to the group

        if (languageCollab[0].collaborators.length === 0) {
          const {
            data: updatelanguageCollab,
            error: updatelanguageCollabError,
          } = await supabase
            .from("languages")
            .update({
              collaborators: deleteRemovedCollaborators(
                collaborators,
                removedCollaborators
              ),
            })
            .eq("language_id", language.language_id);
        } else {
          const {
            data: updatelanguageCollab,
            error: updatelanguageCollabError,
          } = await supabase
            .from("languages")
            .update({
              collaborators: deleteRemovedCollaborators(
                languageCollab[0].collaborators.concat(collaborators),
                removedCollaborators
              ),
            })
            .eq("language_id", language.language_id);
        }
      }

      res.status(200).json({ message: "group edited successfully" });
    } catch (error) {
      console.error("Error adding editing language:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
