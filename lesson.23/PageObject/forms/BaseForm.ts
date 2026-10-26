import { expect, Locator, Page } from "@playwright/test";

export class BaseForm {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async focusOnElement(element: Locator) {
    await element.focus();
  }

  async blurElement(element: Locator) {
    await element.blur();
  }

  async checkErrorMessageByText(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async checkElementCssValue(element: Locator, styleName: string, styleValue: string) {
    await expect(element).toHaveCSS(styleName, styleValue);
  }
}
