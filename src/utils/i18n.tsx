import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import fr from "../lang/fr.json";
import en from "../lang/en.json";
import vn from "../lang/vi.json";
import { CookieConstants } from "../constants/local";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: localStorage.getItem(CookieConstants.LANGUAGE) || "vn",
    resources: {
      en: { common: en },
      fr: { common: fr },
      vn: {common:vn }
    },
    // debug: true,
    react: {
      wait: true
    },
    ns: "common",
    defaultNS: 'common'
  });

export const getCurrentLang = () =>
  i18n.language || window.localStorage.i18nextLng || "vn";

export default i18n;
