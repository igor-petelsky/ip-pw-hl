import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qauto.forstudy.space/");
});

test("Check sign in button", async ({ page }) => {
  const signIn = page.getByRole("button", { name: "Sign In" });
  await expect(signIn).toBeVisible();
});

test("Check title", async ({ page }) => {
  const section = page.locator("//*[@class='section hero']");
  const title = section.locator("//*[contains(@class, 'title')]");

  // v2:
  //   const section = page.locator(".section.hero");
  //   const title = section.locator("h1");
  await expect(title).toHaveText("Do more!");
});

test("Images with alt=instructions", async ({ page }) => {
  const images = page.locator("//img[contains(@alt, 'Instructions')]");

  //v2:
  // const images = page.getByAltText("Instructions");
  await expect(images).toHaveCount(2);
});
