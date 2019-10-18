/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const AWS = require('aws-sdk');
const s3Service = require('../../src/services/s3');

describe('S3 Service', () => {
  describe('getFile', () => {
    it('should return success false when s3 error occur', async () => {
      const error = 'This is an error.';

      s3Service.S3.getObject = jest.fn((params, callback) => {
        callback(new Error(error), null);
      });

      const result = await s3Service.getFile('bucket', 'key');

      expect(result.success).toBe(false);
      expect(result.msg).toBe(error);
    });

    it('should return success true when s3 get file succeed', async () => {
      const fileData = Buffer.from('Test', 'utf-8');

      s3Service.S3.getObject = jest.fn((params, callback) => {
        callback(null, { Body: fileData });
      });

      const result = await s3Service.getFile('bucket', 'key');

      expect(result.success).toBe(true);
      expect(result.data).toBe(fileData);
    });
  });

  describe('deleteFile', () => {
    it('should return false when invalid key provided', async () => {
      s3Service.S3.deleteObject = jest.fn((params, callback) => {
        callback(new Error(), null);
      });

      const result = await s3Service.deleteFile('bucket', 'key');

      expect(result.success).toBe(false);
    });

    it('should return true when valid key provided', async () => {
      s3Service.S3.deleteObject = jest.fn((params, callback) => {
        callback(null, {});
      });

      const result = await s3Service.deleteFile('bucket', 'key');

      expect(result.success).toBe(true);
    });
  });
});
