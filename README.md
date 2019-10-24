# CSV to MySQL Importer

![Build Status](https://github.com/allanitsme/lambda-csv-importer/workflows/CI/badge.svg)

This is a NodeJS application that loads CSVs files from S3 Bucket and import to MySQL.

You can use this project as a base to your importer application, see section How to Adapt for more informations about which file you must edit to work with your business logic.

It's has a lambda handler entrypoint in _handlers.js_ and if you want to know how to deploy it to AWS Lambda just click [HERE](https://medium.com/@allanitsme/s%C3%A9rie-importando-csvs-no-mysql-utilizando-s3-lambda-e-nodejs-parte-1-942eace4de76) and check my medium articles about this project.


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

## Testing

All unit tests were written using JEST and you can run them just using test script:

```shell
$ npm run test
```