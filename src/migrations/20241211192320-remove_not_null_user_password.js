'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;'
    );
  },

  down: function(migration, DataTypes) {
    return migration.sequelize.query(
      'ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;'
    );
  }
};
