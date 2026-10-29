import { expect, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { step } from "../../utils/reports/decorator";

export class ExpensesPage extends BasePage {
  private readonly pageHeading: Locator = this.page.getByRole("heading", { name: "Fuel expenses" });
  private readonly addExpenseButton: Locator = this.page.getByRole("button", { name: "Add an expense" });
  private readonly lastAddedExpenseEntry: Locator = this.page.locator(".expenses_table tr").nth(1);

  async navigate() {
    await super.navigate("/panel/expenses");
  }

  @step()
  async openAddExpenseForm() {
    await this.clickAndWaitForResponse(this.addExpenseButton, "cars");
  }

  @step()
  async verifyLastExpense(expectedDate: string, expectedMileage: string, expectedLiters: string, expectedCost: string) {
    const formattedCost = expectedCost.includes(".") ? `${expectedCost} USD` : `${expectedCost}.00 USD`;

    await this.checkTextEquals(this.lastAddedExpenseEntry.locator("td").nth(0), expectedDate);
    await this.checkTextEquals(this.lastAddedExpenseEntry.locator("td").nth(1), expectedMileage);
    await this.checkTextEquals(this.lastAddedExpenseEntry.locator("td").nth(2), `${expectedLiters}L`);
    await this.checkTextEquals(this.lastAddedExpenseEntry.locator("td").nth(3), formattedCost);
  }
}
