// Imports
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongodb = require('./connections/index');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

// To auto generate a file run instructions here
// const swaggerDocumentInstructions = require('./swagger');
// To run UI run document here
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
  // To create a new document
  // .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentInstructions))
  // To load the document
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
