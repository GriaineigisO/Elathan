 function handleSelection(item, setArr) {
    setArr((prev) =>
      prev.includes(item)
        ? prev.filter((d) => d !== item)
        : [...prev, item]
    );
  }

  export default handleSelection;