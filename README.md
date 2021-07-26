[TOC]
- [Introduction](#introduction)
  - [Web app prototype:](#web-app-prototype)
  - [Mobile app prototype:](#mobile-app-prototype)
    - [For iOS: Using Expo Go](#for-ios-using-expo-go)
    - [For Android: Using Expo Go](#for-android-using-expo-go)
    - [Demo accounts](#demo-accounts)
  - [Motivation](#motivation)
  - [Aim](#aim)
  - [User Stories](#user-stories)
- [Features and Usage](#features-and-usage)
  - [Public Features:](#public-features)
    - [Landing Page (Web App)](#landing-page-web-app)
    - [Login Page](#login-page)
    - [Signup Page](#signup-page)
  - [Private Features:](#private-features)
    - [Dashboard (Web App)](#dashboard-web-app)
    - [Add Taskbar](#add-taskbar)
    - [Work-Play Meter](#work-play-meter)
    - [Add Friends Tab](#add-friends-tab)
    - [Friends Work-Play Board](#friends-work-play-board)
    - [Friend Profile](#friend-profile)
    - [Profile Page](#profile-page)
    - [Weekly Progress Graph](#weekly-progress-graph)
    - [Settings Page](#settings-page)
    - [Logout](#logout)
    - [Task Manager/Today’s Schedule](#task-managertodays-schedule)
      - [*Mobile App Version*](#mobile-app-version)
      - [*Web App Version*](#web-app-version)
      - [Task Display](#task-display)
      - [Edit Tasks](#edit-tasks)
      - [Delete Tasks](#delete-tasks)
      - [Toggle Task Description](#toggle-task-description)
      - [Complete Tasks](#complete-tasks)
    - [Calendar Tab](#calendar-tab)
      - [*Mobile App Version*](#mobile-app-version-1)
      - [*Web App Version*](#web-app-version-1)
    - [Upcoming Task](#upcoming-task)
      - [*Mobile App Version*](#mobile-app-version-2)
      - [*Web App Version*](#web-app-version-2)
    - [Dark/Light Mode](#darklight-mode)
      - [*Mobile App Version*](#mobile-app-version-3)
      - [*Web App Version*](#web-app-version-3)
    - [Walkthrough Tutorial](#walkthrough-tutorial)
      - [*Mobile App Version*](#mobile-app-version-4)
      - [*Web App Version*](#web-app-version-4)
- [Project Visualisation](#project-visualisation)
- [Testing](#testing)
  - [Heuristic evaluation (Self evaluation)](#heuristic-evaluation-self-evaluation)
    - [Match between system and the real world](#match-between-system-and-the-real-world)
    - [Error prevention](#error-prevention)
    - [Help users recognise, diagnose and recover from errors](#help-users-recognise-diagnose-and-recover-from-errors)
    - [Visibility of system status](#visibility-of-system-status)
    - [User control and freedom](#user-control-and-freedom)
    - [Recognition rather than recall](#recognition-rather-than-recall)
  - [Usability testing](#usability-testing)
    - [Feedback and resulting fixes:](#feedback-and-resulting-fixes)
  - [Features implemented for the current milestone:](#features-implemented-for-the-current-milestone)


# Introduction

**Proposed Level of Achievement:** Apollo 11

LePlan is a multi-platform project. Thus, accounts can be used in both web app and mobile app :)

## Web app prototype:

Please access [LePlan](https://wlbbot-fdd9e.web.app/)

## Mobile app prototype:

### For iOS: Using Expo Go

1. Download the Expo Go application from the Apple app store on your mobile device: [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779)
2. Using **a second** device - your computer or tablet, click on the [LePlan link](https://expo.io/@baochickawaowao/Le-Plan), a QR code should show up.
3. Open up Expo Go on your **mobile device** and login to the @baochickawaowao Expo Go account.
4. Username: baochickawaowao
5. Password: pewpew123
6. Using the @baochickawaowao account and the Expo Go application, scan the QR code that shows up.
7. Log in with our demo accounts, or sign up for a new LePlan account - DO NOT USE A PASSWORD THAT YOU’LL USE FOR YOUR OTHER ACCOUNTS
8. Start planning.

### For Android: Using Expo Go

1. Download the Expo Go application from the Google play store on your mobile device: [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_SG&gl=US)
2. Using another device - your computer or tablet, click on the [LePlan link](https://expo.io/@baochickawaowao/Le-Plan), a QR code should show up.
3. Open up Expo Go on your mobile device and scan the QR code that shows up
4. Log in with our demo accounts, or sign up for a new LePlan account - DO NOT USE A PASSWORD THAT YOU’LL USE FOR YOUR OTHER ACCOUNTS
5. Start planning. 

### Demo accounts

*Add these accounts as friends or use them to view the profile page of a user who has been on Le Plan for a period of time!*

1. bobby
    - Email: [bobby@b.com](mailto:bobby@b.com) 
    - Password: bobbybobby
    - Username: bobby123
2.  bobo
    - Email: [bobo@b.com](mailto:bobo@b.com)
    - Password: 123123123
    - Username: bobo
3. Or create your own! (Highly recommended to get the full experience, especially the mobile app walkthrough)

## Motivation

When you realise by the end of the week that you have more classes to catch up and more assignments to complete than you have time. You wonder where all the time has gone and can only stressfully rush through everything week after week.

Many may have been overwhelmed by the new curriculum and university environment, that they are confused on how to navigate through this semester-style institution and maintain a firm grasp of effective time-management skills as they are caught up with the many Co-Curricular Activities, faculty engagement, school work, socialisation and more. You want to foster new friendships and explore more communities yet at the same time put in your best effort in school rather than rushing your work and study when you are one day or two from the deadline. You ask yourself where has all your time been spent? Why do some people participate in more external activities than you, yet they are still well on task with their education? You really wish that you have a virtual manager that can help you plan and visualise your week so that you can avoid procrastination and portion your time efficiently such that you can have the best of both worlds (work and play) and achieve work-life balance.

## Aim

We hope to aid in ease of planning and improve time-management skills through our multi-platform application, and achieve better work-life balance.

## User Stories

1. As a student who is juggling many responsibilities in conjunction with a heavy school workload, I want to be able to plan my tasks quickly and conveniently.
2. As a student who finds himself feeling stressed and too caught up with work, I want to be able to regulate the time I spend on schoolwork and have some time to relax and engage in my own interests.
3. As a student who values quality time with friends and family, I want to ensure that I spend enough quality time with my close ones.
4. As a student who finds themselves spending significantly more than the 8h for some modules and, thus, leaving little time for the rest, I want to be able to avoid this and keep track of my time spent on each class.



# Features and Usage

## Public Features:

### Landing Page (Web App)

- New users might not understand the motivation behind our application, as well as what it aims to do. Therefore a landing page was implemented to provide information about our application to potential users.
- Serves as the homepage of our web application that users will see when they first navigate to the website. 
- Contains a navigation bar with links to both signup and login pages for new users to signup for an account, and for existing users to login to their account.



### Login Page

- Page where users with an existing account can log in to use our application. 
- Users log in with the email and password associated with their existing account. 
- Error will be thrown if the password or email is incorrect, suggesting to users to double-check their credentials. 
- Includes a link that will redirect them to the signup page if they do not have an account. 
- Implemented using firebase authentication.



### Signup Page

- Page where users without an existing account can create their own account for our application. 
- Users sign up by choosing a unique username, a display name, their email and password. 
- Error thrown when confirmation password does not correspond to given password and if username has been taken to ensure uniqueness of each user in order to implement our private features.
- Includes a link that will redirect them to the login page if they already have an account. 
- Implemented using firebase authentication. 





## Private Features:

### Dashboard (Web App)
![img](https://lh4.googleusercontent.com/xgyWvax7u-wlcYLLHf4p4SWM4zSHG3JzMlhRm5WzA4eGC_et2eL3Mgq106fdo8WaXj2HAEBfDyObrLy2fXJHMh5y8nMGS89JUf7i2-ljooo4rAxf8Ml9ku7VZ0GlXg_AzgbBG2ED)

- The ‘main page’ of our web application.

- Implemented to contain and display all the important features of our application, so that users have easy access to them at all times (i.e. everything can be accessed here). As we want this platform to be easy to use and more of a one-stop shop idea, without the need to toggle back and forth into tabs/pages.

- User tasks are displayed in the task manager located at the center of the dashboard. 

- The right side of the dashboard contains the work-life meter, a tab to add new tasks, as well as a display for the next upcoming task. 

- Collapsible left tab that can contain either

    <img src="https://lh5.googleusercontent.com/PPXIlldQYu9Rr735ajtZOa6TSbstGP1J4wLMDzqiw5HZ9iCeTlVqdxWG0JQsk2wOoeQuXCaYMqzt4PXu-e9utsDJ09ytKmhsLbpHyEnRcO4YfslUCwZnhnDx2r_vx4wY5PF0Ktsd" alt="img" style="zoom:50%;" /><img src="https://lh6.googleusercontent.com/clqk1zl9PZvaXfHNJNU711KHOh4-kBeUlsY5VjVpHa4xRmAoojE6CnPC4klt0VQre2OH7R4rMysIpE5d8jYtQZ_31GHNySPml3lMWfe4CFmy6W48JPizLAT1p6MoV1yT6iW3sJvE" alt="img" style="zoom: 67%;" />

    - a Calendar tab to toggle the task manager to view tasks on different dates
    - a Friends tab that allows the user to add and view their friends’ progress for the week.
    - Navigation bar at the top that contains the logout button, as well as buttons to toggle the left tab display. 



### Add Taskbar

Web: <img src="https://lh5.googleusercontent.com/Nh433L_H3jzB0mm7ffVk-JPf2co_PyaRfK1FhaYjkXZhiFCh72ilt_UOaSed-XeP7kUq8DqJNWvWL1P22uzuRwVVrUmT20ZEJ3nsD5Hio4o14k_3Oj8JNqf6ieOSz1GSBo_Lrf0W" alt="img" style="zoom: 67%;" />  Mobile: <img src="https://lh4.googleusercontent.com/uvsUiX4YMRReCTsP3-DtFjGEusN6Bkdt_wkJiG36Oa9cCRAvhWkw_ZDNQ3O6zKNwC3gLX-6sUvl8yt7yOZM8OdnQ4faoDRunUh-vEfM53sCgwCsa27QmF6RYyOjm86rxnosnDTmn" alt="img" style="zoom:25%;" />

- Implemented to allow users to add new tasks. 
- Buttons to select a ‘work’ or a ‘play’ task to be added, and displays the corresponding form where users can input the task information. 
- Ensured easy toggling between work and play categories to boost user-friendliness and smoothness of user experience
- Users input the task name, date, time and duration (required field). They can also enter a description (not a required field) for the task if they need to. 
    - By default, current date will be automatically filled for user’s ease of use
    - In the Web App, if another date is selected from the calendar, this add task form will also auto-fill that selected date for user’s convenience
- Users can also decide to cancel action if they change their mind.
- Location:
    - Mobile App: Within the Today’s Schedule Tab as a pop-up window
        - Extra features: added function to automatically cancel add-task event when space outside the popup is pressed.
    - Web App: Inside the right dashboard



### Work-Play Meter

- Implemented to show the current user of their work-play ratio for the current week (starting monday to sunday).

- The values are calculated by adding the durations of ‘work’ and ‘play’ tasks respectively from monday to sunday of the current week.

- We came up with some great math manipulation to get the monday date of the current week, and stored it within the user’s database. This date will be checked only once every re-render and updated accordingly once the user enters a new week. This is to prevent repeated queries to the database if the user logs in multiple times within the same week. 

    - This seemingly simple idea took us too many hours to implement correctly and efficiently :/
    - Compared to our initial solution to forcefully count the number of days back to the monday date of the week and query data to supply the meter every login, this solution is way more efficient
    - More importantly it also tackles the case where the user has not logged in for more than 7 days since our stored date will always be checked (a small cost).

- This allows for visualisation of time spent on work (such as school or ad hoc responsibilities) and play based on duration spent on each task rather than the number of tasks, which we feel gives a more accurate representation.

- Display: 

    - Mobile App: horizontal bar, located in Today’s Schedule<img src="https://lh4.googleusercontent.com/WsfUnVTRpXdYiQaGAvLPu08ssGQ7vUlzrLzlIhPrrmHzQS9sP7NVgZytbyJosohGaowoww4doDVha7X-Bt005iSQWJQHLpTS5FLlpBCRjGtNB094_cq-ouzbuzi8thTL808PCjA9" alt="img" style="zoom: 33%;" />

        - On Press: Toggle the display of ‘work’ or ‘play’ percentages.
        - We decided that a donut chart would take up too much space, which is limited to the small phone screen, thus we decided on a more simpler but still impactful visualisation tool.
        - Having a tab just for the Work-Play Meter seemed a little out of place and meaningless if users have to toggle and do extra work to access this data (which might end up in them not even using this key feature, which defeats the purpose of our app). 
        - As such, we decided to simply put it in Today’s Schedule, our default tab.

    - Web App: semi circle donut chart, located in the right dashboard.

        <img src="https://lh3.googleusercontent.com/5EELDBr3wPTBUMQdwo2Hgo71mCOP4mNjQu3qewd7D2SFMETzcDOXfj_6KlbMHHYLu0ZluTWUpjp3PdtMgA-2KdDVTzZnmhzNdnuiPlxtL8eRT9eshz-Nor7wFnJb4MYntb53MEll" alt="img" style="zoom:67%;" /><img src="https://lh5.googleusercontent.com/WXV1ryuknD2ivCt2rhBoH2cpDxEMXdL_wcxM64_94ujyz5oJj7nPXb4B37vT58o8_Cy-BQpJumDBIjbUiLaMtkLHR4-lvEYQ-09QrUJnHQnrG0BhJofGJhoo4vfwVbJV9y6JvDdW" alt="img" style="zoom:67%;" />

        - On Hover: shows percentage of work/play accordingly

        - Very cool looking :)



### Add Friends Tab

![img](https://lh5.googleusercontent.com/5LiOUuCE7tgkxILnuhaP43MIEtjvxyds5PhvKEsP2WXNK0_x_7feyUEYFVc5yVMoSo7Srs34v1mWJYVNHKPuqH7cUsXbSphjRLpFzyH_ky-i-rFkAJcQNng8ecqHiOVf_xkoDioG)

- Implemented to assist in adding fellow users and friends who use our app.

- Users will be prompted to key in their friend’s unique username to add him/her to their friend board.

     ![img](https://lh4.googleusercontent.com/J5x6UK67y3CLoh86Wql9pmePXm86uWzljJib504bVLxMuj_3_ZbaFl4emd3HlQF8jOdBhiUiJdlZxrKVepzm8VdZ5X7AvKFRuLzhwcFY8LOdItsVbEntPa-umBxk3Ff5_iaRbPxk)![img](https://lh6.googleusercontent.com/IGaR4v_Avv2QONZ546k_lpOsMaAIbnmsGQuEJZo9gzU7NB6eeKxpCIeyNk-35VQP1ad56E8PgxH2y0plbkA38hnqMggxhZ-JZpsd_QmOcaVjAzecGaNQQHmDuqXjkiYVFvT5HAZy)

- We implemented errors that will appear when users key in a username that does not exist, their own username, or usernames that have been already added to their friend board. This is to prevent errors from occurring in the backend which can affect the performance of the application. 

- Once a friend is added, the friend board will immediately update with the new information. 

- Location:

    - Mobile App: Accessed from the Friends tab in bottom navigation
    - Web App: Accessed from the friends icon on the navigation bar



### Friends Work-Play Board

![img](https://lh6.googleusercontent.com/C751Ac48dKEiUSmSg2UcC1F3YDTzkUjcEQJFXFdmx5_czGqQXAk6X8PRStBz7ds1p04y-waq_W1JQKhjAb2MqB13OjJ_MD2fh7Nf9KiSMyq4vcZxOyOhO0kN-HqoR2GPcJVYjZ8g)![img](https://lh4.googleusercontent.com/-kqOkdafChgAiuTMh9159QRFVLahID2S5nZ5FpCWV-WyCSkB_nfwPF4kMLBvOhoi7fEndcNfWihcsGJWaL9h0pPtSIM087s5u0pEao6wuqi7YxHx_4Mrz554yjH0utrknNbP27Hz)

- Implemented with the intention to introduce peer encouragement so that users have a gauge of how their friends are spending their time, and to allow them to motivate each other.
- Our idea of a ‘leaderboard’ as we felt that it was not as feasible to implement the traditional ranked leaderboard given no accurate index/basis of comparison for the ideal work life balance. We also wanted our app to be more lighthearted and less “serious”.
- Displays the friend’s username along with their work-play meter beside it. 
- If there are no friends added yet, a caption will be displayed. 
- Location:
    - Mobile App: Accessed from the Friends tab in bottom navigation
    - Web App: Accessed from the friends icon on the left of the navigation bar



### Friend Profile

Web: <img src="https://lh4.googleusercontent.com/KPAxZlC5Ig6zP3OwWSsQjqwEAHZaJ2dFo_OR-deh_DMUnGr_kxo8WhjSQS0rK-8xIIddrJcZHqU03b4b5-tkN2_1sbiYx1w6hG5DuLs8UfEms-TgLxvcO1J5fFYzUx8acucuI3aA" alt="img"  /> Mobile: <img src="https://lh5.googleusercontent.com/aRRfBKJF0rEPOIrRbGVHBa8Hbv6MRziBKaKxUgAohnWk_ShOTDvgwdffGiekqun9AFXlrtEDnBQ8nbTVI-gaAbgom6O88VGPNEIewfd_4uS55RVEILZb0tRNJRB5YJJqcooGTu2D" alt="img" style="zoom: 25%;" />

- Implemented to allow users to view friend information such as username, profile picture, display name, meter and bio. 
- The friend profile is toggled open by clicking on the friend in the friend list.
- Allows users to delete the friend from their friend list. 
- The friend list is instantly updated upon deletion of a friend. 
- Location: 
    - Mobile App: Accessed by clicking on the friend in the friends tab.
    - Web App: Appears above the friend list, (press on the same friend in the friend list to close the profile) .



### Profile Page

-  Web: <img src="https://lh3.googleusercontent.com/_P040E1k1YwE94DwWpaISoOK7d-UF8wR-Sxa0m7inLcZyGAi-CfpnxIBmtnAFQhSLo8HznLM5MTkuRK52JA-43PUBZW7psg_BBRha1n6RWF5l3KigpTlesbonT3k2Dvu-OePO4z5" alt="img" style="zoom: 50%;" />  Mobile: <img src="https://lh5.googleusercontent.com/ImoaRnX0OjrI5gHqcnUsgHRBvpd9uRsXt9YDTgbMryk0WUn9zWbuRly4_XL1lQCUIXH-f8R3_ChNQYJyjWgBcGZfBS5DwhUu7FjRmhhfWBF0o7ib977LKdRDVIvOfDOkZkDzu0Ru" alt="img" style="zoom:33%;" />
    - Implemented so that users can view their account information.
    - The user can obtain the necessary information (i.e. unique username) to allow others to add them as friends.
    - Shows a target work range that users can set.
    - Provides a direct link to the settings page where users can edit the account information, this makes it more convenient for the users.
    - Location: 
        - Mobile App: Accessed from the ‘profile’ button in the side drawer, which can be opened by swiping right from the left border of the screen. 
        - Web App: Accessed from the profile icon on the left of the navigation bar



### Weekly Progress Graph

Web: <img src="https://lh5.googleusercontent.com/NFM1QGGeccUow0z6y6mrBvQK8rh-ll2EeASaDmkKzDjY8Pdmnc8ABcF3aJME-acwjGtKfMFdwd8v9mgOzsacV2LiFGlBZN8F1x8x5GhGpjAB3o4fFfMuKwxzLPA7f2BndfDvKkmG" alt="img" style="zoom:33%;" />Mobile:<img src="https://lh4.googleusercontent.com/A6F48NbUC9WRrSl9W8gfRKBJ30q52J76q4ABNXZqwqi_KieO2PJyoeIwWtQzx-_vlDkb9gpDcuFfPQHnHEqXjvmBtOVJo8f2lpDj6dd5jdsRmLLr-w3dEmOPkjIdZo5DXAYC6haH" alt="img" style="zoom: 25%;" />

- Implemented so that users are able to track their proportion of activities over the past 4 weeks. 

- Shows the user’s target work range in the graph, serving as a visual aid to the user. 

- The user will be able to see if their targets are met.

- Location: 

    - Mobile App: Accessed from the ‘profile’ button in the side drawer, which can be opened by swiping right from the left border of the screen.
        - Unfortunately, mobile version did not have any chart libraries that could display target range, thus we included this section to show if target is reached!

     <img src="https://lh5.googleusercontent.com/iwjGvvpzwMWfPkbON0O7Y_AeDk3R42cLqzRFtW9Qi_Jc6s_np2fvuG5cHWs0Z3n86vplXD2jQXl3aNqKvGbelRCtwgMo6qt4623CYX-aTIM3ql6aohsXzMOiQ954h2tZGGTEzoYl" alt="img" style="zoom:25%;" /><img src="https://lh6.googleusercontent.com/aNMxC1Z6LAyYWNxWtsM8Elo0Ch90GIfDdo1wwy6q1wDjszBQifC2Lq_K9SvYO2oRwZangSnSnVqgieyN2AX2GPqCD3HxNMHbdDjJ5D4I_exXi5As9v3-xiZrAhDNiAJbKJPELJGQ" alt="img" style="zoom:25%;" />

    - Web App: Accessed from the profile icon on the left of the navigation bar



### Settings Page

Web: <img src="https://lh3.googleusercontent.com/MN2au-sp9K2e2AfUq6QpapOuKHyikyuRoUQ75-6RY1-d6peDToJpqkRjb5DxtK_Polzx_j4QnmHooFnC4zjwNRJlgqLRGy6UW0sJcGPc87Or3vVuGE1_iUu_hl2eOvSdtWeOQ_aT" alt="img" style="zoom: 33%;" />        Mobile: <img src="https://lh3.googleusercontent.com/cYCiEI1zgifwwfpUvqtWyb0BjBThFmiiF5TPOO4w0lQ2mWFu8bTF7T3RZCdrMQUXivRsA84cfeOpK9mn4cuwh1dVsEQMI5_DP3RHrm7dKk09VSyHF6VP9dziwvIiQPibSNZ-K7mD" alt="img" style="zoom:33%;" />

- Implemented to allow users to edit their account information (i.e. password, display name, profile picture, target range) 
- Implemented also to allow users to customise how their profile looks to their friends. 
- We added this to introduce more flexibility and customizability for the user.
- Re authentication is required if the user wishes to change more sensitive information such as their password.
    - The re authentication process requires the user to confirm their existing password, before allowing the form to appear.
- Location: 
    - Mobile App: Accessed from the ‘settings’ button in the side drawer, which can be opened by swiping right from the left border of the screen. 
    - Web App: Accessed from the gear icon on the right of the navigation bar



### Logout

-  Allows users to log out of their account once they are done with their session. 
- Location:
    - Mobile App: drawer navigator
    - Web App: top right hand corner of the navigation bar in the Dashboard. 



***In this section, we clarify the differences in the implementation of certain features in the Mobile App and Web App.***

### Task Manager/Today’s Schedule

#### *Mobile App Version*

<img src="https://lh5.googleusercontent.com/NMA8wNsnrCwcpVEQPaOhNBE1icvvPS_eURs-28fef3zj4W_5d3_RNjghNcrNYCOVxQsLUPA1dW4o_mfcfjb7iWCx85bwGjqSKcipubZAy9iuChT4CGMHsFjcDWa1Wgh5IL5QteH4" alt="img" style="zoom:33%;" /><img src="https://lh5.googleusercontent.com/wsbLQtFnqD70j60aGIdTU-vH5lmbbeYfyDaQ1RN9oblhnTtN0gZClwXuz5_kuM7oWLCfFgMQ8QaI_TveYkz--1LEMgiUsqCBlR9U_I7WSVkIyGRPbH4dpYXnlFjDi8EzQQTpnoA5" alt="img" style="zoom:33%;" />

- Today’s Schedule is a tab that reflects tasks for the only the current day
- Task Manager in this context is more or less integrated into the Calendar Tab     unlike the web app version
- Otherwise, the functions (i.e. edit task, delete task) are all the same



#### *Web App Version*

<img src="https://lh3.googleusercontent.com/fE7e5mnVDkYt0T3pAz7ZPjWmUnG7fXlaoA7468xflUtWFDfM6bFVcYGsfDDdI4aEFFlk06g2sTQIBrIJSz1ceG8W-dqAzAPtDwN_DqbqQ3IMoIhVlF1TUQnfc9pCO17pbYoqf6wa" alt="img" style="zoom:67%;" />

- Task Manager refers to the center dashboard of the web app and displays task (by default for the current day)

- Selecting dates on the calendar of the web app would change displayed tasks to that of the selected date in the task manager

    

#### Task Display

<img src="https://lh3.googleusercontent.com/VApppTifS0UTOBsL_WyZsmwgzwLAXpUivaPL48sjQCbQ-6gM-3l5Vha4HvOqEZf2co0NB_lGwG3iuj_s8gkYQ18E1lPuSLJFLssRsM438LXhJWHLm8M4VBikxAUmr6LnlMhZpqig" alt="img" style="zoom:67%;" />

- Each task is represented as a bar consisting of a checkbox, the starting time, the task name, an icon specifying the type of task, and an icon that can be pressed to delete the task.

     <img src="https://lh6.googleusercontent.com/wuLi4eheAaUIHaXeg1xPt2SWomSajAgT1QDSgWP83-J9FYEB36phMfuWl5HDdRdRlqKWU7vaUauv3OnTvfY4drVAQ_UoMNtCUNCef8lP36nuzkWHxeRX_BbncQrDJY4Lfq5U_Cog" alt="img" style="zoom:67%;" />

- The tasks will be ordered according to their starting time, with the task with the earliest starting time at the top of the list. 

- Completed tasks will be shown in brown at the bottom of the list, also ordered according to their starting time.

- The display updates in real time once the user makes a change to the tasks.



#### Edit Tasks

<img src="https://lh6.googleusercontent.com/wpSIfUDs-ZIb3829mlHSgKzsVqotOUXnhi459_3sEjUb62nOtWJuDWX2ppRqvfZw3OmsMNFDrFJ7EM3jYXn381h24wbpi1HzqyZ9DeokDUCXDmvXabAknV68JP4w6t6kMmHs-O79" alt="img" style="zoom:67%;" />

- Implemented for users to edit their task quickly and easily if they realised that they have made a mistake, or if the task has been rescheduled. 
- Users can click/press on the task in the task manager/today’s schedule/calendar to open up the edit task page. 
- The edit task page contains a form which has been auto filled with the current task details. Users can simply change the fields they want, and submit the form to edit the task. 
- The task manager/today’s schedule/calendar will be updated accordingly once the task has been edited (i.e. disappear from the current page if the task date has been changed). 



#### Delete Tasks

- Implemented so that users can delete tasks in the event of cancellation or change of plans. 
- Tasks can be deleted by pressing on the trash bin icon on the very right of each task. 
- When the task is deleted, it will no longer be included in the calculation of the work-play meter and upcoming task. Both will be recalculated instantly upon deletion of the task. 



#### Toggle Task Description

<img src="https://lh4.googleusercontent.com/lHskw5IB7MBWo2Cglx45an5zZbxKryUOzKhPqKaahufG1v6z7JGwRY0u4OOMlfBS7hQOvGqLtSB_AilJspjIXV9g3EdGYXUeUypu9VRvKcJzctIucFQXwR6YJ0GlLeI0zA-i8VJm" alt="img" style="zoom:67%;" />

- Implemented as we thought that showing the description of every task by default will make the task manager look very cluttered. 
- Hovering over the task with the cursor will display its description at the bottom of the corresponding task, if a task description was specified.



#### Complete Tasks

- Implemented to allow users to indicate tasks which they have completed.
- Users can click on the checkbox to indicate whether a task has been completed. 
- Once checked/unchecked, the page will be re rendered immediately to reflect changes. Completed tasks are shifted to the bottom to enhance usability as these tasks are no longer important and the upcoming tasks should be displayed.
- Completed tasks are also shown in a different colour to differentiate between incomplete and complete tasks clearly. 
- *Meter data dependent on* **Completed Tasks** *vs* **All Planned Tasks** *of the week*
    - We had discussed this in depth as it can be considered as a core feature of our project.We decided that it would be more impactful for the meter to reflect data based on ***All Planned Tasks***
    - This is because if meter data is tagged to completed tasks, users can only visualise their work/play ratio of the week towards the end of the week
    - This may backfire on our purpose as only when completed then users will find out maybe their spent too much time on work/play etc, by then it's too late to make a difference
    - As such, we decided to give users the benefit of doubt and trust them not to game the system by adding work/play tasks in order to “boost their ratio”
    - With Meter data based on all planned tasks, users can then make a good judgment on the tasks for the week or even during planning during the week and be more conscious if their work/play ratio exceeds their personal targets.



### Calendar Tab

#### *Mobile App Version*

<img src="https://lh3.googleusercontent.com/bGsevBNoex1f5StWZAGC_RrDs-gtol0LtY79LdtdsBeXV3pvsjmCzOwQVTsd6pZ7Ooa1rOyQK6BjcG31qrIOhwl2o-nvT2x8H99v-2Fx8pc9UrJodtWG5Oke2FKsxd0e92lDQeK6" alt="img" style="zoom:50%;" /><img src="https://lh5.googleusercontent.com/NMA8wNsnrCwcpVEQPaOhNBE1icvvPS_eURs-28fef3zj4W_5d3_RNjghNcrNYCOVxQsLUPA1dW4o_mfcfjb7iWCx85bwGjqSKcipubZAy9iuChT4CGMHsFjcDWa1Wgh5IL5QteH4" alt="img" style="zoom:50%;" />

- Implemented as a whole tab on its own as an interactive calendar

- Displays the weekly calendar by default, opens on today’s date

- Drag down the “bottom” of displayed calendar to access monthly calendar

- Once a date is selected, the calendar opens up into a weekly format or a ‘calendar list’, where the start time, endtime, task name, task description, work/play category can be seen all at once.

- Movement Events:
    - Swipe left to delete the task 

        <img src="https://lh4.googleusercontent.com/hMdAIDntWyQkrQwL0CufYM1bMOS8lV1NIr3i1QpJ4El52JSd5LbFj0j5k2cbyfTW2JIvqc5x0TOs7uxjrAt0w4gfEpOYEuP8dd42ennARWikwFatPuZqE5Z7oqSP4e2BDZUE84M7" alt="img" style="zoom: 25%;" />

    - Press a specific task to trigger an edit task pop-up. This action can be cancelled.

        <img src="https://lh6.googleusercontent.com/qfWK1_yn0z9R0JTZeA488ud-rD7teXTADIxgMGT8nqOx9COuFZkiCSryai869g_o8-nrbsc98AmoZJSfbdGKkcGD1bicGCeg2bHHJoEtgFzlbjJjSLPeUSsjRkOcn_3sR37Twil7" alt="img" style="zoom: 25%;" />

    - For dates with no tasks: a no task message is shown currently, for ease of implementation. We may remove it.

        <img src="https://lh5.googleusercontent.com/uymZzga9dt1ULkQlGW9gBRBlnFxlipN0rPe7DltYJ0xfOOJGZ10Ekf-IjPDNwTaFtfbxlMTDDqAB-rBq19QBsFIENjXr2xkEkFdyRBLqPc3Fy771eOtle-McQYkxqGad1ZZSGCtB" alt="img" style="zoom: 25%;" />



#### *Web App Version*

![img](https://lh5.googleusercontent.com/PvVXR25YUzu-bHDcO6MZYIamyfahjnZd9LIQQBIRPEqQLFO3i60aLzjjYmypnxegdBJLa0QspaxFKGzDoEQ2dYcSexaXGFvFcbi23go1e70JgEpRfOW4CjI4sCMHp8iv5b0uR8PO)![img](https://lh3.googleusercontent.com/ga9PTdeOSEsbk1kluHKeYVhoJXW5xv1UL7FtGnHysi6usai6zwV6j60QltfLdNXh67UJlRuYy8pY0YQpC1iWNq4pCXsW4ANJNwJbATjUzvyLntfcw85cCItyDzNUeyFf_v3SIOVi)

- Implemented so that users can see their tasks on other dates, and add tasks for a specific date easily. 
- Consists of an input bar to enter a specific date, as well as tabs that correspond to dates 1 week from the current date. The specialised tabs ensure that users have easy access to more pressing tasks that will be occurring sooner. 
- Selecting a date displays the tasks from the selected date onto the center of the dashboard. 
- The date field of the add task form corresponds to the date selected from this calendar tab. This is so that users can physically see the task being added to the corresponding date, ensuring that the task was successfully added. 



### Upcoming Task

#### *Mobile App Version*

We decided that since we already have a Today’s Schedule tab and tasks for other days are accessed through our interactive Calendar tab, upcoming task is not really relevant in the mobile app version



#### *Web App Version*

![img](https://lh3.googleusercontent.com/r9Um9lFCJNZ4oJqFZ3cRka_NUr_k_o1zr0bGwz5b558mg53l8S46TGnAB_q0wsMXnhYkZMkVma-BLQUtdeQERB_1Mtiqp8cQdtSeda_lmL97A4x2E6RWeTkzDpnxdWgOHHrUAO_o)![img](https://lh3.googleusercontent.com/7nKuyCGxw-69AaSuD5uOwVyMwBWlk-ONY-BMyg6Vo3WvVF4-wVom0nDYGmXAc4NAapRNvhTVPDfuNheAxFuw47DTslLXC6iwtb8qSVi7wwaZir1a6b5Oq-Yke3nH2GyHuvge1QL2)

- Implemented so that users can know their next task at a glance. 
- The upcoming task is determined by choosing the task with the closest approaching start time from the current time. 
- The upcoming task is updated in real-time. 
- Located on the right side of the dashboard, below the work-play meter. 



### Dark/Light Mode

#### *Mobile App Version*

Dark/Light mode can be toggled via a slider in the side drawer of the mobile application. This is implemented so that our application is easier on the eyes, depending on the user’s environment. 

#### *Web App Version*

The web app is in permanent dark mode. 



### Walkthrough Tutorial

#### *Mobile App Version*

The walkthrough tutorial will be displayed to the user on their first mobile login The user’s first mobile login is determined by a boolean value stored in the user account database. 

Tutorial will be shown if the boolean value is set to true. This boolean value is initialised to true upon signup. On completion of the mobile tutorial, the boolean value will be set to false, so the tutorial will never be played again. 



#### *Web App Version*

The web application does not contain a tutorial, however users will be notified of ‘hidden’ features via tooltips that will appear upon hovering over certain components. 

Tooltips will contain information about gestures that can be performed on the component. 





# Project Visualisation

**![img](https://lh4.googleusercontent.com/JySw54jqNO6l0zJLHQBLE_LBwWXD33VwZ819ve9gT_4F8hHXKl2rgPuuz8N1j13cR54Vx4nQKJO-eJMk407-aoEmbfN_XY0GQlMR0mR1OU_Sr-ePz7mQWKuP0_sXAbrhR-HLiPBB)**





# Testing

## Heuristic evaluation (Self evaluation)

Conducted heuristic evaluation based on Nielsen’s heuristics for usability:

### Match between system and the real world

Included intuitive icons to show different functions (i.e. trash bin icon to delete tasks, game controller icon to indicate a ‘play’ task, briefcase to indicate a ‘work’ task) 

### Error prevention

Included error messages in friends tab, signup and login pages to prevent errors in the backend (i.e. “Password must be more than 6 characters long”, “Username has been taken”) 

### Help users recognise, diagnose and recover from errors

For errors that can occur in signup and login pages, follow up actions are included along with error messages (i.e. “Failed to log in, please check your email and password”)

The user is given a warning when they are about to delete a task, and is able to cancel or proceed with the action (mobile application only). This protects the user against accidental presses. 

### Visibility of system status

- Added cursor effects when user hovers over a ‘clickable’ item
- Buttons change in color when hovered over by the user
- Captions that indicate absence of tasks/friends 
- Highlight the selected date on the left dashboard tabAdded tooltips that appear on hover to inform users of features (i.e. click to edit task) 
- Added some visual feedback to help users tell which type of task has been selected when they are adding new tasks. 

### User control and freedom

- Allow users to navigate to see tasks in different dates via the left dashboard tab
- Allow users to toggle the display of the left dashboard tab
- Allow users to edit/delete tasks 
- Allow users to edit their own account information

### Recognition rather than recall

- Implemented the upcoming task function so that users do not have to recall the next task from memory 
- Implement work-play meter so that users know their distribution of tasks at a glance
- Added tooltips that appear on hoverto inform users of features (i.e. click to edit task) 



## Usability testing

Conducted usability testing of our web and mobile application prototype with a few friends. 

### Feedback and resulting fixes:

1. “When there are no tasks for the day, task manager does not display anything to indicate, making it seem like the application is bugged out”
    - Added captions to the task manager and meter to tell the user that they have no tasks added. 

2. “Sign up form allows me to submit when nothing is written in the input boxes”
    - We made sure that input fields are required, and that they do not accept empty inputs (i.e. spaces).

3. “Sign up allows me to create an account with the same username as my friend” 
    - Implemented checks to ensure that “bob” and “bob“ are treated as the same username, and thus not allowing users to use usernames that should already be taken. 
4. "Hard to tell which task is completed/incomplete”
    - Used different colours to indicate complete/incomplete tasks, pushed completed tasks to the bottom of the list. 
5. “Friends board does not update upon adding a second friend”
    - Made sure the friends board rerenders upon the addition of a friend

6. “Beginners might not know some ‘hidden’ features i.e. onClick/onPress events”
    - Provided tooltips for the web application that appear on mouse hover to inform users of ‘hidden’ features. 
    - Implemented a walkthrough for the mobile application that showcase the key features

7. “The mobile application allows me to add a task to a past date, which is quite redundant”
    - Time travel does not exist, so we set the minimum date for the datetime input to the current date for the mobile application. 

8. “Units of duration in the add task form is not specified, can be confusing”
    - Specified the units by adding a label to the end of the input box.

9. “Slider input for task time is awkward to use”
    - Changed the input type of the task time by utilising a time picker library.

10. “Fat fingers so I accidentally deleted a task”
    - Provide users with a warning when they are about to delete a task. Users are allowed to cancel or proceed with the action. This guards users from accidental presses, especially on mobile devices. 

11. “My friend wants to add me as a friend but I forgot my username”
    - Implemented profile page where users can check their account details 
    - Implemented settings page so that users can customise how their profile looks to their friends.

12. “The user interaction and the app design can be improved”
    - Added animations to various components so that they move into the page more smoothly, this helps to improve user experience.
    - Revamped the look of the web and mobile application. 
    - Ensured web and mobile apps have similar themes and design. 

13. “Would be good to know which task type is clicked when adding a new task”
    - Added some visual feedback in both the mobile and web apps to help the user tell which type of task is selected (i.e. work/play) when they are adding new tasks. 

14. “Profile page breaks when I try to change the app theme for mobile”
    - Fixed this issue by making sure the profile page refreshes once the theme is changed (mobile only)

15. “Progress graph is difficult to read and a bit complicated”
    - We initially displayed both the work and play percentages on the same graph, however we realised that displaying just one of them is sufficient. 

16. “Duration does not show up when editing task in mobile app”
    - The issue was that the duration value was a number which is not compatible with the input field for the form.
    - We converted the duration value to a string so that it appears in the input field. 

17. “Tutorial does not appear in the mobile application” 
    - If the user created their account on the web application, the tutorial would not show up when they use the mobile application 
    - To fix this, we stored a boolean in the database that indicates their first mobile login. This will be set to false once the tutorial in the mobile app is viewed from their account. 

## Features implemented for the current milestone:

1. Settings page that allows users to change their account info
2. Profile page that displays account info (i.e. profile pic, display name, username) 
3. Individual friend profiles with the option to delete friends
4. Weekly progress graph that displays the weekly work task percentage from the past 4 weeks, along with the target range set. 
5. Dark/light mode for the mobile application