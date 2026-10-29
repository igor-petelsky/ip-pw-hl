import type { Reporter, TestCase } from "@playwright/test/reporter";
import pc from "picocolors";

export default class CustomReporter implements Reporter {
  onTestBegin(test: TestCase) {
    console.log(`${pc.blue("Test started")} ${test.title}`);
  }

  printsToStdio() { //prevents to remove all console logs from runtime
    return false;
  }
}