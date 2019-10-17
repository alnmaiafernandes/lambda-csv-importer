/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const mysql = require('mysql');

/**
 * connection variable
 */
let connection = null;

/**
 * Init MySQL database connection.
 *
 * @return {Promise}
 */
exports.initConnection = () => new Promise((resolve) => {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      resolve({ success: false, msg: err.message });
    }

    resolve({ success: true });
  });
});

/**
 * Execute a query in the database.
 *
 * @param {String} query
 * @param {Array|Object} params
 * @return {Promise}
 */
exports.execute = (query, params) => new Promise((resolve) => {
  if (!connection) {
    resolve({ success: false, msg: 'Database connection not initialized' });
  }

  connection.query(query, params, (err) => {
    console.log(err);
    if (err) {
      resolve({ success: false, msg: err.message });
    }

    resolve({ success: true });
  });
});
