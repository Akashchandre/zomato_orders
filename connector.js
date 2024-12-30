const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'zomato-orders.cjmsgyqw88a2.eu-north-1.rds.amazonaws.com',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Chandre08',
  database: process.env.DB_NAME || 'zomato_orders',
  connectTimeout: 20000,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('Connected to AWS RDS MySQL database!');
});

module.exports = connection;
