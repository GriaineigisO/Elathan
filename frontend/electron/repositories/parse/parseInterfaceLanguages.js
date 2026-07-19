import { parseJson } from "./jsonParser.js";

const jsonColumns = [
  "id",
  "language_name",
  "translations"
];

export function parseInterfaceLanguages(row) {
  for (const column of jsonColumns) {
    row[column] = parseJson(row[column]);
  }

  return row;
}
