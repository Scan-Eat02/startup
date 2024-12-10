'use strict';

module.exports = {
  up: async function (migration, DataTypes) {
    // Remove foreign key and event_id column from store
    await migration.sequelize.query(
      'ALTER TABLE store ' +
      'DROP CONSTRAINT IF EXISTS fk_store_event, ' + // Drop the foreign key constraint if it exists
      'DROP COLUMN IF EXISTS event_id' // Drop the event_id column
    );

    // Add stores array column to event
    await migration.sequelize.query(
      'ALTER TABLE event ' +
      'ADD COLUMN store_ids UUID[] DEFAULT ARRAY[]::UUID[]' // Add an array of UUIDs with default empty array
    );
  },

  down: async function (migration, DataTypes) {
    // Add event_id column back to store with foreign key constraint
    await migration.sequelize.query(
      'ALTER TABLE store ' +
      'ADD COLUMN event_id UUID, ' +
      'ADD CONSTRAINT fk_store_event FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE SET NULL'
    );

    // Remove stores array column from event
    await migration.sequelize.query(
      'ALTER TABLE event ' +
      'DROP COLUMN IF EXISTS stores'
    );
  }
};
