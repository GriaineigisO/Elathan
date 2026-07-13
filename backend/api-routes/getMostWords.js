import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1) Page through users in stable order
    const PAGE_SIZE = 1000;
    const users = [];
    let from = 0;

    for (;;) {
      const { data, error } = await supabase
        .from("users")
        .select("user_id, username")
        .order("user_id", { ascending: true }) // stable ordering is critical for paging
        .range(from, from + PAGE_SIZE - 1);

      if (error) throw error;

      users.push(...data);
      if (data.length < PAGE_SIZE) break; // last page
      from += PAGE_SIZE;
    }

    // 2) For each user, get an EXACT count without retrieving rows (no 1k cap)
    //    Do it in small concurrent batches to be efficient and safe.
    const COUNT_BATCH = 50; // tune if needed
    for (let i = 0; i < users.length; i += COUNT_BATCH) {
      const chunk = users.slice(i, i + COUNT_BATCH);

      await Promise.all(
        chunk.map(async (u) => {
          const { count, error: countErr } = await supabase
            .from("dictionary")
            .select("*", { count: "exact", head: true })
            .eq("made_by", u.user_id);

          if (countErr) throw countErr;
          u.words_added = count ?? 0;
        })
      );
    }

    // Sort by words_added, highest first
    users.sort((a, b) => b.words_added - a.words_added);
    
    // Take only the top 10
    const filteredUsers = users.slice(0, 10);

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error getting user info:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
