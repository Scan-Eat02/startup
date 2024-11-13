'use strict';

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(`
      ALTER TABLE event 
      ADD COLUMN user_id UUID REFERENCES "user"(id) ON DELETE CASCADE;
    `);
  },

  down: function(migration, DataTypes) {
    return migration.sequelize.query(`
      ALTER TABLE event 
      DROP COLUMN user_id;
    `);
  }
};
