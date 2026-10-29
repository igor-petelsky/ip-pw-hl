import { test as base, Page } from "@playwright/test";
import { SignInForm } from "../../page-object/forms/SignInForm";
import { GaragePage } from "../../page-object/pages/GaragePage";
import { AddCarForm } from "../../page-object/forms/AddCarForm";
import { HomePage } from "../../page-object/pages/HomePage";
import { AddExpenseForm } from "../../page-object/forms/AddExpenseForm";
import { ExpensesPage } from "../../page-object/pages/ExpensesPage";
import { ProfilePage } from "../../page-object/pages/ProfilePage";
import { EditProfileForm } from "../../page-object/forms/EditProfileForm";

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
