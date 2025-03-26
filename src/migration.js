'use strict';
const fs = require('fs');
// Getting environment
let ENVIRONMENT = process.env.NODE_ENV;
if (ENVIRONMENT === '' || ENVIRONMENT === undefined) {
  ENVIRONMENT = 'development';
}
// Loading configuration
const CONFIG = require('./config');
const Sequelize = require('sequelize');
const ROOT_PATH = __dirname;// jshint ignore:line

let migrationPath = ROOT_PATH + '/migrations';
let database = CONFIG.cockroach.dbName || 'evt_manager';

doPostgreMigration();

async function doPostgreMigration() {
  try {
    const dialectOptions = {
      multipleStatements: true,
      decimalNumbers: true,
      ssl: {
        require: true,
        rejectUnauthorized: false, // Bypasses CA verification (not recommended for production)
      },
    };

    const sequelize = new Sequelize(database, CONFIG.cockroach.username, CONFIG.cockroach.password, {
      dialect: 'postgresql',
      port: CONFIG.cockroach.port,
      host: CONFIG.cockroach.host,
      pool: {
        max: 10,
        min: 0,
        idle: 1000,
      },
      dialectOptions: dialectOptions,
      omitNull: false,
      // logging: console.log, // logger.info
    });

    await sequelize.authenticate();
    const {Umzug, SequelizeStorage} = require('umzug');
    const umzug = new Umzug({
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({sequelize}),
      logger: console,
      migrations: {
        resolve: ({name, path, context}) => {
          const migration = require(path);
          return {
            name,
            up: async () => migration.up(context, Sequelize),
            down: async () => migration.down(context, Sequelize),
          };
        },
        glob: migrationPath + '/*.js', // /\.js$/,
      },
    });

    await umzug.up();
    global['console'].info('Postgres Migrations Completed.');
    process.exit();
  } catch (err) {
    global['console'].error(err);
    process.exit(1);
  }
}
