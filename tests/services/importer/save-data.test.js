/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const saveData = require('../../../src/services/importer/save-data');
const databaseService = require('../../../src/services/database');

describe('Save Data', () => {
  it('should execute query with created_at property', async () => {
    const date = '2019-10-10T00:01:00.123Z';
    const query = 'INSERT INTO users SET ?';
    const data = {
      name: 'test',
      email: 'test@test.com',
    };
    const outputData = {
      ...data,
      created_at: '2019-10-10 00:01:001',
    };

    databaseService.execute = jest.fn();
    global.Date = jest.fn(() => ({
      toISOString: () => date,
    }));

    await saveData(data);

    expect(databaseService.execute).toHaveBeenCalledWith(query, outputData);
  });
});
