  Feature: 
    Test Staging Site
    As a developer
    I want to be able to test my site in staging
    so I can catch bugs before production in the login view
  
  Scenario: I am on a Mobile Phone
    Given I have a screen that is 320 by 732 pixels
 
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
    And I expect that the path is "/#Register" 


  Scenario: I fill out the First Name input
    Given the element "input[placeholder*='First Name']" is enabled
    Then I expect the element "input[placeholder*='First Name']" is visible
    When I set the inputfield "input[placeholder*='First Name']" to "first"
    Then I expect the inputfield "input[placeholder*='First Name']" contains the text "first"
    
  Scenario: I fill out the Last Name input
    Given the element "input[placeholder*='Last Name']" is enabled
    Then I expect the element "input[placeholder*='Last Name']" is visible
    When I set the inputfield "input[placeholder*='Last Name']" to "last"
    Then I expect the inputfield "input[placeholder*='Last Name']" contains the text "last"

  Scenario: I fill out the email input
    Given the element "input[placeholder*='Email']" is enabled
    Then I expect the element "input[placeholder*='Email']" is visible
    When I set the inputfield "input[placeholder*='Email']" to "xsc@xschristians.org"
    Then I expect the inputfield "input[placeholder*='Email']" contains the text "xsc@xschristians.org"

  Scenario: I fill out the password input
    Given the element "input[placeholder='Password']" is enabled
    Then I expect the element "input[placeholder='Password']" is visible
    When I set the inputfield "input[placeholder='Password']" to "password"
    Then I expect the inputfield "input[placeholder='Password']" contains the text "password"

  Scenario: I fill out the confirm password input
    Given the element "input[placeholder*='Confirm']" is enabled
    Then I expect the element "input[placeholder*='Confirm']" is visible
    When I set the inputfield "input[placeholder*='Confirm']" to "password"
    Then I expect the inputfield "input[placeholder*='Confirm']" contains the text "password"

  Scenario: I Check the TOS Box
    Given I expect the element ".checkbox__input" is visible
    When I click on the element ".checkbox__input"
    Then I expect that the attribute "checked" from element "ons-input.checkbox" is "true"
  
  Scenario: I submit the form
    Given the element ".ion-arrow-right-b" is visible
    When I click on the element "ons-button .ion-arrow-right-b"
    Then I expect the element "ons-row" becomes visible
    And I expect that the path is "/#ContinueRegister"

  Scenario: Should See Continue Registration
    Given the element ".fa-user" is visible
    Then I expect that there are 4 ".profileSectionContainer" elements
    And I expect the first element ".profileSectionContainer" is visible
    And I expect the first element ".profileSectionContainer" contains any text
    And I expect the second element ".profileSectionContainer" is not visible
    And I expect the third element ".profileSectionContainer" is visible
    And I expect the third element ".profileSectionContainer" contains any text
    And I expect the fourth element ".profileSectionContainer" is visible
    And I expect the fourth element ".profileSectionContainer" contains any text
    And I expect that there are 4 ".Select-placeholder" elements

  Scenario:  First Name input should match the last form
    Given the element "input[placeholder*='First Name']" is not enabled
    Then I expect the element "input[placeholder*='First Name']" is visible
    Then I expect the inputfield "input[placeholder*='First Name']" contains the text "first"
    
  Scenario: The Last Name input should match the last form
    Given the element "input[placeholder*='Last Name']" is not enabled
    Then I expect the element "input[placeholder*='Last Name']" is visible
    Then I expect the inputfield "input[placeholder*='Last Name']" contains the text "last"

  Scenario: I click on the male radio button
    Given the element "#radio-male" is enabled
    When I click on the element "#radio-male"
    Then I expect that the attribute "checked" from element "ons-input[input-id*='radio-male']" is "true"

  
  Scenario: Should Fill in the UserName
    Given the element "input[placeholder*='Username']" is enabled
    When I set the inputfield "input[placeholder*='Username']" to "test_user"
    Then I expect the inputfield "input[placeholder*='Username']" contains the text "test_user"

  Scenario: Should Fill In The Date of Birth Date
    Given the element "input[placeholder*='Birth']" is enabled
    When I click on the element "input[placeholder*='Birth']"
    Then I expect the browser to pause for 1000 milliseconds 
    Then I expect the element ".react-datepicker__month" becomes visible
    When I click on the element ".react-datepicker__month :nth-child(2) :nth-child(3)"
    Then I expect the browser to pause for 1000 milliseconds 
    Then I expect the inputfield "input[placeholder*='Birth']" contains any text
  
  Scenario: Should click on the female radio button
    Given the element "#radio-female" is enabled
    When I click on the element "#radio-female"
    Then I expect that the attribute "checked" from element "ons-input[input-id*='radio-female']" is "true"
        
  Scenario: Should Select a Country
    Given the element "#country_select" is visible
    Then I expect the element "#country_select .Select-placeholder" is enabled
    When I click on the element "#country_select .Select-arrow"
    Then I expect the element ".Select-menu-outer" becomes visible
    When I click on the element ".Select-menu-outer"

  Scenario: Should Select a State
    Given the element "#state_select" is visible
    Then I expect the element "#state_select .Select-placeholder" is enabled
    When I click on the element "#state_select .Select-arrow"
    Then I expect the element ".Select-menu-outer" becomes visible
    When I click on the element ".Select-menu-outer"
    
  Scenario: Should Select a Spirituality
    Given the element "#select_spiritual" is visible
    Then I expect the element "#select_spiritual .Select-placeholder" is enabled
    When I click on the element "#select_spiritual .Select-arrow"
    Then I expect the element ".Select-menu-outer" becomes visible
    When I click on the element ".Select-menu-outer"

  Scenario: Should Select a Sport
    Given the element "#select_sports" is visible
    Then I expect the element "#select_sports .Select-placeholder" is enabled
    When I click on the element "#select_sports .Select-arrow"
    Then I expect the element ".Select-menu-outer" becomes visible
    When I click on the element ".Select-menu-outer"

   Scenario: Should Select an Ability
    Given the element "#select_ability" is visible
    Then I expect the element "#select_ability .Select-placeholder" is enabled
    When I click on the element "#select_ability .Select-arrow"
    Then I expect the element ".Select-menu-outer" becomes visible
    When I click on the element ".Select-menu-outer"

  Scenario: Should Click the Action Button
    Given the element ".actionButton" is visible
    Then I expect the element ".actionButton" is enabled
    When I click on the element ".actionButton"
    Then I expect the element ".alert-dialog" becomes visible
    Then I expect the element ".alert-dialog-footer :nth-child(2)" is enabled
    When I click on the element ".alert-dialog-footer :nth-child(2)"
    Then I expect the element ".login-form" becomes visible
     
