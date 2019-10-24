/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const log = require('lambda-log');
const handlers = require('../src/handlers');
const databaseService = require('../src/services/database');
const importerService = require('../src/services/importer');

jest.mock('lambda-log');
jest.mock('../src/services/database');
jest.mock('../src/services/importer');

describe('Handlers', () => {
  describe('Import CSV', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('When no Records property provided should log error', async () => {
      const event = {};
      const errorMsg = 'Records not found in event object.';

      const result = await handlers.import(event);

      expect(result).toBe(true);
      expect(log.info.mock.calls[0][0]).toEqual(errorMsg);
    });

    it('When cannot connect to database should log error', async () => {
      // prepare the test
      const event = {
        Records: [
          {
            s3: {
              bucket: {
                name: 'lambda-csvs',
              },
              object: {
                key: 'users.csv',
              },
            },
          },
        ],
      };

      const errorMsg = 'Fail to init database connection (Lorem Ipsum).';

      databaseService.initConnection.mockImplementation(() => ({
        success: false,
        msg: 'Lorem Ipsum',
      }));

      // apply changes
      const result = await handlers.import(event);

      // test the results
      expect(result).toBe(true);
      expect(log.info.mock.calls[0][0]).toEqual(errorMsg);
    });

    it('When cannot import record should log error', async () => {
      // prepare the test
      const event = {
        Records: [
          {
            s3: {
              bucket: {
                name: 'lambda-csvs',
              },
              object: {
                key: 'users.csv',
              },
            },
          },
        ],
      };

      const errorMsg = 'Fail to import CSV (Lorem Ipsum).';

      databaseService.initConnection.mockImplementation(() => ({
        success: true,
      }));

      importerService.importRecord.mockImplementation(() => ({
        success: false,
        msg: 'Lorem Ipsum',
      }));

      // apply changes
      const result = await handlers.import(event);

      // test the results
      expect(result).toBe(true);
      expect(log.info.mock.calls[0][0]).toEqual(errorMsg);
    });

    it('When imported successfully should log success', async () => {
      // prepare the test
      const event = {
        Records: [
          {
            s3: {
              bucket: {
                name: 'lambda-csvs',
              },
              object: {
                key: 'users.csv',
              },
            },
          },
        ],
      };

      const successMsg = 'Record imported successfully.';

      databaseService.initConnection.mockImplementation(() => ({
        success: true,
      }));

      importerService.importRecord.mockImplementation(() => ({
        success: true,
      }));

      // apply changes
      const result = await handlers.import(event);

      // test the results
      expect(result).toBe(true);
      expect(log.info.mock.calls[0][0]).toEqual(successMsg);
    });
  });
});
