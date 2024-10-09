// tests/test.spec.js

import { test, expect } from '@playwright/test';
const DataDrivenUtil = require('../utils/data-driven-util'); // Ensure this path is correct
const LoginPage = require('../page-objects/LoginPage');
const AudiencesPage = require('../page-objects/AudiencesPage');


test('Test Login and Segment Creation', async ({ page }) => {
    const testData = await DataDrivenUtil.getTestData('development'); // Load test data
    const { email, password } = testData[0]; // Get the first row of data
  
    const loginPage = new LoginPage(page);
    const audiencesPage = new AudiencesPage(page);
    const segmentName = generateRandomSegmentName();
  
    // Navigate to login page
    await page.goto('https://qaint.kognitivloyalty.com');
  
    // Perform login
    await loginPage.login(email, password);
  
    // Verify login success
    await expect(loginPage.welcomeMessage).toBeVisible();
    await expect(loginPage.moduleTitle).toContainText('Home');
  
    // Navigate to Inspire
    await page.getByText('Inspire').nth(0).click();
  
    // Create a segment
    await audiencesPage.createSegment(segmentName); 
  
    // Search for the created segment
    await audiencesPage.searchSegment(segmentName);
    await expect(page.locator('tbody')).toContainText(segmentName);
  
    // Utility function to generate random 5-digit number
    function generateRandomSegmentName() {
      const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit random number
      return `Auto_Segment_${randomDigits}`;
    }
  });
