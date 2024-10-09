// page-objects/loginPage.js

class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.getByLabel('Email Address');
      this.passwordInput = page.getByLabel('Password');
      this.loginButton = page.getByRole('button', { name: 'Login' });
      this.welcomeMessage = page.locator('#txtWelcomeMessage');
      this.moduleTitle = page.locator('#ctl05_ControlTitle_lblModuleTitle');
    }
  
    async login(email, password) {
      await this.emailInput.click();
      await this.emailInput.fill(email);
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  }
  
  module.exports = LoginPage;
  