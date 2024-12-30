const express = require('express');
const connection = require('./connector');

const app = express();
const PORT = 8080;

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
