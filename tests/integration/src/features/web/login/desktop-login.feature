  Feature: 
    Test Staging Site
    As a developer
    I want to be able to test my site in staging
    so I can catch bugs before production in the login view
    
  Scenario: I am on a Desktop Computer
    Given I have a screen that is 1450 by 800 pixels
 
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

  Scenario: I should see a login form
    Given the element ".login-form" is visible
    Then I expect the element ".title__reg__text" contains any text
    And I expect the element ".facebookButtonClass" is visible
    And I expect the element "input[placeholder*='Email']" is visible
    And I expect the element "input[placeholder*='Password']" is visible
    And I expect the element ".login-button" is visible
    And I expect the element ".forgot-password" is visible

  Scenario: I fill out the Email Input
    Given the element "input[placeholder*='Email']" is enabled
    When I set the inputfield "input[placeholder*='Email']" to "xsc@xschristians.org"
    Then I expect the inputfield "input[placeholder*='Email']" contains the text "xsc@xschristians.org"

  Scenario: I fill out the Password Input
    Given the element "input[placeholder*='Password']" is enabled
    When I set the inputfield "input[placeholder*='Password']" to "password"
    Then I expect the inputfield "input[placeholder*='Password']" contains the text "password"

  Scenario: I Click on the Login Button
    Given the element ".login-button" is enabled
    When I click on the element ".login-button"
    Then I expect the element "#topot" becomes visible
