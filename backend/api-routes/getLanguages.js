import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const allowedOrigins = [
  "http://localhost:5173",
  "https://elathadictionary.com",
];

const corsOptions = {
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", corsOptions.methods.join(", "));
  res.setHeader(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(", ")
  );
  res.setHeader("Cache-Control", "no-store"); // prevent caching!

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const { userId } = req.body;

      const { data, error } = await supabase
        .from("languages")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error getting languages:", error);
        return res.status(500).json({ message: "Error getting languages" }); // ✅ stop early
      }

      data.sort((a, b) => a.language_name.localeCompare(b.language_name));

      return res.status(200).json(data); // ✅ always return
    } catch (error) {
      console.error("Error getting languages:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}
