import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js';
import connection from './connector.js';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = 8080;
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  const protocol = req.protocol; // Gets the protocol (http or https)
  const host = req.get('host');

  res.send(`
    <html>
      <head><title>Order API</title></head>
      <body>
        
        <h1>Welcome to the Order API</h1>
        <a href="${protocol}://${host}/api/orders">View Orders</a>
        <br><br>
        <a href="${protocol}://${host}/api/orders?limit=4&offset=1">View pagination</a>
        <br><br>
        <a href="${protocol}://${host}/api-docs">Api Documentation</a>
      </body>
    </html>
      
  `);
});

// Orders API route
/**
 * @swagger
 * /api/orders:
 *   get:
 *     description: Fetch a list of orders from the database
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of orders to retrieve
 *         required: false
 *         type: integer
 *         default: 10
 *       - name: offset
 *         in: query
 *         description: Number of orders to skip
 *         required: false
 *         type: integer
 *         default: 0
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   customer_name:
 *                     type: string
 *                   item:
 *                     type: string
 *                   price:
 *                     type: number
 *                     format: float
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */



app.get('/api/orders', (req, res) => {
  let { limit, offset } = req.query;

  // Validate and set default values
  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);

  if (isNaN(limit) || limit <= 0) limit = 10;
  if (isNaN(offset) || offset < 0) offset = 0;
   
  // mysql query to select data from order table
  const query = `SELECT * FROM orders LIMIT ? OFFSET ?`;

  connection.query(query, [limit, offset], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
