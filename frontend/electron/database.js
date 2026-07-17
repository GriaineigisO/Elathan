import Database from "better-sqlite3";
import dbPath from "./databasePath.js";

console.log("Opening database:", dbPath);

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

export default db;