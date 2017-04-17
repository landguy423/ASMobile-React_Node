  Feature: 
    Test Dev App
    As a developer
    I want to be able to test my ios app in debug
    so I can catch bugs before deploying
  
  Scenario: We are starting up an ios device
    Given I am on an ios device
    Then I wait on element "IOS_TEXT [@name='ACTION']" to exist
    And I expect the element "IOS_ALERT" becomes visible

  Scenario: Update Available Shows:
    Given the element "IOS_ALERT" is visible
    Then I expect the element "IOS_BUTTON [@name='Ignore']" becomes visible
    When I click on the element "IOS_BUTTON [@name='Ignore']"
    Then I expect the element "IOS_BUTTON [@name='Ignore']" becomes not visible
    Then I expect the element "IOS_TEXT [@name='ACTION']" becomes visible
     
  Scenario: There is a splash screen
    Given the element "IOS_TEXT [@name='ACTION']" is visible
    Then I expect that element "(//XCUIElementTypeStaticText[@name='SIGN UP'])[2]" is visible
    And I expect the element "(IOS_TEXT[@name='LOG IN'])[2]" is visible
        
  Scenario: I click on Sign Up
    Given the element "(//XCUIElementTypeStaticText[@name='SIGN UP'])[2]" is visible 
    When I click on the element "(//XCUIElementTypeStaticText[@name='SIGN UP'])[2]"
    Then I expect the element "IOS_TEXT [@name='Register']" becomes visible

  Scenario: I am on the Sign Up Page
    Given the element "IOS_TEXT [@name='Register']" is visible
    Then I expect the element "IOS_TEXT[@name='CLOSE']" does exist
    And I expect the element "IOS_TEXT[@name='Home']" does exist
    And I expect the element "IOS_TEXT[@name='About']" does exist
    And I expect the element "IOS_TEXT[@name='Store']" does exist
    And I expect the element "IOS_TEXT[@name='Contact']" does exist
    And I expect the element "IOS_TEXT[@name='Join With Your Facebook Account']" is visible
    
  Scenario: I Fill In First Name Field
    Given the element "IOS_TEXT_FIELD[@value='First Name']" is visible
    When I set the inputfield "IOS_TEXT_FIELD[@value='First Name']" to "first_name"
  
  Scenario: I Fill In The Last Name Field
    Given the element "IOS_TEXT_FIELD[@value='Last Name']" is visible
    When I set the inputfield "IOS_TEXT_FIELD[@value='Last Name']" to "last_name"
  
  Scenario: I Fill In The Email Input
    Given the element "IOS_TEXT_FIELD[@value='Email Address']" is visible
    When I set the inputfield "IOS_TEXT_FIELD[@value='Email Address']" to "aljones15@gmail.com"
  
  Scenario: I Fill in the Password Field
    Given the element "IOS_SECURE_TEXT[@value='Password']" is visible
    When I set the inputfield "IOS_SECURE_TEXT[@value='Password']" to "123456789"
  
  Scenario: I Fill in the Confirm Password Field
    Given the element "IOS_SECURE_TEXT[@value='Confirm Password']" is visible
    When I set the inputfield "IOS_SECURE_TEXT[@value='Confirm Password']" to "123456789"
  
  Scenario: I accept the TOS
    Given the element "IOS_SWITCH" is visible
    When I click on the element "IOS_SWITCH"

  Scenario: I Click on Submit
    When I scroll to element "IOS_REGISTRATION_BTN"
    Then I expect the element "IOS_REGISTRATION_BTN" becomes visible
    When I click on the element "IOS_REGISTRATION_BTN"
    Then I expect the element "IOS_TEXT[@value='ContinueRegister']" becomes visible

  Scenario: I quit the app
    Then I quit the simulator
