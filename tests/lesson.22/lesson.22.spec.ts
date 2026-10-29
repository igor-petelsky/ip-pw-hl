import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qauto.forstudy.space/");
  await page.getByRole("button", { name: "Sign up" }).click();
});

test("Register button - success sign up", async ({ page }) => {
  await page.locator("#signupName").fill("John");
  await page.locator("#signupLastName").fill("Smith");
  await page.locator("#signupEmail").fill(`john+aqa${Date.now()}@gmail.com`);
  await page.locator("#signupPassword").fill("Demo1234");
  await page.locator("#signupRepeatPassword").fill("Demo1234");

  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.locator("#userNavDropdown")).toBeVisible();
});

test("Name field - empty field", async ({ page }) => {
  await page.locator("#signupName").focus();
  await page.locator("#signupName").blur();
  await expect(page.getByText("Name required")).toBeVisible();
});

test("Name field - wrong data", async ({ page }) => {
  await page.locator("#signupName").fill(" !@#  ");
  await page.locator("#signupName").blur();
  await expect(page.getByText("Name is invalid")).toBeVisible();
});

test("Name field - wrong length", async ({ page }) => {
  await page.locator("#signupName").fill("q");
  await page.locator("#signupName").blur();
  await expect(
    page.getByText("Name has to be from 2 to 20 characters long"),
  ).toBeVisible();
});

test("Name field - border red", async ({ page }) => {
  await page.locator("#signupName").fill("q");
  await page.locator("#signupName").blur();
  await expect(page.locator("#signupName")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
});

test("Last name field - empty field", async ({ page }) => {
  await page.locator("#signupLastName").focus();
  await page.locator("#signupLastName").blur();
  await expect(page.getByText("Last name required")).toBeVisible();
});

test("Last name field - wrong data", async ({ page }) => {
  await page.locator("#signupLastName").fill(" !@#  ");
  await page.locator("#signupLastName").blur();
  await expect(page.getByText("Last name is invalid")).toBeVisible();
});

test("Last name field - wrong length", async ({ page }) => {
  await page.locator("#signupLastName").fill("q");
  await page.locator("#signupLastName").blur();
  await expect(
    page.getByText("Last name has to be from 2 to 20 characters long"),
  ).toBeVisible();
});

test("Last name field - border red", async ({ page }) => {
  await page.locator("#signupLastName").fill("q");
  await page.locator("#signupLastName").blur();
  await expect(page.locator("#signupLastName")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
});

test("Email field - empty field", async ({ page }) => {
  await page.locator("#signupEmail").focus();
  await page.locator("#signupEmail").blur();
  await expect(page.getByText("Email required")).toBeVisible();
});

test("Email field - wrong data", async ({ page }) => {
  await page.locator("#signupEmail").fill(" !@#  ");
  await page.locator("#signupEmail").blur();
  await expect(page.getByText("Email is incorrect")).toBeVisible();
});

test("Email field - border red", async ({ page }) => {
  await page.locator("#signupEmail").fill("q");
  await page.locator("#signupEmail").blur();
  await expect(page.locator("#signupEmail")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
});

test("Password field - empty field", async ({ page }) => {
  await page.locator("#signupPassword").focus();
  await page.locator("#signupPassword").blur();
  await expect(page.getByText("Password required")).toBeVisible();
});

test("Password field - wrong length", async ({ page }) => {
  await page.locator("#signupPassword").fill(" !  ");
  await page.locator("#signupPassword").blur();
  await expect(
    page.getByText(
      "Password has to be from 8 to 15 characters long" +
        " and contain at least one integer, one capital, and one small letter",
    ),
  ).toBeVisible();
});

test("Password field - border red", async ({ page }) => {
  await page.locator("#signupPassword").fill("q");
  await page.locator("#signupPassword").blur();
  await expect(page.locator("#signupPassword")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
});

test("Re-enter password field - empty field", async ({ page }) => {
  await page.locator("#signupRepeatPassword").focus();
  await page.locator("#signupRepeatPassword").blur();
  await expect(page.getByText("Re-enter password required")).toBeVisible();
});

test("Re-enter password field - passwords do not match", async ({ page }) => {
  await page.locator("#signupPassword").fill("Demo1234");
  await page.locator("#signupRepeatPassword").fill("Demo12345");
  await page.locator("#signupRepeatPassword").blur();
  await expect(page.getByText("Passwords do not match")).toBeVisible();
});

test("Re-enter password field - border red", async ({ page }) => {
  await page.locator("#signupRepeatPassword").fill("q");
  await page.locator("#signupRepeatPassword").blur();
  await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
    "border-color",
    "rgb(220, 53, 69)",
  );
});
