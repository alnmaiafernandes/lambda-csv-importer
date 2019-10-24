/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const importerService = require('../../src/services/importer');
const s3Service = require('../../src/services/s3');
const processCsv = require('../../src/services/importer/process-csv');

jest.mock('../../src/services/s3');
jest.mock('../../src/services/importer/process-csv');

describe('Importer Service', () => {
  describe('import record', () => {
    it('should import record when valid s3 key/bucket provided', async () => {
      // prepare the test
      const record = {
        s3: {
          bucket: {
            name: 'teste',
          },
          object: {
            key: 'teste.csv',
          },
        },
      };

      const expectedResult = { success: true };

      s3Service.getFile.mockImplementation(() => ({ success: true, data: 'file' }));

      // apply changes
      const result = await importerService.importRecord(record);

      // test the results
      expect(result).toEqual(expectedResult);

      expect(processCsv.mock.calls.length).toBe(1);
      expect(processCsv.mock.calls[0][0]).toEqual('file');

      expect(s3Service.getFile.mock.calls.length).toBe(1);

      expect(s3Service.deleteFile.mock.calls.length).toBe(1);
    });
  });
});
