export async function getAllWords(languageId) {

    return await window.electron.getAllWords(languageId);
}

export async function getWordData(id) {

    return await window.electron.getWordData(id);
}