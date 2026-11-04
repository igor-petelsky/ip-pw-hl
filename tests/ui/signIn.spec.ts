import test, { expect } from "@playwright/test";
import { HomePage } from "../../page-object/pages/HomePage";
import { SignInForm } from "../../page-object/forms/SignInForm";
import { GaragePage } from "../../page-object/pages/GaragePage";
import { testUser1 } from "../../test-data/validUsers";
import { generateRandomEmail, generateRandomPassword, generateWrongEmailFormat } from "../../utils/credentials";

test.describe("Sign in tests with POM", () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);

    await homePage.navigate();
    await homePage.openSignInForm();
  });

  test("Successful sign in", async () => {
    await signInForm.signInWithCredentials(testUser1.email, testUser1.password);
    await expect(garagePage.userProfileDropdown).toBeVisible();
  });

  test("Sign in with empty email", async () => {
    await signInForm.triggerErrorOnField("email");
    await signInForm.enterPassword(generateRandomPassword());
    await expect(signInForm.emptyEmailMessage).toBeVisible();
  });

  test("Sign in with empty password", async () => {
    await signInForm.triggerErrorOnField("password");
    await signInForm.enterEmail(generateRandomEmail());
    await expect(signInForm.emptyPasswordMessage).toBeVisible();
  });

  test("Sign in with incorrect email", async () => {
    await signInForm.enterEmail(generateWrongEmailFormat());
    await signInForm.triggerErrorOnField("email");
    await expect(signInForm.wrongEmailMessage).toBeVisible();
  });

  test("Sign in with wrong credentials", async () => {
    await signInForm.signInWithCredentials(generateRandomEmail(), generateRandomPassword());
    await expect(signInForm.wrongCredentialsMessage).toBeVisible();
  });
});
