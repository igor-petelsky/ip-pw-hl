import { test as base, Page } from "@playwright/test";
import { SignInForm } from "../../lesson.23/PageObject/forms/SignInForm";
import { GaragePage } from "../../lesson.23/PageObject/pages/GaragePage";
import { AddCarForm } from "../../lesson.23/PageObject/forms/AddCarForm";
import { HomePage } from "../../lesson.23/PageObject/pages/HomePage";
import { AddExpenseForm } from "../../lesson.23/PageObject/forms/AddExpenseForm";
import { ExpensesPage } from "../../lesson.23/PageObject/pages//ExpensesPage";
import { ProfilePage } from "../../lesson.23/PageObject/pages/ProfilePage";
import { EditProfileForm } from "../../lesson.23/PageObject/forms/EditProfileForm";

type App = {
  page: Page;
  garagePage: GaragePage;
  homePage: HomePage;
  signInForm: SignInForm;
  addCarForm: AddCarForm;
  addExpenseForm: AddExpenseForm;
  expensesPage: ExpensesPage;
  profilePage: ProfilePage;
  editProfileForm: EditProfileForm;
};

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      page,
      garagePage: new GaragePage(page),
      homePage: new HomePage(page),
      signInForm: new SignInForm(page),
      addCarForm: new AddCarForm(page),
      addExpenseForm: new AddExpenseForm(page),
      expensesPage: new ExpensesPage(page),
      profilePage: new ProfilePage(page),
      editProfileForm: new EditProfileForm(page),
    };
    await use(app);
  },
});

export { expect } from '@playwright/test';
