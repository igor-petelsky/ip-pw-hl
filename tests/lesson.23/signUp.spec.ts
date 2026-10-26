import test, { expect } from "@playwright/test";
import { HomePage } from "../../lesson.23/PageObject/pages/HomePage";
import { SignUpForm } from "../../lesson.23/PageObject/forms/SignUpForm";
import { GaragePage } from "../../lesson.23/PageObject/pages/GaragePage";

test.describe("Sign up tests with POM", () => {
  let homePage: HomePage;
  let signUpForm: SignUpForm;
  let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    garagePage = new GaragePage(page);
    await page.goto("/");
    await homePage.openSignUpForm();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Register button - success sign up", async () => {
    await signUpForm.fillName("John");
    await signUpForm.fillLastName("Smith");
    await signUpForm.fillEmail(`john+aqa${Date.now()}@gmail.com`);
    await signUpForm.fillPassword("Demo1234");
    await signUpForm.fillRepeatPassword("Demo1234");
    await signUpForm.clickRegisterButton();
    await expect(garagePage.userProfileDropdown).toBeVisible();
  });

  test("Name field - empty field", async () => {
    await signUpForm.focusOnName();
    await signUpForm.blurName();
    await signUpForm.checkErrorMessageByText("Name required");
  });

  test("Name field - wrong data", async () => {
    await signUpForm.fillName("@#");
    await signUpForm.blurName();
    await signUpForm.checkErrorMessageByText("Name is invalid");
  });

  test("Name field - wrong length", async () => {
    await signUpForm.fillName("q");
    await signUpForm.blurName();
    await signUpForm.checkErrorMessageByText("Name has to be from 2 to 20 characters long");
  });

  test("Name field - border red", async () => {
    await signUpForm.fillName("q");
    await signUpForm.blurName();
    await signUpForm.checkNameFieldBorderRed();
  });

  test("Last name field - empty field", async () => {
    await signUpForm.focusOnLastName();
    await signUpForm.blurLastName();
    await signUpForm.checkErrorMessageByText("Last name required");
  });

  test("Last name field - wrong data", async () => {
    await signUpForm.fillLastName("!@#");
    await signUpForm.blurLastName();
    await signUpForm.checkErrorMessageByText("Last name is invalid");
  });

  test("Last name field - wrong length", async () => {
    await signUpForm.fillLastName("q");
    await signUpForm.blurLastName();
    await signUpForm.checkErrorMessageByText("Last name has to be from 2 to 20 characters long");
  });

  test("Last name field - border red", async () => {
    await signUpForm.fillLastName("q");
    await signUpForm.blurLastName();
    await signUpForm.checkLastNameFieldBorderRed();
  });

  test("Email field - empty field", async () => {
    await signUpForm.focusOnEmail();
    await signUpForm.blurEmail();
    await signUpForm.checkErrorMessageByText("Email required");
  });

  test("Email field - wrong data", async () => {
    await signUpForm.fillEmail("!@# ");
    await signUpForm.blurEmail();
    await signUpForm.checkErrorMessageByText("Email is incorrect");
  });

  test("Email field - border red", async () => {
    await signUpForm.fillEmail("q");
    await signUpForm.blurEmail();
    await signUpForm.checkEmailFieldBorderRed();
  });

  test("Password field - empty field", async () => {
    await signUpForm.focusOnPassword();
    await signUpForm.blurPassword();
    await signUpForm.checkErrorMessageByText("Password required");
  });

  test("Password field - wrong length", async () => {
    await signUpForm.fillPassword("!");
    await signUpForm.blurPassword();
    await signUpForm.checkErrorMessageByText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });

  test("Password field - border red", async () => {
    await signUpForm.fillPassword("q");
    await signUpForm.blurPassword();
    await signUpForm.checkPasswordFieldBorderRed();
  });

  test("Re-enter password field - empty field", async () => {
    await signUpForm.focusOnRepeatPassword();
    await signUpForm.blurRepeatPassword();
    await signUpForm.checkErrorMessageByText("Re-enter password required");
  });

  test("Re-enter password field - passwords do not match", async () => {
    await signUpForm.fillPassword("Demo1234");
    await signUpForm.fillRepeatPassword("Demo12345");
    await signUpForm.blurRepeatPassword();
    await signUpForm.checkErrorMessageByText("Passwords do not match");
  });

  test("Re-enter password field - border red", async () => {
    await signUpForm.fillRepeatPassword("q");
    await signUpForm.blurRepeatPassword();
    await signUpForm.checkRepeatPasswordFieldBorderRed();
  });
});