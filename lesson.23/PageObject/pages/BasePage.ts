import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    await this.page.goto(path);
  }

  protected async checkTextEquals(element: Locator, expectedText: string) {
    await expect(element).toBeVisible();

    const elementName = this.getLocatorName(element);

    console.info(`Checking element '${elementName}' text equals '${expectedText}'`);

    await expect(element).toHaveText(expectedText);
  }

  private getLocatorName(element: Locator): string {
    for (const [name, value] of Object.entries(this)) {
      if (value === element) {
        return name;
      }
    }

    return element.toString();
  }
}
