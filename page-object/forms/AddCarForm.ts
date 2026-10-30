import { expect, Locator } from "@playwright/test";
import { step } from "../../utils/reports/decorator";
import { BaseStep } from "../base/BaseStep";

export class AddCarForm extends BaseStep {
  public readonly formTitle = this.page.locator(".modal-title", { hasText: "Add a car" });
  private readonly brandDropdown = this.page.locator("#addCarBrand");
  private readonly modelDropdown = this.page.locator("#addCarModel");
  private readonly mileageField = this.page.locator("#addCarMileage");
  public readonly addCarButton = this.page.getByRole("button", { name: "Add", exact: true });
  private readonly cancelButton = this.page.getByRole("button", { name: "Cancel" });
  private readonly closeIcon = this.page.locator('button[aria-label="Close"]');
  private readonly successMessage = this.page.locator(".alert-success p", { hasText: "Car added" });
  private readonly lastAddedCarName = this.page.locator(".car_name.h2 ").first();
  private readonly lastAddedCarMileageField = this.page.locator('[name="miles"]').first();

  @step()
  async addNewCar(brand: string, model: string, mileage: string) {
    await this.selectBrand(brand);
    await this.selectModel(model);
    await this.enterMileage(mileage);
    await this.clickAddCarButton();
  }

  @step()
  async verifyCarIsAdded(carName: string, carMileage: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.lastAddedCarName).toHaveText(carName);
    await expect(this.lastAddedCarMileageField).toHaveValue(carMileage);
  }

  @step()
  async selectBrand(brand: string) {
    await this.brandDropdown.selectOption(brand);
  }

  @step()
  async selectModel(model: string) {
    await this.modelDropdown.selectOption(model);
  }

  @step()
  async enterMileage(mileage: string) {
    await this.mileageField.fill(mileage);
  }

  @step()
  async clickAddCarButton() {
    await this.addCarButton.click();
  }

  @step()
  async clickCancelButton() {
    await this.cancelButton.click();
  }

  @step()
  async clickCloseIcon() {
    await this.closeIcon.click();
  }
}
