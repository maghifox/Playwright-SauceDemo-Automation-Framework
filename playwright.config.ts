import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, './src/config/.env') });

// if (!process.env.NODE_ENV) {
//   require('dotenv').config({ path: `${__dirname}//src//config//.env` });
// }
// else {
//   require('dotenv').config({ path: `${__dirname}//src//config//.env.${process.env.NODE_ENV}` });
// }

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.saucedemo.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'login-chromium',
      testMatch: 'login.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'login-firefox',
    //   testMatch: 'login.spec.ts',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'login-webkit',
    //   testMatch: 'login.spec.ts',
    //   use: { ...devices['Desktop Safari'] },
    // },
    {
      name: "setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      testIgnore: 'login.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: "./src/config/auth.json",
      },

      dependencies: ["setup"],
    },

    // {
    //   name: 'firefox',
    //   testIgnore: 'login.spec.ts',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: "./src/config/auth.json",
    //   },
    //   dependencies: ["setup"],
    // },

    // {
    //   name: 'webkit',
    //   testIgnore: 'login.spec.ts',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: "./src/config/auth.json",
    //   },
    //   dependencies: ["setup"],
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
