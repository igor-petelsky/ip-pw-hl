import { expect, Locator, Page } from "@playwright/test";
import { BaseStep } from "./BaseStep";

export class BasePage extends BaseStep{

  constructor(page: Page) {
    super(page);
  }

  async navigate(path: string) {
    await this.page.goto(path);
  }
}
