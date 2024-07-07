Feature: Site tracker assessment

  Scenario: 01 Login Automation
    Given Go to the sitetracker website
    When User enters username as "qa-auto@sitetracker.com"
    And User enters password as "Test123$"
    And User click on Log In button
    #####Scenario: 02 Navigate and Interact
    When User navigates to leads menu
    And User selects the My Leads view
    And User click on filter icon
    And User selects the custom date range "greater than" "1/1/2024"
    And User save filter
    Then User verify the success msg pop up displayed
    And the filter count is "22"
    ###3.	Lead Interaction and Task Creation
    When User search for "Betty Bair" and navigate to profile
    And User navigate to activity tab
    Then User creates below tasks and verify confirmation message
      | Subject                       | DueDate      | RelatedTo | AssignedTo | Status      |
      | Create Budget Plan            | Today        |           |            | In Progress |
      | Submit Budget Plan for Review | After 1 week |           |            | Not Started |
    ###4.	Activity Tab and Task Validation
    And User verifies the tasks are displayed under Activity tab
      | Subject                       |
      | Create Budget Plan            |
      | Submit Budget Plan for Review |
    When User expands the "Create Budget Plan" tasks
    Then User verify the description is ""
    When User selects Edit Comments from the dropdown
    And User adds the comment as "Budget for Q4"
    When User expands the "Create Budget Plan" tasks
    Then User verify the description is "Budget for Q4"
    ###5.	Filter and Display Adjustments
    When User Click on the gear icon next to Filters
    And set the date range to the next 7 days then apply
    Then User verifies the tasks are displayed under Activity tab
      | Subject            |
      | Create Budget Plan |
    When user click on Show All Activities
    And User verifies the tasks are displayed under Activity tab
      | Subject                       |
      | Create Budget Plan            |
      | Submit Budget Plan for Review |
