const connection = require('./connector');

const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  item VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const insertSampleData = `
INSERT INTO orders (customer_name, item, price)
VALUES 
  ('kshitij patil', 'Pizza', 12.00),
  ('bajaj singh', 'Burger', 8.00),
  ('Samarth patil', 'Pasta', 10.50),
  ('Akash chandre', 'Salad', 7.00),
  ('kajal patil', 'Sandwich', 5.75),
  ('Akash singh', 'Pizza', 12.99),
  ('Jatin Smith', 'Burger', 8.99),
  ('rohan Wilson', 'Pasta', 10.50),
  ('latikesh Johnson', 'Salad', 7.00),
  ('pankay Brown', 'Sandwich', 5.75)
  
`;

connection.query(createOrdersTable, (err) => {
  if (err) throw err;
  console.log('Orders table created or already exists.');

  connection.query(insertSampleData, (err) => {
    if (err && err.code !== 'ER_DUP_ENTRY') throw err;
    console.log('Sample data inserted.');
    connection.end();
  });
});
