export async function getEncyclopedias() {
  return await window.electron.getEncyclopedias();
}

export async function getEncyclopedia(id) {
  return await window.electron.getEncyclopedia(id);
}

export async function addEncyclopedia(id, encyclopediaName, topics) {
  return await window.electron.addEncyclopedia(id, encyclopediaName, topics);
}

export async function deleteEncyclopedia(id) {
  return await window.electron.deleteEncyclopedia(id);
}

export async function editEncyclopedia(id,
            encyclopediaName, topics) {
  return await window.electron.editEncyclopedia(id,
            encyclopediaName, topics);
}


export async function addEntry(encyclopediaId, headword, entryText, entryTopic) {
  return await window.electron.addEntry(encyclopediaId, headword, entryText, entryTopic);
}

export async function editEntry(headword, entryText, entryTopic, id) {
  return await window.electron.editEntry(headword, entryText, entryTopic, id);
}

export async function getEntry(id) {
  return await window.electron.getEntry(id);
}

export async function deleteEntry(id) {
  return await window.electron.deleteEntry(id);
}

