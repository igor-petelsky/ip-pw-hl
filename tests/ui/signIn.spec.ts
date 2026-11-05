import { expect, test } from "../../utils/fixtures/pagesFixtures.js";
import { testUser1 } from "../../test-data/validUsers";
import { generateRandomEmail, generateRandomPassword, generateWrongEmailFormat } from "../../utils/credentials";

test.describe("Sign in tests with POM", () => {
  test.beforeEach(async ({ app }) => {
    await app.homePage.navigate();
    await app.homePage.openSignInForm();
  });

  test("Successful sign in", async ({ app }) => {
    await app.signInForm.signInWithCredentials(testUser1.email, testUser1.password);
    await expect(app.garagePage.userProfileDropdown).toBeVisible();
  });

  test("Sign in with empty email", async ({ app }) => {
    await app.signInForm.triggerErrorOnField("email");
    await app.signInForm.enterPassword(generateRandomPassword());
    await expect(app.signInForm.emptyEmailMessage).toBeVisible();
  });

  test("Sign in with empty password", async ({ app }) => {
    await app.signInForm.triggerErrorOnField("password");
    await app.signInForm.enterEmail(generateRandomEmail());
    await expect(app.signInForm.emptyPasswordMessage).toBeVisible();
  });

  test("Sign in with incorrect email", async ({ app }) => {
    await app.signInForm.enterEmail(generateWrongEmailFormat());
    await app.signInForm.triggerErrorOnField("email");
    await expect(app.signInForm.wrongEmailMessage).toBeVisible();
  });

  test("Sign in with wrong credentials", async ({ app }) => {
    await app.signInForm.signInWithCredentials(generateRandomEmail(), generateRandomPassword());
    await expect(app.signInForm.wrongCredentialsMessage).toBeVisible();
  });
});
