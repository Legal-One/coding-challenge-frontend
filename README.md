
# Task Briefing

Greetings,

For this task, I've gone for a minimal configuration approach where I've made kind of a wannabe mono-repo where the main directory contains the code for the server-side ( server.js ) and the client-side ( client folder ), and a series of scripts to up and run both the apps.

The client side is a React App bootstrapped via the CRA, and the backend service is a very simple NodeJS app on Express.js.

  

## Starting the Project

#### Install node-modules

#### `npm run modules`

  

#### Run API Server

#### `npm run server`

  

#### Run Client Side App

#### `npm run client`

  

# Task Description

### Backend Task

For this whole assignment I've followed the assumption that the main focus was the Front-End task. Hence for Back-End I've simply created a tiny node.js app with Express that return back the 3 JSON unaltered, in a single API ( Not suitable for real-world apps) . Since the process is very fast, I've added a timeout of 1 second, to mimic the behavior of an actual real world API.

### Frontend Task

For this assignment, I've used the following packages

- Node-sass ( SCSS )
- React-Router-Dom ( Routing )
- Recharts ( Charting Library )
- Moment.js ( For Date/Time related activity )
- Bootstrap 4.4.1 ( CDN )
- Bootstrap Icons 1.5.0 ( CDN )
- prop-types ( For Prop type validations)  

#### File Structure of the ./src

> |- api ( For External API functions )

> |- components ( Contains components that had the potential to used more than once throughout the app, such as Maps and Tables.

> |- screen ( These are the independent screens that are to be rendered when their specific paths are visited. )

> |- navigation ( The navigation component that is responsible to serve the screens based on the path )

> | styles ( Contains _global.scss and _variable.scss files )

> |- utils ( Contains an index.js file where the actual data manipulation takes place, and a constants.js file that contains stuff that needs to be kept constant and hard-coded )

> |- App.js ( the app.js file which basically calls the navigation component wrapping it around with an error boundary )

  

## IMPROVEMENTS AND SCALING

Since the scope of the app was small there weren't many instances of component re-rendering. However if the application is to scale up, following are some things that need to be taken care of.

- #### State Management.

Since the data wasn't being drilled down as is, through components as props, to a very high degree of depth, introducing state management would have been an overkill. But if it has to grow any further, introducing a state-management library would be very useful.

  

- #### Memoizing

The application at this point, didn't have many instances where a component was going through 'wasted re-renders' , but if it cases arrive where it does, it would be a wise to memoize the component.

  

##### BEST WISHES

##### Raheed Farooq.