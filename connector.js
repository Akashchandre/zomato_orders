const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'zomato-orders.cjmsgyqw88a2.eu-north-1.rds.amazonaws.com',
  user: 'admin', 
  password: 'Chandre08', 
  database: 'zomato_orders' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('Connected to AWS RDS MySQL database!');
});

module.exports = connection;
