/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const databaseService = require('./../database');

const QUERY_INSERT = 'INSERT INTO users SET ?';

/**
 * @param {Object} data
 * @return {Promise}
 */
module.exports = (data) => databaseService.execute(QUERY_INSERT, {
  ...data,
  created_at: (new Date()).toISOString().replace('T', ' ').slice(0, -5),
});
