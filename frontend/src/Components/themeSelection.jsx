import themes from "../assets/themes";
import capitaliseFirstLetter from "../Functions/capitaliseFirstLetter.jsx";
import { useTranslate } from "../Functions/TranslateUI";

const ThemeSelection = ({ chosenThemes, setChosenThemes }) => {
  const { translate } = useTranslate();

  const toggleTheme = (theme) => {
    if (chosenThemes.includes(theme)) {
      setChosenThemes(chosenThemes.filter((th) => th !== theme));
    } else {
      setChosenThemes((prev) => [...prev, theme]);
    }
  };

  const toggleAll = () => {
    if (chosenThemes.length > 0) {
      setChosenThemes([]);
    } else {
      const all = [];
     for (const category in themes) {
      const themeArr = themes[category];
      themeArr.forEach((theme) => {
        all.push(theme);
      })
     }
      setChosenThemes(all)
    }
  };

  return (
    <div className="thin-white-border theme-list">
      <button onClick={toggleAll}>{translate("toggle all")}</button>
      {Object.entries(themes).map(([key, value]) => (
        <div key={key}>
          <h5>{capitaliseFirstLetter(translate(key))}</h5>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {value
              .slice()
              .sort()
              .map((theme) => (
                <div key={theme} style={{ marginRight: "5px" }}>
                  <input
                    type="checkbox"
                    id={theme}
                    checked={chosenThemes.includes(theme)}
                    onChange={() => toggleTheme(theme)}
                    style={{ marginRight: "5px" }}
                  />
                  <label htmlFor={theme}>
                    {capitaliseFirstLetter(translate(theme))}
                  </label>
                </div>
              ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ThemeSelection;
