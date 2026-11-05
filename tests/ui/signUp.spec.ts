import { expect, test } from "../../utils/fixtures/pagesFixtures.js";

test.describe("Sign up tests", () => {

  test.beforeEach(async ({ app }) => {
    await app.homePage.navigate();
    await app.homePage.openSignUpForm();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Register button - success sign up", async ( {app} ) => {
    await app.signUpForm.fillName("John")
    await app.signUpForm.fillLastName("Smith");
    await app.signUpForm.fillEmail(`john+aqa${Date.now()}@gmail.com`);
    await app.signUpForm.fillPassword("Demo1234");
    await app.signUpForm.fillRepeatPassword("Demo1234");
    await app.signUpForm.clickRegisterButton();
    await expect(app.garagePage.userProfileDropdown).toBeVisible();
  });

  test("Name field - empty field", async ( {app} ) => {
    await app.signUpForm.focusOnName();
    await app.signUpForm.blurName();
    await app.signUpForm.checkErrorMessageVisible("Name required");
  });

  test("Name field - wrong data", async ( {app} ) => {
    await app.signUpForm.fillName("@#");
    await app.signUpForm.blurName();
    await app.signUpForm.checkErrorMessageVisible("Name is invalid");
  });

  test("Name field - wrong length", async ( {app} ) => {
    await app.signUpForm.fillName("q");
    await app.signUpForm.blurName();
    await app.signUpForm.checkErrorMessageVisible("Name has to be from 2 to 20 characters long");
  });

  test("Name field - border red", async ( {app} ) => {
    await app.signUpForm.fillName("q");
    await app.signUpForm.blurName();
    await app.signUpForm.checkNameFieldBorderRed();
  });

  test("Last name field - empty field", async ( {app} ) => {
    await app.signUpForm.focusOnLastName();
    await app.signUpForm.blurLastName();
    await app.signUpForm.checkErrorMessageVisible("Last name required");
  });

  test("Last name field - wrong data", async ( {app} ) => {
    await app.signUpForm.fillLastName("!@#");
    await app.signUpForm.blurLastName();
    await app.signUpForm.checkErrorMessageVisible("Last name is invalid");
  });

  test("Last name field - wrong length", async ( {app} ) => {
    await app.signUpForm.fillLastName("q");
    await app.signUpForm.blurLastName();
    await app.signUpForm.checkErrorMessageVisible("Last name has to be from 2 to 20 characters long");
  });

  test("Last name field - border red", async ( {app} ) => {
    await app.signUpForm.fillLastName("q");
    await app.signUpForm.blurLastName();
    await app.signUpForm.checkLastNameFieldBorderRed();
  });

  test("Email field - empty field", async ( {app} ) => {
    await app.signUpForm.focusOnEmail();
    await app.signUpForm.blurEmail();
    await app.signUpForm.checkErrorMessageVisible("Email required");
  });

  test("Email field - wrong data", async ( {app} ) => {
    await app.signUpForm.fillEmail("!@# ");
    await app.signUpForm.blurEmail();
    await app.signUpForm.checkErrorMessageVisible("Email is incorrect");
  });

  test("Email field - border red", async ( {app} ) => {
    await app.signUpForm.fillEmail("q");
    await app.signUpForm.blurEmail();
    await app.signUpForm.checkEmailFieldBorderRed();
  });

  test("Password field - empty field", async ( {app} ) => {
    await app.signUpForm.focusOnPassword();
    await app.signUpForm.blurPassword();
    await app.signUpForm.checkErrorMessageVisible("Password required");
  });

  test("Password field - wrong length", async ( {app} ) => {
    await app.signUpForm.fillPassword("!");
    await app.signUpForm.blurPassword();
    await app.signUpForm.checkErrorMessageVisible(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );
  });

  test("Password field - border red", async ( {app} ) => {
    await app.signUpForm.fillPassword("q");
    await app.signUpForm.blurPassword();
    await app.signUpForm.checkPasswordFieldBorderRed();
  });

  test("Re-enter password field - empty field", async ( {app} ) => {
    await app.signUpForm.focusOnRepeatPassword();
    await app.signUpForm.blurRepeatPassword();
    await app.signUpForm.checkErrorMessageVisible("Re-enter password required");
  });

  test("Re-enter password field - passwords do not match", async ( {app} ) => {
    await app.signUpForm.fillPassword("Demo1234");
    await app.signUpForm.fillRepeatPassword("Demo12345");
    await app.signUpForm.blurRepeatPassword();
    await app.signUpForm.checkErrorMessageVisible("Passwords do not match");
  });

  test("Re-enter password field - border red", async ( {app} ) => {
    await app.signUpForm.fillRepeatPassword("q");
    await app.signUpForm.blurRepeatPassword();
    await app.signUpForm.checkRepeatPasswordFieldBorderRed();
  });
});