export async function getEtymologyTrees(id, rootIds) {

    return await window.electron.getEtymologyTrees(id, rootIds);
}

export async function getEtymology(id) {

    return await window.electron.getEtymology(id);
}