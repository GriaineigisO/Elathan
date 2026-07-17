import { parseJson } from "./jsonParser.js";

const jsonColumns = [
  "group_id",
  "group_name",
  "word_forms",
  "word_categories",
  "languages",
  "tags"
];

export function parseGroup(row) {
  for (const column of jsonColumns) {
    row[column] = parseJson(row[column]);
  }

  return row;
}
