# CS4550 Project Submission

## Meta

**Who was on your team?**  
Just me  
  
**What's the URL of your deployed app?**  
project.seablue.site  
  
**What's the URL of your github repository with the code for 
your deployed app?**  
https://github.com/lemartin19/cs4550-project  
  
**Is your app deployed and working?**  
Yes  
  
**For each team member, what work did that person do on the 
project?**  
Lynnsey Martin - all of it  

## App

**What does your project 2 app do?**  
Allows users to create and save running routes with their 
own personal notes. In addition to creating their own routes, 
users can also view and search for routes made by other users.
  
**How has your app concept changed since the proposal?**  
The channel and web socket idea has developed more, but not a
lot else has changed. For details, you can see the `README.md` 
for the project outline.  
  
**How do users interact with your application? What can they 
accomplish by doing so?**  
Users can login and look at their route feed which will list 
the routes created by all users. They can search for a route 
based on the length of that route or who created that route. 
A user can also choose to create a new route, add notes and 
descriptions, and save that route for future use. Routes can 
be edited and any user can comment on any route with additional 
notes or descriptions.  
  
**For each project requirement above, how does your app meet 
that requirement?**  
- Users must create an account and login in order to view or 
create routes.
- Users, routes, comments, and visitor information are all stored
in a persistent Postgres database.
- The backend of the application uses Google Map's Directions API 
which requires authentication through an API key.
- Phoenix channels are used to push updates to users for when 
there are visitors on a route.
- The map will automatically center on your current location using 
the HTML location API. In addition, two additional FE APIs (Google 
Maps JavaScript API and Google Maps Static API) are used to display
the maps.
  
**What interesting stuff does your app include beyond the 
project requirements?**  
The map will automatically center on your current location using 
the HTML location API. In addition, two additional FE APIs (Google 
Maps Javascript API and Google Maps Static API) are used to display
the maps.  
  
**What’s the complex part of your app? How did you design 
that component and why?**  
The representation of the route on the backend is relatively 
complicated due to the pattern for fetching directions and the 
formatting requirements in order to use those directions to display 
the route on the frontend using the Google Maps JavaScript API. 
This means that the route has a "points" array to keep track of the 
waypoints in the route in addition to fetching the directions and 
other relevant data when it is sent to the frontend.
  
**What was the most significant challenge you encountered and 
how did you solve it?**  
Setting up HTTPS for the backend was a massive pain because it took 
a while to figure out how to work that out with CORS and deploying 
Elixir with the HTTPS config information (lots of handshake errors 
that gave absolutely no information). Had to remake the LetsEncrypt 
files a couple times in order to get it right for both nginx and 
Elixir at the same time.  
Also challenging to figure out how/where to fetch and store the 
directions results. Ended up currently just refetching the directions 
for every time they are needed but this is not a scalable solution. 
In reality, with a large enough string in the database, the entire 
JSON result should be saved and directions should only be refetched 
when the waypoints change.  
  
