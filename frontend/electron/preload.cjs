
const { contextBridge, ipcRenderer } = require("electron");

const api = {};

api.getVersion = () => ipcRenderer.invoke("get-version");

api.rebuild = () => {
    return ipcRenderer.invoke("database:rebuild");
};

api.getAllWords = (languageId) => {
    return ipcRenderer.invoke("dictionary:getAllWords", languageId);
};

api.getWordData = (id) => {
    return ipcRenderer.invoke("dictionary:getWordData", id);
};

api.getLanguage = (languageId) => {
    return ipcRenderer.invoke("language:getLanguage", languageId);
};

api.getLanguages = () => {
    return ipcRenderer.invoke("language:getLanguages")
};

api.getGroups = () => {
    return ipcRenderer.invoke("language:getGroups")
};

api.getTags = (languageId) => {
    return ipcRenderer.invoke("language:getTags", languageId);
};

api.getDerivations = (id) => {
    return ipcRenderer.invoke("derivation:getDerivations", id);
};

api.getRootWord = (id, isFirstElement, isSecondElement, isThirdElement) => {
    return ipcRenderer.invoke("derivation:getRootWord", id, isFirstElement, isSecondElement, isThirdElement);
};

api.getEtymologyTrees = (id, rootIds) => {
    return ipcRenderer.invoke("etymology:getEtymologyTrees", id, rootIds);
};

api.getEtymology = (id) => {
    return ipcRenderer.invoke("etymology:getEtymology", id);
};

api.getEncyclopedias = (id) => {
    return ipcRenderer.invoke("encyclopedia:getEncyclopedias", id);
};

api.getEncyclopedia = (id) => {
    return ipcRenderer.invoke("encyclopedia:getEncyclopedia", id);
};


contextBridge.exposeInMainWorld("electron", api);

