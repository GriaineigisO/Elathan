export async function getAllWords(languageId) {

    return await window.electron.getAllWords(languageId);
}

export async function getWordData(id) {

    return await window.electron.getWordData(id);
}

export async function getWordsForms(id) {

    return await window.electron.getWordsForms(id);
}



export async function getAllWordsForPrint(id) {

    return await window.electron.getAllWordsForPrint(id);
}


