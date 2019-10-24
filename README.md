# CSV to MySQL Importer

![Build Status](https://github.com/allanitsme/lambda-csv-importer/workflows/CI/badge.svg)

This is a NodeJS application that loads CSVs files from S3 Bucket and import to MySQL.

You can use this project as a base to your importer application, see section [Adapting to your project](#adapt) for more informations about which file you must edit to work with your business logic.

It's has a lambda handler entrypoint in _handlers.js_ and if you want to know how to deploy it to AWS Lambda just click [HERE](https://medium.com/@allanitsme/s%C3%A9rie-importando-csvs-no-mysql-utilizando-s3-lambda-e-nodejs-parte-1-942eace4de76) and read my medium articles about this project.


## Installation and Configuration

In order to download and run this project you must have:

- [NodeJS](https://nodejs.org/en/) >= 8
- [NPM](https://www.npmjs.com/get-npm)
- GIT

Just clone this repository and install all the dependencies using npm or yarn:

```shell  
$ git clone https://github.com/allanitsme/lambda-csv-importer.git
$ cd lambda-csv-importer
$ npm install
```

## <a name="adapt"></a>Adapting to your project

The main core of processing the .csv file in this project occour in process-csv.js file:

```javascript
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
```

In the **params** constant you can define which columns your .csv file has and how transform data.

In this project i'm using this kind of .csv file:

```csv
NOME_COMPLETO;APELIDO;EMAIL;ATIVO
Allan Maia Fernandes;allanitsme;allanfernandes.cpp@gmail.com;1
```

When a CSV line is parsed by fast-csv using the above params the resulted object will be:

```json
{
  full_name: "Allan Maia Fernandes",
  nickname: "allanitsme",
  email: "allanfernandes.cpp@gmail.com",
  enabled: "1"
}
```

And this object is passed to **saveData** method in _save-data.js_ that build the query to MySQL and execute it:

```javascript
const QUERY_INSERT = 'INSERT INTO users SET ?';

/**
 * @param {Object} data
 * @return {Promise}
 */
module.exports = (data) => databaseService.execute(QUERY_INSERT, {
  ...data,
  created_at: (new Date()).toISOString().replace('T', ' ').slice(0, -5),
});
```

In the above example, the exported function just prepare the object to be inserted in the database appending to it the **created_at** property and execute the query declared in the **QUERY_INSERT** constant.


## Testing

All unit tests were written using JEST and you can run them just using test script:

```shell
$ npm run test
```