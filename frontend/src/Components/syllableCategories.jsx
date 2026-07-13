import { useState, useEffect } from "react";
import ipaChars from "../assets/ipaChars";

const alphabetArray = [
  "A",
  "B",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "W",
  "X",
  "Y",
  "Z",
];

export default function CategoryManager({ translate, onCategoryValuesChange, selectedCategoryValues }) {
  const [categoryRootArr, setCategoryRootArr] = useState([]);
  const [categoryValues, setCategoryValues] = useState({});

 useEffect(() => {
  if (selectedCategoryValues) {
    const newArr = Object.entries(selectedCategoryValues).map(([key, value]) => ({
      id: key,                          // or Date.now(), but key is stable
      letter: key,
      value: value.join(" ")
    }));

    setCategoryRootArr(newArr);
  }
}, [selectedCategoryValues]);

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
        const filteredArr = Array.from(value).filter((i) => i !== " ");

        for (let i = 0; i < filteredArr.length; i++) {
          // join ː to the previous letter
          if (ipaChars.includes(filteredArr[i]) && i > 0) {
            filteredArr[i - 1] += filteredArr[i];
            filteredArr.splice(i, 1);
            i--; // step back after splicing
          }
        }

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

  useEffect(() => {
  if (onCategoryValuesChange && Object.keys(categoryValues).length > 0) {
    onCategoryValuesChange(categoryValues);
  }
}, [categoryValues, onCategoryValuesChange]);



  return (
    <div>
      <div id="syllable-category-and-button-div">
        <div id="syllable-category-div"></div>
        <input
          type="submit"
          value={translate("Add New Category")}
          id="add-new-syllable-category-button"
          onClick={handleAddNewCategory}
        />
      </div>

      {categoryRootArr.map((cat) => (
        <div
          style={{ display: "flex", flexDirection: "row" }}
          className="fullWidth"
          key={cat.id}
        >
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

          <button
            className="btn-close btn-close-white small-x-button"
            aria-label="Close"
            onClick={() => removeCategoryRoot(cat.id)}
          ></button>
        </div>
      ))}
    </div>
  );
}
