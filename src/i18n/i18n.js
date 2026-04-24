import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import pt from "./translations/pt.json";

const resources = {
  pt: {
    translation: pt,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
