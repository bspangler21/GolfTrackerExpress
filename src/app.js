const express = require('express');
// import our local router file
const routes = require('./routes');
// init express app
const app = express();
// allow express to work with json
app.use(express.json());
// router
app.use(routes);
// export app to import into server.js
module.exports = app;