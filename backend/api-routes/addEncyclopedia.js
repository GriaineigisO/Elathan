import { createClient } from "@supabase/supabase-js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const allowedOrigins = [
  "http://localhost:5173",
  "https://elathadictionary.com",
];

// CORS Options
const corsOptions = {
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default async function handler(req, res) {
  // Enable CORS for all requests (including OPTIONS)
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

  // Handle OPTIONS method (for CORS preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      const {
        id,
        userId,
        encyclopediaName,
        topics,
      } = req.body;

     
      const { data, error } = await supabase
        .from("encyclopedias")
        .insert([
          {
            user_id: userId,
            encyclopedia_id: id,
            encyclopedia_name: encyclopediaName,
            topics:
              Array.isArray(topics) && topics.length > 0
                ? topics
                : null,
          },
        ])
        .single();

      if (error) {
        console.error("Error adding encyclopedia:", error);
        res.status(500).json({ message: "Error adding encyclopedia" });
      }

      

      res.status(200).json({ message: "Encyclopedia added successfully" });
    } catch (error) {
      console.error("Error adding editing encyclopedia:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
