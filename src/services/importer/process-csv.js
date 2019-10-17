/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const csv = require('fast-csv');
const saveData = require('./save-data');

/**
 * @param {Buffer} buffer
 */
module.exports = (buffer) => new Promise((resolve) => {
  const params = {
    headers: ['full_name', 'nickname', 'email', 'enabled'],
    delimiter: ';',
    renameHeaders: true,
  };

  csv.parseString(buffer.toString(), params)
    .on('data', (data) => {
      saveData(data);
    })
    .on('end', () => {
      resolve('ok');
    });
});
