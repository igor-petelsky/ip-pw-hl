# Playwright Test Automation

End-to-end test automation project built with **Playwright** and **TypeScript**.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- npm

## Installation

Clone the repository:

git clone https://github.com/igor-petelsky/ip-pw-hl.git
cd to project-directory

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

## Environment Configuration

The website is protected by HTTP Basic Authentication.

Before running the tests, create a .env.local file in the project root directory and request the authentication credentials from the project owner.

Add the following variables:

HTTP_USERNAME=""
HTTP_PASSWORD=""

Replace the empty values with the provided credentials.

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

You can see the latest test run report via this link: https://igor-petelsky.github.io/ip-pw-hl/
