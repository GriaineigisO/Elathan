import { parseJson } from "./jsonParser.js";

const jsonColumns = [
  "id",
  "template_name",
  "phonology"
];

export function parsePhonologyTemplates(row) {
  for (const column of jsonColumns) {
    row[column] = parseJson(row[column]);
  }

  return row;
}
