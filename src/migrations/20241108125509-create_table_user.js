'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(
      'CREATE TABLE "user" (' +  // Quoting table name as "user" is a reserved keyword
      'id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),' +  // Use uuid_generate_v4() for UUID generation
      'first_name VARCHAR NOT NULL,' +  // Use VARCHAR for text columns
      'last_name VARCHAR NOT NULL,' +  // Use VARCHAR for text columns
      'password VARCHAR NOT NULL,' +  // Use VARCHAR for text columns
      'email VARCHAR UNIQUE NOT NULL,' +  // Use VARCHAR for email
      'mobile_no VARCHAR UNIQUE,' +  // Use VARCHAR for phone numbers
      'is_email_verified BOOLEAN DEFAULT FALSE,' +  // Boolean field for email verification
      'is_phone_verified BOOLEAN DEFAULT FALSE,' +  // Boolean field for phone verification
      'is_admin BOOLEAN DEFAULT FALSE,' +  // Boolean field for admin flag
      'is_client BOOLEAN DEFAULT TRUE,' +  // Boolean field for client flag
      'created_at TIMESTAMP DEFAULT now(),' +  // Timestamp for creation
      'modified_at TIMESTAMP DEFAULT now()' +  // Timestamp for last modification
      ')'
    );
  },

  down: function(migration, DataTypes) {
    return migration.sequelize.query('DROP TABLE IF EXISTS "user"');
  }
};
