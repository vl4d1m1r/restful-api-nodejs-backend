// Import core
const http = require('http');

// Import 3rd party
const express = require('express');

// Import apiRoutes
const apiRoutes = require('./routes/apiRoutes');

// process.env.PORT enables the port constant to be set by Heroku
const port = process.env.PORT || 3001;

// Set app
const app = express();

/*
If you want to use developer front-end (React, Vue, etc.) on localhost:3000 and
developer Node.js back-end at localhost:3001, you will receive CORS policy error.
This should prevent CORS policy error: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Use apiRoutes
app.use(apiRoutes);

const server = http.createServer(app);

server.listen(port);
