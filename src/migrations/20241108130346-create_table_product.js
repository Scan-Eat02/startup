'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(
      'CREATE TABLE product (' +
      'id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),' +  // Use uuid_generate_v4() for UUID generation
      'name VARCHAR NOT NULL,' +  // Use VARCHAR for name (you can adjust the length if needed)
      'description TEXT,' +  // Use TEXT for description (for larger text fields)
      'price DECIMAL(10, 2) NOT NULL,' +  // DECIMAL for price
      'created_at TIMESTAMP DEFAULT now(),' +  // Timestamp for when the product was created
      'modified_at TIMESTAMP DEFAULT now(),' +  // Timestamp for when the product was last modified
      'is_available BOOLEAN DEFAULT TRUE,' +  // Boolean for availability
      'store_id UUID REFERENCES store (id) ON DELETE CASCADE' +  // Foreign key to store, product is deleted when store is deleted
      ')'
    );
  },

  down: function(migration, DataTypes) {
    return migration.sequelize.query('DROP TABLE IF EXISTS product');
  }
};
