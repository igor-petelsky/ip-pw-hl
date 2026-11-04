# Playwright Test Automation

End-to-end test automation project built with **Playwright** and **TypeScript**.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- npm

## Installation

Clone the repository:

git clone https://github.com/igor-petelsky/ip-pw-hl.git
cd <project-directory>

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

## Running Tests

### Run all UI tests

npx playwright test --project=e2e

### Run all api tests

npx playwright test --project=api

### Run a specific test file

npx playwright test --project=e2e tests/ui/garage.spec.ts

## Test Reports

After test execution, open the HTML report:

npx playwright show-report


