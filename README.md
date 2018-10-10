# Udacity - Project 7 - Neighborhood React Maps - Set in Asheville, NC

This project was created with the React framework. It is a single page Google map API app based on Asheville, NC. This app utilizes Fouraquares API for all venue data. It allows you to filter venues based on select categories in Asheville, NC, The default category is "Top Picks".

In each group of venues there is an option to filter by name. Clicking or pressing enter on a venues name in the side drawer will trigger the corresponding markers info window to open.

To reset the venues after searching for a name, open the categories menu and select a category again from the list. This will update the venues again based on the category that was selected.

Clicking on a marker will also trigger the info window to open.

This app supports aria accessibility and tab navigation.

---


## Dependencies
  - Node.js >= 6.x
  - Create-React-App starter code.
  - A current browser
  - Internet connection for Foursquare API data and Google maps api.

---


## Installation
  - Download or clone this repository from "https://github.com/KyleWiteck/Udacity-Neighborhood-Map.git"
  - Run "npm install" or "yarn install" in the root directory
  - Run "npm start" or "yarn start" (to use the services worker, use "npm start build".)
  ***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*
  - Go to http://localhost:3000 in your browser or http://localhost:5000 if you ran "npm start build"

---


## Live Demo
For a demo, check out https://kylewiteck.github.io/Udacity-Neighborhood-Map/
