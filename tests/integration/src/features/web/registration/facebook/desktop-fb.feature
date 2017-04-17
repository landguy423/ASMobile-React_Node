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
  
  Scenario: I click on Sign Up
    Given the element "ons-toolbar > div.left > ons-toolbar-button" is visible
    When I click on the element "ons-toolbar > div.left > ons-toolbar-button"
    Then I expect that element "ons-splitter-side" becomes visible
    Then I expect that element "ons-splitter-side > ons-page" is visible
    When I click on the first element "ons-list + div .custom__button"
    Then I expect that element ".wrap__border" becomes visible

  Scenario: The Sign Up Page is Visible
    Given the element ".wrap__border" is visible
    Then I expect the element ".wrap__border .title__head" contains any text
    And I expect the element ".wrap__border .title__small" contains any text
    And I expect the element ".wrap__border .title__reg" contains any text
    And I expect the element ".wrap__border .facebookButtonClass" is visible
    And I expect the element ".wrap__border .wrap__regForm" is visible
    And I expect that there are 5 ".wrap__border .wrap__input input" elements
    Then I expect that the path is "/#Register"

  Scenario: Should Focus on the Facebook Window
    Given the element ".wrap__border " is visible
    Then I expect the browser to pause for 5000 milliseconds
    When I focus the last opened window
    Then I expect the element ".fb_content" becomes visible

  Scenario: Should Find Login Form
    Given the element ".login_form_container" is visible
    Then I expect that there are 19 ".login_form_container input" elements
    And I expect the element ".reset_password" is visible

  Scenario: Should Fill in the Email
    Given the element ".login_form_container input#email" is enabled
    When I set the inputfield "input#email" to "FACEBOOK_USERNAME"
    Then I expect the inputfield "input#email" contains the text "FACEBOOK_USERNAME"

  Scenario: Should Fill in the Password
    Given the element ".login_form_container input#pass" is enabled
    When I set the inputfield "input#pass" to "FACEBOOK_PASSWORD"
    Then I expect the inputfield "input#pass" contains the text "FACEBOOK_PASSWORD"

  Scenario: Should Click on Submit
    Given the element "#loginbutton" is visible
    When I click on the element "#loginbutton"
    Then I expect the browser to pause for 2000 milliseconds
    When I focus the last opened window
    Then I expect the element "#topot" becomes visible
