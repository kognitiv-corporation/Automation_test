import { test, expect } from '@playwright/test';

class AudiencesPage {
  constructor(page) {
    this.page = page;

    // Element locators
    this.createSegmentButton = page.getByRole('button', { name: 'Create Promotional Segment' });
    this.nameInput = page.getByLabel('Name');
    this.externalReferenceInput = page.getByLabel('External Reference');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.createSegmentFinalButton = page.getByRole('button', { name: 'Create Segment' });
    this.searchInput = page.getByPlaceholder('Search...');
    this.audiencesButton = page.getByRole('link', { name: ' Audiences' });
    
    this.noCheckbox = page.getByRole('checkbox', { name: 'No' });
    this.allText = page.getByText('All', { exact: true });
    this.ruleDropdown = page.locator('#pr_id_18_label');
    this.ruleCategory = page.getByText('Select a Rule Category');
    this.clubRules = page.getByLabel('Club Rules');
    this.assignedToClubs = page.getByText('Assigned to Number of Clubs');
    this.memberOfClub = page.getByLabel('Member Of Club');
    this.clubSelection = page.getByText('1AFunctionizeClub');
    this.uiAutomation = page.getByText('UI_Automation');

    this.promotionalSegmentNameText = page.getByText('Promotional Segment Name');
    this.promotionalGroupExternalText = page.getByText('Promotional Group External');
    this.loyaltyClubText = page.getByText('Loyalty Club is equal to (=)');
    this.uiAutomationText = page.locator('b'); // Assuming this is the locator for 'UI_Automation'
  }

  // Helper method to wait for an element
  async waitForElement(locator, timeout = 5000) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
    } catch (error) {
      throw new Error(`Failed to wait for the element: ${locator.toString()}. Error: ${error}`);
    }
  }

  // Helper method to fill an element with text
  async fillElement(locator, text) {
    try {
      await this.waitForElement(locator);
      await locator.fill(text);
    } catch (error) {
      throw new Error(`Failed to fill the element: ${locator.toString()} with text: ${text}. Error: ${error}`);
    }
  }

  // Refactored createSegment method
  async createSegment(name) {
    try {

      await this.navigateToAudiences();
      await this.clickCreateSegmentButton();
      await this.fillSegmentDetails(name);
      await this.clickContinueButton();

      await this.selectNoCheckbox();
      await this.selectAll();
      await this.openRuleDropdown();
      await this.selectRuleCategory();
      await this.selectClubRules();
      await this.selectAssignedToClubs();
      await this.selectMemberOfClub();
      await this.selectClub();
      await this.selectUIAutomation();

      await this.clickContinueButton();
      await this.verifyPromotionalSegmentName(name);
     // await this.verifyPromotionalGroupExternal();
      //await this.verifyLoyaltyClub();
      //await this.verifyUIAutomation();
      await this.waitForElement(this.createSegmentFinalButton);
      await this.clickCreateSegmentFinalButton();

      // await this.waitForElement(this.createSegmentFinalButton);
      // await this.createSegmentFinalButton.click();
    } catch (error) {
      console.error(`Error creating segment: ${error}`);
    }
  }

  async searchSegment(name) {
    try {
      await this.fillElement(this.searchInput, name);
      await this.searchInput.press('Enter');
    } catch (error) {
      console.error(`Error searching for segment: ${error}`);
    }
  }

    // Method to navigate to Audiences
    async navigateToAudiences() {
      await this.waitForElement(this.audiencesButton);
      await this.audiencesButton.click();
    }
  
    // Method to click Create Segment button
    async clickCreateSegmentButton() {
      await this.waitForElement(this.createSegmentButton);
      await this.createSegmentButton.click();
    }
  
    // Method to fill in Segment Name and External Reference
    async fillSegmentDetails(name) {
      await this.fillElement(this.nameInput, name);
      await this.fillElement(this.externalReferenceInput, '');
    }
  
    // Method to click the Continue button
    async clickContinueButton() {
      await this.waitForElement(this.continueButton);
      await this.continueButton.click();
    }


  async selectNoCheckbox() {
    try {
      await this.waitForElement(this.noCheckbox);
      await this.noCheckbox.click();
    } catch (error) {
      console.error(`Error selecting 'No' checkbox: ${error}`);
    }
  }

  async selectAll() {
    try {
      await this.waitForElement(this.allText);
      await this.allText.click();
    } catch (error) {
      console.error(`Error selecting 'All': ${error}`);
    }
  }

  async openRuleDropdown() {
    try {
      await this.waitForElement(this.ruleDropdown);
      await this.ruleDropdown.click();
    } catch (error) {
      console.error(`Error opening rule dropdown: ${error}`);
    }
  }

  async selectRuleCategory() {
    try {
      await this.waitForElement(this.ruleCategory);
      await this.ruleCategory.click();
    } catch (error) {
      console.error(`Error selecting rule category: ${error}`);
    }
  }

  async selectClubRules() {
    try {
      await this.waitForElement(this.clubRules);
      await this.clubRules.click();
    } catch (error) {
      console.error(`Error selecting 'Club Rules': ${error}`);
    }
  }

  async selectAssignedToClubs() {
    try {
      await this.waitForElement(this.assignedToClubs);
      await this.assignedToClubs.click();
    } catch (error) {
      console.error(`Error selecting 'Assigned to Number of Clubs': ${error}`);
    }
  }

  async selectMemberOfClub() {
    try {
      await this.waitForElement(this.memberOfClub);
      await this.memberOfClub.click();
    } catch (error) {
      console.error(`Error selecting 'Member Of Club': ${error}`);
    }
  }

  async selectClub() {
    try {
      await this.waitForElement(this.clubSelection);
      await this.clubSelection.click();
    } catch (error) {
      console.error(`Error selecting club: ${error}`);
    }
  }

  async selectUIAutomation() {
    try {
      await this.waitForElement(this.uiAutomation);
      await this.uiAutomation.click();
    } catch (error) {
      console.error(`Error selecting 'UI Automation': ${error}`);
    }
  }

   // New methods for each step in finalizeSegmentCreation
   async clickContinueButton() {
    await this.waitForElement(this.continueButton);
    await this.continueButton.click();
  }

  async verifyPromotionalSegmentName(name) {
    await this.waitForElement(this.promotionalSegmentNameText);
    await expect(this.promotionalSegmentNameText).toBeVisible();
    await expect(this.page.locator('app-stepper')).toContainText(name);
  }

  async verifyPromotionalGroupExternal() {
    await this.waitForElement(this.promotionalGroupExternalText);
    await expect(this.promotionalGroupExternalText).toBeVisible();
    await expect(this.page.locator('app-stepper')).toContainText(this.nameInput); // Assuming this is where the external reference is stored
  }

  async verifyLoyaltyClub() {
    await this.waitForElement(this.loyaltyClubText);
    await expect(this.loyaltyClubText).toBeVisible();
  }

  async verifyUIAutomation() {
    await this.waitForElement(this.uiAutomationText);
    await expect(this.uiAutomationText).toContainText('UI_Automation');
  }

  async clickCreateSegmentFinalButton() {
    await this.waitForElement(this.createSegmentFinalButton);
    await this.createSegmentFinalButton.click();
  }

}

module.exports = AudiencesPage;
