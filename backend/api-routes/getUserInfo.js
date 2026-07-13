import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const { userId } = req.body;


    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    if (!userId) {
      return res.status(200).json({ loggedIn: false });
    }

    //find the username
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error getting username:", error);
      return res.status(500).json({ message: "Error getting username" });
    }

//     //identify all of the user's languages
//     const { data: languages, error: languagesError } = await supabase
//       .from("languages")
//       .select("language_id")
//       .eq("user_id", userId);


//     if (languagesError) {  // you currently check `error` instead
//   console.error("Error getting user languages:", languagesError);
//   return res.status(500).json({ message: "Error getting user languages" });
// }


    // const languageIds = languages.map((lang) => lang.language_id);

    // //find all words where the language ID is present in the languages array. Number of returned rows is number of all words added by user
    // let allLanguages = [];
    // let from = 0;
    // let chunkSize = 1000;
    // let keepGoing = true;

    // while (keepGoing) {
    //   const to = from + chunkSize - 1;

    //   const { data: getWordChunk, error: getWordChunkError } = await supabase
    //     .from("dictionary")
    //     .select("*")
    //     .in("language_id", languageIds)
    //     .range(from, to);

    //   if (getWordChunkError) {
    //     console.error("Error getting user word count:", getWordChunkError);
    //     return res.status(500).json({ message: "Error getting word count" });
    //   }

    //   if (getWordChunk.length === 0) {
    //     keepGoing = false;
    //   } else {
    //     allLanguages = allLanguages.concat(getWordChunk);
    //     from += chunkSize;
    //   }
    // }

    // const wordCount = allLanguages.length;

    if (!data || data.length === 0) {
  return res.status(200).json({
    loggedIn: false,
    username: null,
    //totalWordCount: 0,
    userLanguage: null
  });
}


    return res.status(200).json({
      username: data[0].username,
      //totalWordCount: wordCount,
      userLanguage: data[0].interface_language,
    });


    

  } catch (error) {
    console.error("Error getting user info:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
