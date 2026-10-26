import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qauto.forstudy.space/");
});

test("Log all buttons count", async ({ page }) => {
  const allButtons = page.getByRole("button");
  console.log(await allButtons.count());
});

test("Highlight 'Sign In' by filter", async ({ page }) => {
  const allButtons = page.getByRole("button");
  const signInButton = allButtons.filter({ hasText: "Sign In" });
  await signInButton.highlight();
});
