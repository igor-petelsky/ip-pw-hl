import { Language } from "../enums/language.enum";

const en = {
  emailRequired: "Email required",
  emailIncorrect: "Email is incorrect",
  passwordRequired: "Password required",
  wrongCredentials: "Wrong email or password",
};

const ua: typeof en = {
  emailRequired: "Електронна пошта обов'язкова",
  emailIncorrect: "Електронна пошта неправильна",
  passwordRequired: "Пароль обов'язковий",
  wrongCredentials: "Неправильна електронна пошта або пароль",
};

export const errorMessages = {
  [Language.EN]: en, // Gets the "en" value from the enum and assigns the en object (set of keys and values) to this property.
  [Language.UA]: ua,
};
