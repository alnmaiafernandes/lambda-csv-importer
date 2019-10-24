/**
 * @author Allan M. Fernandes <allanfernandes.cpp@gmail.com>
 * @link   http://allanits.me
 */

const { EOL } = require('os');

const processCsv = require('../../../src/services/importer/process-csv');
const saveData = require('../../../src/services/importer/save-data');

jest.mock('../../../src/services/importer/save-data');

describe('Process Csv', () => {
  test('should call save data for all csv objects', async () => {
    const csvBuffer = Buffer.from([
      'NOME;NICK;EMAIL;ENABLED',
      'Teste;nick_test;teste@gmail.com;1',
    ].join(EOL));

    const dataObject = {
      full_name: 'Teste',
      nickname: 'nick_test',
      email: 'teste@gmail.com',
      enabled: '1',
    };

    const result = await processCsv(csvBuffer);

    expect(result).toBe('ok');

    expect(saveData.mock.calls.length).toBe(1);
    expect(saveData.mock.calls[0][0]).toEqual(dataObject);
  });
});
