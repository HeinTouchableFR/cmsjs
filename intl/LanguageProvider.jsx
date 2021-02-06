import { createContext, useState } from "react";

export const defaultLocale = "en";
export const locales = ["fr", "en"];
export const LanguageContext = createContext([]);
import { Flag } from "semantic-ui-react";

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("fr");

  const changeLanguage = (lang) => {
    setLocale(lang);
  };

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      <div className="header-bar">
        <Flag name="fr" onClick={() => changeLanguage("fr")} />
        <Flag name="uk" onClick={() => changeLanguage("en")} />
        <Flag name="us" onClick={() => changeLanguage("en")} />
      </div>
      {children}
    </LanguageContext.Provider>
  );
};
