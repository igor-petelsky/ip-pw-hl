import { Locator } from "@playwright/test";
import { BaseForm } from "./BaseForm";
import { step } from "../../../utils/reports/decorator";

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

  @step()
  async fillName(name: string) {
    await this.nameField.fill(name);
  }

  @step()
  async fillLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  @step()
  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  @step()
  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  @step()
  async fillRepeatPassword(repeatPassword: string) {
    await this.repeatPasswordField.fill(repeatPassword);
  }

  @step()
  async clickRegisterButton() {
    await this.registerButton.click();
  }

  @step()
  async focusOnName() {
    await this.focusOnElement(this.nameField);
  }

  @step()
  async focusOnLastName() {
    await this.focusOnElement(this.lastNameField);
  }

  @step()
  async focusOnEmail() {
    await this.focusOnElement(this.emailField);
  }

  @step()
  async focusOnPassword() {
    await this.focusOnElement(this.passwordField);
  }

  @step()
  async focusOnRepeatPassword() {
    await this.focusOnElement(this.repeatPasswordField);
  }

  @step()
  async blurName() {
    await this.blurElement(this.nameField);
  }

  @step()
  async blurLastName() {
    await this.blurElement(this.lastNameField);
  }

  @step()
  async blurEmail() {
    await this.blurElement(this.emailField);
  }

  @step()
  async blurPassword() {
    await this.blurElement(this.passwordField);
  }

  @step()
  async blurRepeatPassword() {
    await this.blurElement(this.repeatPasswordField);
  }

  @step()
  async checkNameFieldBorderRed() {
    await this.checkFieldBorderRed(this.nameField);
  }

  @step()
  async checkLastNameFieldBorderRed() {
    await this.checkFieldBorderRed(this.lastNameField);
  }

  @step()
  async checkEmailFieldBorderRed() {
    await this.checkFieldBorderRed(this.emailField);
  }

  @step()
  async checkPasswordFieldBorderRed() {
    await this.checkFieldBorderRed(this.passwordField);
  }

  @step()
  async checkRepeatPasswordFieldBorderRed() {
    await this.checkFieldBorderRed(this.repeatPasswordField);
  }
}
