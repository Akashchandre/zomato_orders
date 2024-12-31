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
    host: 'localhost:8080', 
    basePath: '/',
  },
  apis: ['./server.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
