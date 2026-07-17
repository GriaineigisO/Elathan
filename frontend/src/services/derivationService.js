export async function getDerivations(languageId) {

    return await window.electron.getDerivations(languageId);
}

export async function getRootWord(id, isFirstElement, isSecondElement, isThirdElement) {

    return await window.electron.getRootWord(id, isFirstElement, isSecondElement, isThirdElement);
}