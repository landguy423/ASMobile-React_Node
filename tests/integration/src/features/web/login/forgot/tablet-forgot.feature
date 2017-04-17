   Feature: 
    Test Staging Site
    As a developer
    I want to be able to test my site in staging
    so I can catch bugs before production in the login view
    
  Scenario: I am on a Tablet
    Given I have a screen that is 955 by 800 pixels
 
  Scenario: I go to the site and the anchor tag #HOME is added to the path
    Given I open the site "/"
    Then I expect that the title is "Action Sports Community"
    Then I expect that element "#topot" becomes visible
    Then I expect that the path is "/#HOME"

   Scenario: I click on Login
    Given the element "ons-toolbar > div.left > ons-toolbar-button" is visible
    When I click on the element "ons-toolbar > div.left > ons-toolbar-button"
    Then I expect that element "ons-splitter-side" becomes visible
    Then I expect that element "ons-splitter-side > ons-page" is visible
    Then I expect the browser to pause for 1000 milliseconds
    When I click on the second element ".custom__button"
    Then I expect that element ".login-form" becomes visible

  Scenario: I should see a a forgot password link
    Given the element ".forgot-password" is visible
    When I click on the element ".forgot-password"
    Then I expect the element "#reset_password" becomes visible

  Scenario: I fill in the password field
    Given the element "#reset_password input[placeholder*='Email']" is enabled
    When I set the inputfield "#reset_password input[placeholder*='Email']" to "xsc@xschristians.org"
    Then I expect the inputfield "input[placeholder*='Email']" contains the text "xsc@xschristians.org"

  Scenario: I click on Reset Password
    Given the element "#reset_password .login-button" is enabled
    When I click on the element "#reset_password .login-button"
    Then I expect the browser to pause for 5000 milliseconds
    Then I expect the element ".dialog-container" becomes visible
