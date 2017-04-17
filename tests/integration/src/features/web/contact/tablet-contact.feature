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

  Scenario: I click on Contact
    Given the element "ons-toolbar > div.left > ons-toolbar-button" is visible
    When I click on the element "ons-toolbar > div.left > ons-toolbar-button"
    Then I expect that element "ons-splitter-side" becomes visible
    Then I expect that element "ons-splitter-side > ons-page" is visible
    When I click on the fourth element "div.panel__listItem"
    Then I expect that element ".wrap__border" becomes visible

  Scenario: I should see a Contact Page
    Given the element ".wrap__border" is visible   
    Then I wait on element ".wrap__border iframe" to exist
    Then I expect the element ".wrap__border .title__head" is visible
    And I expect the element ".wrap__border .title__head" contains any text
    And I expect that the path is "/#Contact" 

  Scenario: Should See the Contact Form
    Given the element ".wrap__border .wrap__regForm" is visible
    Then I expect the element ".wrap__regForm .wrap__input" is visible
    And I expect that there are 3 ".wrap__regForm .wrap__input ons-input" elements
    And I expect that there are 2 ".wrap__regForm .wrap__input textarea" elements
    And I expect the element ".wrap__border ons-button.button" is visible

  Scenario: I fill out the name input
    Given the element "input[placeholder*='Name']" is enabled
    Then I expect the element "input[placeholder*='Name']" is visible
    When I set the inputfield "input[placeholder*='Name']" to "tester"
    Then I expect the inputfield "input[placeholder*='Name']" contains the text "tester"

  Scenario: I fill out the email input
    Given the element "input[placeholder*='Email']" is enabled
    Then I expect the element "input[placeholder*='Email']" is visible
    When I set the inputfield "input[placeholder*='Email']" to "tester@xschrisians.org"
    Then I expect the inputfield "input[placeholder*='Email']" contains the text "tester@xschrisians.org"

  Scenario: I fill out the subject input
    Given the element "input[placeholder*='Subject']" is enabled
    Then I expect the element "input[placeholder*='Subject']" is visible
    When I set the inputfield "input[placeholder*='Subject']" to "test"
    Then I expect the inputfield "input[placeholder*='Subject']" contains the text "test"

  Scenario: I fill out the text area message
    Given the element "textarea[placeholder*='Message']" is enabled
    Then I expect the element "textarea[placeholder*='Message']" is visible
    When I set the inputfield "textarea[placeholder*='Message']" to "test"
    Then I expect the inputfield "textarea[placeholder*='Message']" contains the text "test"

  Scenario: I click on Submit
    Given the element ".wrap__border ons-button.button" is enabled
    When I click on the element ".wrap__border ons-button.button"
    Then I expect the element ".wrap__regForm + div + div" contains the text "Everything is fineCaptcha failed."

