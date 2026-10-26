import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qauto.forstudy.space/");
});

test("Highlight 'Sign in' button", async ({ page }) => {
  const signInCss = page.locator("button.header_signin");
  const signInXpath = page.locator("//button[text()='Sign In']");
  const signInByRole = page.getByRole("button", { name: "Sign in" });

  await signInCss.highlight();
  await signInXpath.highlight();
  await signInByRole.highlight();
});

test("Header texts", async ({ page }) => {
  const home = page.getByText("Home");
  const about = page.getByText("About");
  const contacts = page.getByText("Contacts");

  await home.highlight();
  await about.highlight();
  await contacts.highlight();
});
