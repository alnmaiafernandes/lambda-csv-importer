/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const s3Service = require('./s3');
const processCsv = require('./importer/process-csv');

/**
 * Import an S3 event record to MySQL
 *
 * @param {Object} record
 * @return {Object}
 */
exports.importRecord = async (record) => {
  const { bucket, object } = record.s3;

  const result = await s3Service.getFile(bucket.name, object.key);
  if (!result.success) {
    return {
      success: false, msg: `Error while downloading s3 file to lambda environment: ${result.msg}`,
    };
  }

  await processCsv(result.data);
  await s3Service.deleteFile(bucket.name, object.key);

  return { success: true };
};
