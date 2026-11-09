import { Locator } from "@playwright/test";
import { BaseStep } from "../base/BaseStep";
import { step } from "../../utils/reports/decorator";
import { errorMessages } from "../../data/errorMessages";
import { currentLanguage } from "../../data/localization";

export class SignInForm extends BaseStep {
  private static readonly EMAIL = "email";
  private static readonly PASSWORD = "password";

  private emailField: Locator = this.getFieldByName(SignInForm.EMAIL);
  private emailErrorMessage: Locator = this.getErrorMessageByFieldName(SignInForm.EMAIL);
  private passwordField: Locator = this.getFieldByName(SignInForm.PASSWORD);
  private passwordErrorMessage: Locator = this.getErrorMessageByFieldName(SignInForm.PASSWORD);
  private loginButton: Locator = this.page.locator("//app-signin-modal//*[@class='btn btn-primary']");
  private alert: Locator = this.page.locator("//*[@class='alert alert-danger']");

  @step()
  async checkEmptyEmailErrorMessage() {
    await this.checkTextEquals(this.emailErrorMessage, errorMessages[currentLanguage].emailRequired);
  }

  @step()
  async checkEmptyPasswordErrorMessage() {
    await this.checkTextEquals(this.passwordErrorMessage, errorMessages[currentLanguage].passwordRequired);
  }

  @step()
  async checkIncorrectEmailErrorMessage() {
    await this.checkTextEquals(this.emailErrorMessage, errorMessages[currentLanguage].emailIncorrect);
  }

  @step()
  async checkWrongCredentialsErrorMessage() {
    await this.checkTextEquals(this.alert, errorMessages[currentLanguage].wrongCredentials);
  }

  @step()
  async signInWithCredentials(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  @step()
  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  @step()
  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  @step()
  async clickLoginButton() {
    await this.loginButton.click();
  }

  @step()
  async triggerErrorOnField(fieldName: string) {
    let field: Locator;

    if (fieldName === SignInForm.EMAIL) {
      field = this.emailField;
    } else if (fieldName === SignInForm.PASSWORD) {
      field = this.passwordField;
    } else {
      throw new Error("Wrong field name");
    }

    await field.focus();
    await field.blur();
  }

  private getFieldByName(name: string) {
    return this.page.locator(`//input[@name='${name}']`);
  }

  private getErrorMessageByFieldName(name: string) {
    return this.getFieldByName(name).locator("xpath=following-sibling::*[contains(@class, 'invalid-feedback')]");
  }
}
