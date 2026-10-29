import test, { expect } from "@playwright/test";
import { GaragePage } from "../../page-object/pages/GaragePage";
import { AddCarForm } from "../../page-object/forms/AddCarForm";

test.describe('Garage tests', () => {
    let garagePage: GaragePage;
    let addCarForm: AddCarForm;

    test.use({ storageState: '.states/auth.json' });

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        addCarForm = new AddCarForm(page);

        await garagePage.navigate();
        await garagePage.openAddCarForm();
    })

    test('Add new car - BMW X5', async () => {
        await addCarForm.addNewCar('BMW', 'X5', '999');
        await addCarForm.verifyCarIsAdded('BMW X5', '999');
    })

    test('Add new car - Audi Q7', async () => {
        await addCarForm.addNewCar('Audi', 'Q7', '999');
        await addCarForm.verifyCarIsAdded('Audi Q7', '999');
    })

    test('Add new car without mileage', async () => {
        await addCarForm.selectBrand('BMW');
        await addCarForm.selectModel('X5');
        await expect(addCarForm.addCarButton).toBeDisabled();
    })

    test('Close "Add a car" form via "Cancel" button', async () => {
        await addCarForm.clickCancelButton();
        await expect(addCarForm.formTitle).not.toBeVisible();
    })

    test('Close "Add a car" form via close icon', async () => {
        await addCarForm.clickCloseIcon();
        await expect(addCarForm.formTitle).not.toBeVisible();
    })
});