// Imports
const swaggerAutogen = require('swagger-autogen')();

// Main
const doc = {
  info: {
    title: 'Genshin Impact API',
    description: 'Genshin Impact 4 & 5 Star Characters and Weapons'
  },
  host: 'cse341-project-genshin-impact.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
