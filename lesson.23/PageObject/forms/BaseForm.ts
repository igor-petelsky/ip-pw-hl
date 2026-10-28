import { expect, Locator, Page } from "@playwright/test";
import { step } from "../../../utils/reports/decorator";

export class BaseForm {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @step()
  async focusOnElement(element: Locator) {
    await element.focus();
  }

  @step()
  async blurElement(element: Locator) {
    await element.blur();
  }

  @step()
  async checkErrorMessageByText(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  @step()
  async checkElementCssValue(element: Locator, styleName: string, styleValue: string) {
    await expect(element).toHaveCSS(styleName, styleValue);
  }
}
