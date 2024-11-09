'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(
      'CREATE TABLE store (' +
      'id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),' +  // Use uuid_generate_v4() for UUID generation
      'name VARCHAR NOT NULL,' +  // Use VARCHAR for text columns
      'description TEXT,' +  // Use TEXT for large text fields
      'user_id UUID REFERENCES "user" (id) ON DELETE CASCADE,' +  // Foreign key referencing "user" table
      'created_at TIMESTAMP DEFAULT now(),' +
      'modified_at TIMESTAMP DEFAULT now(),' +
      'is_disabled BOOLEAN DEFAULT FALSE,' +
      'location VARCHAR' +  // Use VARCHAR or TEXT for location field
      ')'
    );
  },

  down: function(migration, DataTypes) {
    return migration.sequelize.query('DROP TABLE IF EXISTS store');
  }
};
