/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const log = require('lambda-log');
const importerService = require('./services/importer');
const databaseService = require('./services/database');

/**
 * @param {Object} event
 * @return {Boolean}
 */
exports.import = async (event) => {
  var abc = 1;
  log.options.meta.event = event;

  if (event.Records === undefined) {
    log.info('Records not found in event object.');
    return true;
  }

  let result = await databaseService.initConnection();
  if (!result.success) {
    log.info(`Fail to init database connection (${result.msg}).`);
    return true;
  }

  result = await importerService.importRecord(event.Records[0]);
  if (!result.success) {
    log.info(`Fail to import CSV (${result.msg}).`);
    return true;
  }

  log.info('Record imported successfully.');

  return true;
};
