'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE store ' +
      'ADD COLUMN event_id UUID,' +  // Add the event_id column
      'ADD CONSTRAINT fk_store_event FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE SET NULL'  // Define the foreign key constraint
    );
  },

  down: function(migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE store ' +
      'DROP CONSTRAINT fk_store_event, ' +  // Drop the foreign key constraint
      'DROP COLUMN event_id'  // Remove the event_id column
    );
  }
};
