import { useContext } from "react";

import { LanguageContext, defaultLocale } from "./LanguageProvider";
import { LangStrings } from "./translation";

export default function useTranslation() {
  const [locale] = useContext(LanguageContext);

  if (![locale]) {
    [locale] = useContext(defaultLocale);
  }

  function t(key) {
    if (!LangStrings[locale] || !LangStrings[locale][key]) {
      console.warn(`No string '${key}' for locale '${locale}'`);

      return LangStrings[defaultLocale][key] || "";
    }

    return LangStrings[locale][key] || LangStrings[defaultLocale][key] || "";
  }

  return { t, locale };
}