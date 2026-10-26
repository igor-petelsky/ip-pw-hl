// import test, { expect } from "@playwright/test";
// import { GaragePage } from "../../lesson.23/PageObject/pages/GaragePage";
// import { HomePage } from "../../lesson.23/PageObject/pages/HomePage";
// import { SignInForm } from "../../lesson.23/PageObject/forms/SignInForm";
// import { testUser1 } from "../../test-data/validUsers";

// let garagePage: GaragePage;
// let homePage: HomePage;
// let signInForm: SignInForm;

// test.skip("Log in as testuser1 and save storage state", async ({ page, context }) => {
//   homePage = new HomePage(page);

//   signInForm = new SignInForm(page);
//   garagePage = new GaragePage(page);

//   await homePage.navigate();
//   await homePage.openSignInForm();
//   await signInForm.signInWithCredentials(testUser1.email, testUser1.password);
//   await expect(garagePage.userProfileDropdown).toBeVisible();

//   await context.storageState({ path: ".states/auth.json" });
// });
