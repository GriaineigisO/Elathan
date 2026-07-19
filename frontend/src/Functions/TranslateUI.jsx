import { createContext, useState, useEffect, useContext } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [userLanguage, setUserLanguage] = useState(null);
  const [translations, setTranslations] = useState(null);
  const [languageName, setLanguageName] = useState("English");
  const [loading, setLoading] = useState(true);

  // Load cached data immediately
  useEffect(() => {
    const cachedLang = localStorage.getItem("cachedUserLanguage");
    const cachedTranslations = localStorage.getItem("cachedTranslations");
    const cachedLanguageName = localStorage.getItem("cachedLanguageName");

    if (cachedLang && cachedTranslations) {
      try {
        setUserLanguage(cachedLang);
        setTranslations(JSON.parse(cachedTranslations));
        setLanguageName(cachedLanguageName || "English");
        setLoading(false);
      } catch {
        console.warn("Corrupt cached translations, ignoring...");
      }
    }
  }, []);

  const fetchInterfaceLanguage = async () => {
    try {
      const data = await window.electron.getInterfaceLanguage();
      if (data) {
        
        setLanguageName(data.language_name);

        const dict = {};
        data.translations.forEach((t) => {
          dict[t.phrase.toLowerCase()] = t.translation;
        });

        setTranslations(dict);

        localStorage.setItem("cachedUserLanguage", data.language_id);
        localStorage.setItem("cachedTranslations", JSON.stringify(dict));
        localStorage.setItem("cachedLanguageName", data.language_name);
      } else {
        //fallback to English UI, no need to block rendering
        setUserLanguage("English");
        setTranslations(null);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching interface language:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLanguage) fetchInterfaceLanguage();
  }, [userLanguage]);

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const capitalizeAllWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const interpolate = (template, values) => {
    if (!values) return template;
    return template.replace(
      /\{(\w+)\}/g,
      (_, key) => values[key] ?? `{${key}}`,
    );
  };

  const translate = (phrase, values = null, options = {}) => {
    const { capitalize, capitalizeAll } = options;
    if (!translations) return phrase;

    const lower = phrase.toLowerCase();
    const translated = translations[lower] || translations[phrase] || phrase;

    let result = interpolate(translated, values);
    if (capitalizeAll) result = capitalizeAllWords(result);
    else if (capitalize) result = capitalizeFirst(result);

    return result;
  };

  return (
    <TranslationContext.Provider value={{ translate, languageName }}>
      {loading && !translations ? null : children}
    </TranslationContext.Provider>
  );
};

export const useTranslate = () => useContext(TranslationContext);
