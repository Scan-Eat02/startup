'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(
      'CREATE TABLE event (' +
      'id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),' +  // Use uuid_generate_v4() for UUID generation in CockroachDB
      'name VARCHAR NOT NULL,' +  // Use VARCHAR for text columns
      'description TEXT,' +  // Use TEXT for larger text fields (like descriptions)
      'created_at TIMESTAMP DEFAULT now(),' +  // Timestamp for creation with default current time
      'modified_at TIMESTAMP DEFAULT now(),' +  // Timestamp for modification with default current time
      'is_disabled BOOLEAN DEFAULT FALSE,' +  // Boolean field for the disabled flag
      'location VARCHAR,' +  // Use VARCHAR for location, TEXT if needed for larger addresses
      'store_count INT DEFAULT 0' +  // Integer field to store the count of stores
      ')'
    );
  },

  down: function(migration, DataTypes) {
    return migration.sequelize.query('DROP TABLE IF EXISTS event');
  }
};
