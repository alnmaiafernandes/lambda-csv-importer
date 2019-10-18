/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const AWS = require('aws-sdk');

const S3 = new AWS.S3({ apiVersion: '2006-03-01' });

exports.S3 = S3;

/**
 * Encapsulate S3.getObject into a Promise
 *
 * @param {String} bucket
 * @param {String} key
 * @return {Promise}
 */
exports.getFile = (bucket, key) => new Promise((resolve) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  S3.getObject(params, (err, data) => {
    resolve({
      success: err === null,
      data: data !== null ? data.Body : null,
      msg: err !== null ? err.message : null,
    });
  });
});

/**
 * Encapsulate S3.deleteObject into a Promise
 *
 * @param {String} bucket
 * @param {String} key
 * @return {Promise}
 */
exports.deleteFile = (bucket, key) => new Promise((resolve) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  S3.deleteObject(params, (err, data) => {
    resolve({
      success: err === null,
      data,
    });
  });
});
