'use strict';

module.exports = {
  up: async function (migration, DataTypes) {
    // Add a product array column to the order table
    await migration.sequelize.query(`
      ALTER TABLE "order"
      ADD COLUMN product_ids UUID[] DEFAULT ARRAY[]::UUID[];
    `);
  },

  down: async function (migration, DataTypes) {
    // Remove the product array column from the order table
    await migration.sequelize.query(`
      ALTER TABLE "order"
      DROP COLUMN IF EXISTS product_ids;
    `);
  }
};
