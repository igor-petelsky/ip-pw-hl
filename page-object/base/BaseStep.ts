import { expect, Locator, Page, Response } from "@playwright/test";

export class BaseStep {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async focusOnElement(element: Locator) {
    await element.focus();
  }

  protected async blurElement(element: Locator) {
    await element.blur();
  }

  protected async checkErrorMessageByText(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  protected async checkElementCssValue(element: Locator, styleName: string, styleValue: string) {
    await expect(element).toHaveCSS(styleName, styleValue);
  }

  protected async checkTextEquals(element: Locator, expectedText: string) {
    const elementName = this.getLocatorName(element);

    console.log(`Checking element '${elementName}' text equals '${expectedText}'`);

    await expect(element).toHaveText(expectedText);
  }

  protected async clickAndWaitForResponse(locator: Locator, url: string) {
    try {
      const response = this.page.waitForResponse((response) => response.url().includes(url), {
        timeout: 5_000,
      });

      await locator.click();
      return await response;
    } catch (error) {
      throw new Error(`Didn't receive expected response: ${url}`, { cause: error });
    }
  }

  protected async clickAndWaitForResponseWithActualUrlsInfo(locator: Locator, url: string) {
    const actualUrls: string[] = [];

    const onResponse = (response: Response) => {
      actualUrls.push(`${response.status()} ${response.url()}`);
    };

    this.page.on("response", onResponse);

    const responsePromise = this.page.waitForResponse((response) => response.url().includes(url), { timeout: 10_000 });

    try {
      await locator.click();
      return await responsePromise;
    } catch (error) {
      throw new Error(
        `Failed to wait for response.\n` +
          `Expected URL: ${url}\n` +
          `Page URL: ${this.page.url()}\n` +
          `Received responses:\n${actualUrls.join("\n") || "(none)"}`,
        { cause: error },
      );
    } finally {
      this.page.off("response", onResponse);
    }
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
