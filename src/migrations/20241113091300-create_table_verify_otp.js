'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    return migration.sequelize.query(
      'CREATE TABLE "verify_otp" (' +  // Quoting table name to avoid conflicts
      'email VARCHAR NOT NULL,' +  // Use VARCHAR for email
      'is_admin BOOLEAN NOT NULL,' +  // Boolean field for distinguishing admin from client
      'otp VARCHAR NOT NULL,' +  // Use VARCHAR to store OTPs as text
      'expiration_time TIMESTAMP DEFAULT (now() + INTERVAL \'15 minutes\'),' +  // Expiration set to 15 minutes after current time
      'PRIMARY KEY (email, is_admin)' +  // Composite primary key to avoid duplicate OTPs for the same email and user type
      ')'
    );
  },

  down: function (migration, DataTypes) {
    return migration.sequelize.query('DROP TABLE IF EXISTS "verify_otp"');
  }
};
