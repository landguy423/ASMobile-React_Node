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

    Scenario: I want to check the tool bar
      Given the element "ons-toolbar" is visible
      Then I expect that there are 3 "ons-toolbar > div" elements
    
    Scenario: I want to ensure the left toolbar is there
      Given the element "ons-toolbar > div.left > ons-toolbar-button" is visible
      When I click on the element "ons-toolbar > div.left > ons-toolbar-button"
      Then I expect that element "ons-splitter-side" becomes visible
      Then I expect that element "ons-splitter-side > ons-page" is visible
   
    Scenario: Browsing the side menu
      Given the element "ons-list" is visible
      Then I expect that there are 4 "ons-list > div.panel__listItem" elements
      And I expect the first element "div.panel__listItem" contains the text "Home"
      And I expect the second element "div.panel__listItem" contains the text "About"
      And I expect the third element "div.panel__listItem" contains the text "Store"
      And I expect the fourth element "div.panel__listItem" contains the text "Contact"
   
    Scenario: The sidemenu should have 3 buttons
      Then I expect that there are 3 "ons-splitter-side .custom__button" elements
      Then I expect the first element "ons-splitter-side .custom__button" contains the text "SIGN UP"
      And I expect the second element "ons-splitter-side .custom__button" contains the text "LOG IN"
      And I expect the third element "ons-splitter-side .custom__button" contains the text "ForceCrash"

    Scenario: When you close the sidemenu it should disappear
      Given the element ".panel__page__close" is visible
      When I click on the element ".panel__page__close"
      Then I expect the element ".panel__page__close" becomes not visible
      Then I expect the element "div.panel__listItem" is not visible

    Scenario: The navbar should have a logo
      Given the element ".navbar__centerLogo" is visible
      Then I expect the element ".center img" is visible
      And I expect that element ".center img" is not empty
      And I expect the element ".center img" is between 30px and 60px tall
      And I expect the element ".center img" is between 75px and 120px wide
     
    Scenario: Navbar Right should be there
      Given the element ".navigation-bar__right" is visible
      Then I expect the element ".zmdi-shopping-cart" is visible
      And I expect the element ".navigation-bar__right > div > div" does not exist
      
   Scenario: There is a Central Display
     Given the element "#topot" is visible
     Then I expect the element "#topot" has the class "homeMobile__header"
     Then I expect the element "#topot .homeTablet__header__connect" contains any text
     And I expect the element "#topot .homeTablet__header__action" contains any text
     And I expect the element "#topot .homeTablet__header__button__signup" contains the text "SIGN UP"
     And I expect the element "#topot .homeTablet__header__button__login" contains the text "LOG IN"

  Scenario: We should scroll down and find sales text
    Given the element "#topot + div" is visible
    Then I expect the element "#topot + div" contains any text
    And I expect that there are 2 "#topot + div .custom__button" elements
    And I expect the element ".homeTablet__join__image" is visible
    
  Scenario: We should see the app sales text
    Given the element "App Section + div" is visible
    Then I expect the element "App Section + div" contains any text
    And I expect that there are 3 "App Section + div img" elements
    And I expect the element "a[href*='https://play.google.com/']" is enabled
    And I expect the element "a[href*='https://www.apple.com/itunes/']" is enabled

  Scenario: We should see the latest community members
    Given the element "Community Section + div" is visible
    Then I expect the element "Community Section + div" contains any text

  Scenario: We should see a red connect bar
    Given the element "Connected Section + div" is visible
    Then I expect the element "Connected Section + div" contains any text
    And I expect that there are 1 "Connected Section + div .custom__button" elements
    And I expect the element "Connected Section + div .custom__button" is visible
    And I expect the element "Connected Section + div .custom__button" contains any text

  Scenario: I click on About
    Given the element "ons-toolbar > div.left > ons-toolbar-button" is visible
    When I click on the element "ons-toolbar > div.left > ons-toolbar-button"
    Then I expect that element "ons-splitter-side" becomes visible
    Then I expect that element "ons-splitter-side > ons-page" is visible
    Then I expect the browser to pause for 1000 milliseconds
    When I click on the second element "div.panel__listItem"
    Then I expect that element ".about__wrap" becomes visible

  Scenario: The About Page Should be Displayed
    Given the element ".about__wrap" is visible
    Then I expect that there are 5 ".about__wrap__text p" elements
    And I expect the element ".about__wrap__text" contains any text
    And I expect the element ".about__wrap__text a" is enabled
    And I expect that the path is "/#About"
    And I expect the element ".back-button__icon" is visible
    When I click on the element ".back-button__icon"
    Then I expect the element "ons-toolbar" becomes visible

  Scenario: I click on Store
    Given the element "ons-toolbar > div.left > ons-toolbar-button" is visible
    When I click on the element "ons-toolbar > div.left > ons-toolbar-button"
    Then I expect that element "ons-splitter-side" becomes visible
    Then I expect that element "ons-splitter-side > ons-page" is visible
    Then I expect the browser to pause for 1000 milliseconds
    When I click on the third element "div.panel__listItem"
    Then I expect that element "#topot" becomes visible

  Scenario: Store Page Is Displayed
    Given the element "#topot" is visible
    Then I expect the element "#topot" contains any text
    And I expect that the path is "/#Store"
    And I expect the element ".back-button__icon" is visible
    When I click on the element ".back-button__icon"
    Then I expect the element "ons-toolbar" becomes visible

  Scenario: I click on Contact
    Given the element "ons-toolbar > div.left > ons-toolbar-button" is visible
    When I click on the element "ons-toolbar > div.left > ons-toolbar-button"
    Then I expect that element "ons-splitter-side" becomes visible
    Then I expect that element "ons-splitter-side > ons-page" is visible
    Then I expect the browser to pause for 1000 milliseconds
    When I click on the fourth element "div.panel__listItem"
    Then I expect that element ".wrap__border" becomes visible

  Scenario: I should see a Contact Page
    Given the element ".wrap__border" is visible
    Then I expect the element ".wrap__border .title__head" is visible
    And I expect the element ".wrap__border .title__head" contains any text
    And I expect that the path is "/#Contact" 

  Scenario: Should See the Contact Form
    Given the element ".wrap__border .wrap__regForm" is visible    
    Then I wait on element ".wrap__border iframe" to exist
    Then I expect the element ".wrap__regForm .wrap__input" is visible
    And I expect that there are 3 ".wrap__regForm .wrap__input ons-input" elements
    And I expect that there are 2 ".wrap__regForm .wrap__input textarea" elements
    And I expect the element ".wrap__border ons-button.button" is visible
    And I expect the element ".back-button__icon" is visible
    Then I expect the browser to pause for 1000 milliseconds
    When I click on the element ".back-button__icon"
    Then I expect the element "ons-toolbar" becomes visible

  Scenario: I click on Sign Up
    Given the element "ons-toolbar > div.left > ons-toolbar-button" is visible
    When I click on the element "ons-toolbar > div.left > ons-toolbar-button"
    Then I expect that element "ons-splitter-side" becomes visible
    Then I expect that element "ons-splitter-side > ons-page" is visible
    Then I expect the browser to pause for 1000 milliseconds
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
