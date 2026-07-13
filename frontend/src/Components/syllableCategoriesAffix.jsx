import { useState, useEffect } from "react";

const alphabetArray = ["A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];

export default function CategoryManagerAffix({ translate, onCategoryValuesChange }) {
  const [categoryRootArr, setCategoryRootArr] = useState([]);
  const [categoryValues, setCategoryValues] = useState({});

  const handleAddNewCategory = () => {
    const newCategory = { id: Date.now(), letter: "", value: "" };
    setCategoryRootArr((prev) => [...prev, newCategory]);
  };

  const handleLetterChange = (id, letter) => {
    setCategoryRootArr((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, letter } : cat))
    );

    // Create a blank array for this category if it doesn't exist yet
    setCategoryValues((prev) => ({
      ...prev,
      [letter]: prev[letter] || [""],
    }));
  };

  const handleValueChange = (id, value) => {
    setCategoryRootArr((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, value } : cat))
    );

    const cat = categoryRootArr.find((c) => c.id === id);
    if (cat && cat.letter) {
      setCategoryValues((prev) => {
        const existing = prev[cat.letter] || [];
        // push new value to the category array (replace last entry here for simplicity)
        //remove whitespaces from array
        const filteredArr = Array.from(value).filter((i) => i !== " ")
        return { ...prev, [cat.letter]: filteredArr };
      });
    }
  };

  const removeCategoryRoot = (id) => {
    const toRemove = categoryRootArr.find((cat) => cat.id === id);
    setCategoryRootArr((prev) => prev.filter((cat) => cat.id !== id));

    // Optionally remove its array as well
    if (toRemove && toRemove.letter) {
      setCategoryValues((prev) => {
        const copy = { ...prev };
        delete copy[toRemove.letter];
        return copy;
      });
    }
  };

  
  //Every time categoryValues changes, tell the parent
  useEffect(() => {
    if (onCategoryValuesChange) onCategoryValuesChange(categoryValues);
  }, [categoryValues, onCategoryValuesChange]);

  return (
    <div>
      <div id="syllable-category-and-button-div">
            <div id="syllable-category-div"></div>
            <input
              type="submit"
              value="Add New Category"
              id="add-new-syllable-category-button"
              onClick={handleAddNewCategory}
            />
          </div>

      {categoryRootArr.map((cat) => (
        <div key={cat.id}>
          <label>{translate("Sound Category")}</label>

          <select
            value={cat.letter}
            onChange={(e) => handleLetterChange(cat.id, e.target.value)}
          >
            <option value="">--</option>
            {alphabetArray.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>

          <input
            value={cat.value}
            onChange={(e) => handleValueChange(cat.id, e.target.value)}
          />

          <button onClick={() => removeCategoryRoot(cat.id)}>
            {translate("Remove")}
          </button>
        </div>
      ))}

    </div>
  );
}
