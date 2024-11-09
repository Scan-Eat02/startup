'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(
      'CREATE TYPE order_status AS ENUM (\'in-progress\', \'completed\', \'cancelled\');' +  // Create ENUM type for order status
      'CREATE TABLE "order" (' +
      'id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),' +  // Use uuid_generate_v4() for UUID generation
      'user_id UUID REFERENCES "user" (id) ON DELETE SET NULL,' +  // Foreign key to user table
      'store_id UUID REFERENCES store (id) ON DELETE SET NULL,' +  // Foreign key to "store" table
      'total_price DECIMAL(10, 2) NOT NULL,' +  // Total price as DECIMAL with two decimal places
      'status order_status NOT NULL,' +  // Use ENUM for order status
      'placed_at TIMESTAMP DEFAULT now(),' +  // Timestamp for when the order was placed
      'delivered_at TIMESTAMP' +  // Timestamp for when the order was delivered (nullable)
      ')'
    );
  },

  down: function(migration, DataTypes) {
    return migration.sequelize.query(
      'DROP TYPE IF EXISTS order_status;' +  // Drop the ENUM type
      'DROP TABLE IF EXISTS order;'  // Drop the order table
    );
  }
};
