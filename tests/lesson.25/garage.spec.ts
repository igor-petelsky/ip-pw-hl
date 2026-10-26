import { test } from "../../utils/fixtures/pagesFixtures";
import { expect } from "@playwright/test";

test.describe("Garage tests with pages fixture", () => {
  test.use({ storageState: ".states//testuser1.json" });

  test.beforeEach(async ({ app }) => {
    await app.garagePage.navigate();
    await app.garagePage.openAddCarForm();
  });

  test("Add new car - BMW X5", async ({ app }) => {
    await app.addCarForm.addNewCar("BMW", "X5", "999");
    await app.addCarForm.verifyCarIsAdded("BMW X5", "999");
  });

  test("Add new car - Audi Q7", async ({ app }) => {
    await app.addCarForm.addNewCar("Audi", "Q7", "222");
    await app.addCarForm.verifyCarIsAdded("Audi Q7", "222");
  });

  test("Add new car without mileage", async ({ app }) => {
    await app.addCarForm.selectBrand("BMW");
    await app.addCarForm.selectModel("X5");
    await expect(app.addCarForm.addCarButton).toBeDisabled();
  });

  test('Close "Add a car" form via "Cancel" button', async ({ app }) => {
    await app.addCarForm.clickCancelButton();
    await expect(app.addCarForm.formTitle).not.toBeVisible();
  });

  test('Close "Add a car" form via close icon', async ({ app }) => {
    await app.addCarForm.clickCloseIcon();
    await expect(app.addCarForm.formTitle).not.toBeVisible();
  });
});
