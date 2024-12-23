"use strict";

module.exports = {
  up: function (migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE product ADD CONSTRAINT unique_name_store UNIQUE (name, store_id)'
    );
  },

  down: function (migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE product DROP CONSTRAINT unique_name_store'
    );
  }
};
