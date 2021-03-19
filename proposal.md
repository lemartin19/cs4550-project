# CS4550 Project Proposal

## Overall

### Who was on your team?

Just me (Lynnsey Martin)

### What’s your project idea?

A running route calculator

### What API do you plan to use?

Google Maps Directions API on the backend, relies on Maps Javascript
API on the frontend.

### What realtime behavior are you planning?

Comments (and maybe votes) on routes

### What persistent state other than users will you be storing in a postgres DB?

Saved routes

### What “something neat” thing are you going to do?

Using HTML current location API.

### What kinds of users do you expect to have use your app?

- Runners trying to plan a new route
- Runners trying to find safe routes in an unknown area

### For each kind of users, what is their most common workflow / user story?

Runner trying to plan a new route:

- Come to the site and create a new account.
- Login directs them to a home page listing routes nearby them
  and/or other popular user routes.
- Click some button to go create a new route.
- Map shows up that shows their current location, centered over
  West Village H.
- Clicks at Marino for their start location, click subsequent
  points to add create a route around the Emerald Necklace.
- Upon completing the route, the user saves it with the name
  "Wild Goose Chase" and a description "quick run for after
  office hours."
- User is redirected to a list of their routes where they can
  see the route created on their account.
- User can choose to view, edit, or delete their own routes.
- User edits their route to add to the description: "no sidewalk
  along the southside of the Emerald Necklace."

Runner trying to find safe routes in an unknown area:

- User logs in to their account.
- User scrolls through the routes created by other users.
- User sees a promising route, clicks on it to view more.
- User can see an overall outline of the route, as well as
  a quick description with notes from the author.
- Route has comments from other users with further notes.
- User now has the outline of the map and some notes from
  those who have done the route and know the area about
  potential obstacles (lack of sidewalks, street crossings, etc.)

## Experiment 1

### What did you try?

Using "current location" from the browser navigator.

### What was the result?

Success

### What did you learn?

- How to set up SSL for server and web-ui
- How to add buttons to the maps api

## Experiment 2

### What did you try?

Connecting to the Directions API on the backend and displaying the
route on the frontend map.

### What was the result?

Success

### What did you learn?

- How to make a directions request on the backend
- How to translate directions response from JSON to renderer
- How to render the directions request on the map
