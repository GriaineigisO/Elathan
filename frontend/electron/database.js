import Database from "better-sqlite3";
import dbPath from "./databasePath.js";

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

export default db;