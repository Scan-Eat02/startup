'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE event ' +
      'ADD COLUMN visibility VARCHAR(20) NOT NULL DEFAULT \'public\';' // Add visibility column with default value
    );
  },

  down: function (migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE event ' +
      'DROP COLUMN IF EXISTS visibility;' // Remove visibility column
    );
  }
};
