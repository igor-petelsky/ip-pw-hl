import { Locator } from "@playwright/test";
import { BaseForm } from "./BaseForm";

export class SignUpForm extends BaseForm {
  private readonly nameField: Locator = this.page.locator("#signupName");
  private readonly lastNameField: Locator = this.page.locator("#signupLastName");
  private readonly emailField: Locator = this.page.locator("#signupEmail");
  private readonly passwordField: Locator = this.page.locator("#signupPassword");
  private readonly repeatPasswordField: Locator = this.page.locator("#signupRepeatPassword");
  private readonly registerButton: Locator = this.page.getByRole("button", { name: "Register" });
  private readonly invalidBorderColor = "rgb(220, 53, 69)";
  private async checkFieldBorderRed(field: Locator) {
    await this.checkElementCssValue(field, "border-color", this.invalidBorderColor);
  }

  async fillName(name: string) {
    await this.nameField.fill(name);
  }

  async fillLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }
  async fillRepeatPassword(repeatPassword: string) {
    await this.repeatPasswordField.fill(repeatPassword);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async focusOnName() {
    await this.focusOnElement(this.nameField);
  }

  async focusOnLastName() {
    await this.focusOnElement(this.lastNameField);
  }

  async focusOnEmail() {
    await this.focusOnElement(this.emailField);
  }
  async focusOnPassword() {
    await this.focusOnElement(this.passwordField);
  }
  async focusOnRepeatPassword() {
    await this.focusOnElement(this.repeatPasswordField);
  }

  async blurName() {
    await this.blurElement(this.nameField);
  }

  async blurLastName() {
    await this.blurElement(this.lastNameField);
  }

  async blurEmail() {
    await this.blurElement(this.emailField);
  }
  async blurPassword() {
    await this.blurElement(this.passwordField);
  }
  async blurRepeatPassword() {
    await this.blurElement(this.repeatPasswordField);
  }

  async checkNameFieldBorderRed() {
    await this.checkFieldBorderRed(this.nameField);
  }
  async checkLastNameFieldBorderRed() {
    await this.checkFieldBorderRed(this.lastNameField);
  }
  async checkEmailFieldBorderRed() {
    await this.checkFieldBorderRed(this.emailField);
  }
  async checkPasswordFieldBorderRed() {
    await this.checkFieldBorderRed(this.passwordField);
  }
  async checkRepeatPasswordFieldBorderRed() {
    await this.checkFieldBorderRed(this.repeatPasswordField);
  }
}
