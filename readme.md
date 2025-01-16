# GitGrit

## Link to publicly deployed app: https://bottom-right.web.app

## Team Members and Roles:

- Thomas: Mainly worked on calendar components and CSS
- Walter: Mainly worked on Navigation and CSS
- Brian: Worked on the routines as well as the database and exercises.
- August: Added custom workouts and integrared workout API with database

## User Audience and Needs

The audience we chose to address is people who exercise. People who exercise are a community who need a way to track their progress because they value self-improvement. We tried to make our app as broad as possible because we understand there are many different ways to exercise. From exercise suggestions of Seated Head Harness Neck Resistance to roller skating to Power Snatches, users should be able to find and record new workouts. If the user cannot find their specific workout, they can always make their own, with the ability to toggle between time, weight, distance, etc. Our app tried to address the needs of users to find new workouts but also for users to be able to conveniently record their workout as quickly as possible. This is why we made routines, where users can build their own or choose from public routines, to easily add exercises to their day.

## Demo:

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/e991a72c-9f02-443d-8c53-d05a5ae8af65)

Here is our SignIn page, uses Firebase Auth. We went minimal on the colors, to keep it looking modern, but we like how the teal contrasts with the black background. The image is credited below and in the App.

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/e110ccd3-312e-41ec-a3b3-a63879048b74)

This is our homepage, currently, there is no data so it displays a nice message. In the top right you can see the user is signed in and in the top left you can see the menu. The menu links to Profile, Calendar, and Dashboard, which is where the user is currently. The pages are implemented using react-router.

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/fae2bf83-ee1f-4ceb-9423-fb41db333f6e)

The calendar shows user's previous workouts. Since we haven't added any workouts there are none present. Click on a previous day to see past day's exercises.

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/e6197c42-0a84-4df8-ae16-51d932f616cb)

Profile, which the user can get to through the menu or by clicking on their image.

Going back to the dashboard, clicking on add workout will take you to a new page, where the user can add a custom exercise, choose from an exercise in our API, or create a routine, all shown below.

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/fe800521-3c1c-49a8-8e7e-bc34bf971a02)

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/2614225e-0d0d-45d3-bd4d-775478ca884e)

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/64dea21a-ba08-48db-8fff-ab44aa12a500)

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/c9c73154-1759-4f4e-aedb-09711b83bfcb)


There is a nice loading element whenever we make a call to an asynchronous function, however, it only shows in Local Host for some reason I couldn't figure out. All pages only allow signed-in users to access them, or add or view data. The fields for exercises and routines must be filled out as well, or a message will appear reminding the user.

After you enter some exercises, create some custom exercises and make a routine and add it to your exercises, or choose a public routine to add, navigating back to the dashboard should show your exercises for today.

These exercises are stored in Firebase:

![image](https://github.com/lmu-cmsi2021-fall2023/your-own-bottom-right/assets/112523802/844e764e-5f08-4da3-b464-5f59c27a0afc)

There's lots more to discover within the app that this brief explanation does not touch on. Go ahead and explore!


## Technology Highlights:

- Used an API for the exercise suggestions: https://api-ninjas.com/api/exercises
- Our database has two collections. The main collection, users, stores information about the user as well as their custom exercises and routines. The routines are stored in the database with a name for the workout, and underneath all the exercises composing the workout. The custom workout and days are very similar, as they hold the same thing, exercises, but days are indexed by the current day, this is where we store what exercises the user has added that day. In exercises, we made sure they were all the same length, which makes our database calls easier, and in order to do this we had each field represent two things, one being for exercises with weights, and one being for exercises that are timed. The database doesn't care what the data represents, so which to display is handled by our web app based on an additional field called timed. Finally, the public routines hold all the public routines that have been added by our users. 
- I thought the way we organized our database was interesting, and it made the database calls a lot simpler. We had lots of issues, for example not being able to run npm start. A particularly annoying issue was with react-router not rendering doubly nested children which we didn't find out about until later, not leaving us with enough time to figure it out before the demo. But we did get it working for our final.
- Finally, our loading during asynchronous functions was very cool, but unfortunately, it only works on local host for some reason that I was unable to figure out.

## Acknowledgements/credits:

The image on our sign-in page is open-domain and royalty-free and can be found here:
https://www.pinterest.com/pin/452963675006621750/

Our Api can be found here:https://api-ninjas.com/api/exercises

Uses Firebase for back-end: https://firebase.google.com/

Web app name chosen using: https://chat.openai.com/

Loading implemented using react-loading package: https://www.npmjs.com/package/react-loading
