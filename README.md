# Frontend / Javascipt - coding challenge.

## Table of contents

- [Technologies](#technologies)
- [Install Server](#server)
- [Install Frontend](#frontend)

## Technologies

- React.js
- React-Router
- Redux
- Redux-thunk
- Local Storage
- TypeScript
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

## **Server**

This boilerplate is based on the [TypeScript Node Starter](https://github.com/microsoft/TypeScript-Node-Starter), which already comes with all needed packages,check the dependencies in `package.json` file.

## To run the server

- import `Json files` into `MongoDB`
- In `server` folder, in root directory create `.env` file and add these secret keys there


```
1. MONGODB_URI_LOCAL with your username and password like this: MONGODB_URI_LOCAL=mongodb+srv://<yourusername>:<password>@codingchallenge.btm9c.mongodb.net/<databaseName>?retryWrites=true&w=majority

2. SESSION_SECRET, which can be random, for example:  SESSION_SECRET=abcdef. 
3. JWT_SECRET, which can be random for example: JWT_SECRET=abcdef
```

> **Note!** `URI` is for connecting with `mongoDB` and the `SESSION_SECRET`  and `JWT_SECRET` are required from this boilerplate `dist` configuration





- In CLI  run 

```
cd server
npm install
```

Run the server with the command:

```
npm run watch
```

## **Frontend**

**Frontend project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).**

You should use either `npm` or `yarn` but not both. It's recommeded to use `yarn`

This template already comes with all needed packages. In case you want to install manually, check the dependencies in `package.json` file.<br> To install, run:

```
cd client
yarn install or npm install
```

To play around with it, run:

```
yarn start or npm start
```
