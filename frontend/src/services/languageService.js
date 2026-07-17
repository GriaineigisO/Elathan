export async function getLanguage(languageId) {

    return await window.electron.getLanguage(languageId);
}

export async function getLanguages() {

    return await window.electron.getLanguages();
}

export async function getGroups() {

    return await window.electron.getGroups();
}

export async function getTags(languageId) {

    return await window.electron.getTags(languageId);
}