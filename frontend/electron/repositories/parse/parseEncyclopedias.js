import { parseJson } from "./jsonParser.js";

const jsonColumns = ["encyclopedia_id", "encyclopedia_name", "topics"];

export function parseEncyclopedias(row) {
  for (const column of jsonColumns) {
    row[column] = parseJson(row[column]);
  }

  return row;
}
