import { expect, Locator, Page } from "@playwright/test";

export class BaseStep {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async checkTextEquals(element: Locator, expectedText: string) {
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
