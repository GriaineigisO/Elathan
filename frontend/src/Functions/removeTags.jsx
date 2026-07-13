  const removeTags = (text) => {
    if (text) {
      //all text submitted by ckEditor is
      text = text
  .replace(/<p>/g, "")
  .replace(/<\/p>/g, "")
  .replace(/<\/p\s*>/g, "")  // handles </p > with extra space
  .replace(/<br>/g, "")
  .replace(/&nbsp;/g, "");

      return text;
    }
    return text;
  };

  export default removeTags;