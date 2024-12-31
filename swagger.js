const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config()
// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Zomato Orders API',
      description: 'API documentation for managing orders',
      version: '1.0.0',
    },
    host: 'localhost:8080', // Update this with the actual host for deployment
    basePath: '/',
  },
  apis: ['./server.js'], // Specify the file containing Swagger JSDoc comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
