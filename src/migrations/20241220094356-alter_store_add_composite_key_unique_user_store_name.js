"use strict";

module.exports = {
  up: function (migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE store ADD CONSTRAINT unique_user_store_name UNIQUE (user_id, name)'
    );
  },

  down: function (migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE store DROP CONSTRAINT unique_user_store_name'
    );
  }
};
