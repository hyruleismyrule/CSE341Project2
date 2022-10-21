// Imports
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongodb = require('./connections/index');
const swaggerUi = require('swagger-ui-express');
// const createError = require('http-errors');
// const path = require('path');
const cors = require('cors');
// const { signupValidation, loginValidation } = require('./validation.js');

// To auto generate a file run instructions here and on line 23
// const swaggerDocumentInstructions = require('./swagger');
// To run UI run document here and on line 24
const swaggerDocument = require('./swagger.json');

// Main
app
  .use(cors())
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  // .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentInstructions))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'));

// Connect to Mongodb
mongodb.initDb((err, mongodb) => {
  if (err) {
    // Working Error with status code
    err.statusCode = err.statusCode || 500;
    console.log('Cannot connect to the database!', err);
    process.exit();
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
