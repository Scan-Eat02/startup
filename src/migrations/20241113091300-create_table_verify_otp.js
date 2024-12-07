'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    return migration.sequelize.query(
      'CREATE TABLE "verify_otp" (' +
      'email VARCHAR(255) NOT NULL,' +
      'is_admin BOOLEAN NOT NULL,' +
      'otp VARCHAR(6) NOT NULL,' +
      'expiration_time TIMESTAMP DEFAULT (now()::timestamp + INTERVAL \'15 minutes\'),' +  // Cast now() to TIMESTAMP
      'PRIMARY KEY (email, is_admin)' +
      ')'
    );
  },

  down: function (migration, DataTypes) {
    return migration.sequelize.query('DROP TABLE IF EXISTS "verify_otp"');
  }
};
