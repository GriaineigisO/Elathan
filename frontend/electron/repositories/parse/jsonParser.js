export function parseJson(value) {
    if (value === null || value === undefined)
        return value;

    if (typeof value !== "string")
        return value;

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}