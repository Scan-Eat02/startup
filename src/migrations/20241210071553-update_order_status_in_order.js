'use strict';

module.exports = {
  up: async function (migration, DataTypes) {
    // Add `is_cart` and `is_ready` to `order_status` enum
    await migration.sequelize.query(`
      ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'is_cart';
      ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'is_ready';
    `);
  },

  down: async function (migration, DataTypes) {
    // Downgrading enums is non-trivial; recreate the enum to revert
    await migration.sequelize.query(`
      CREATE TYPE order_status_new AS ENUM (
        'pending', -- Include existing values
        'completed',
        'cancelled'
        -- Add other original statuses except 'is_cart' and 'is_ready'
      );

      ALTER TABLE orders ALTER COLUMN order_status TYPE order_status_new USING order_status::text::order_status_new;

      DROP TYPE order_status;

      ALTER TYPE order_status_new RENAME TO order_status;
    `);
  }
};
