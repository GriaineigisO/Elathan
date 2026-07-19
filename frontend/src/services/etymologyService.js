export async function getEtymologyTrees(id, rootIds) {

    return await window.electron.getEtymologyTrees(id, rootIds);
}

export async function getEtymology(id) {

    return await window.electron.getEtymology(id);
}

export async function addEtymology(languageId, word_id, etymologyType, motherWord, firstElementId, secondElementId, thirdElementId, loanWordId, note) {

    return await window.electron.addEtymology(languageId, word_id, etymologyType, motherWord, firstElementId, secondElementId, thirdElementId, loanWordId, note);
}