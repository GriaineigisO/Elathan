export async function getEncyclopedias() {
  return await window.electron.getEncyclopedias();
}

export async function getEncyclopedia(id) {
  return await window.electron.getEncyclopedia(id);
}
