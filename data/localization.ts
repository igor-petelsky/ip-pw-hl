import { Language } from "../enums/language.enum";

export let currentLanguage: Language = Language.EN;

export function setLanguage(language: Language) {
  currentLanguage = language;
}