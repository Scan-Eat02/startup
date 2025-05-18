'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    return migration.sequelize.query(
      'CREATE TABLE event_store_requests (' +
      'id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),' +  // Primary key
      'event_id UUID NOT NULL,' +  // FK to events table
      'store_id UUID NOT NULL,' +  // FK to stores table
      'initiated_by VARCHAR(10) NOT NULL,' +  // 'store' or 'event'
      'status VARCHAR(20) DEFAULT \'pending\' NOT NULL,' +  // 'pending', 'accepted', etc.
      'message TEXT,' +  // Optional message
      'created_at TIMESTAMP DEFAULT now(),' +  // Created timestamp
      'responded_at TIMESTAMP,' +  // Response timestamp
      'responded_by UUID,' +  // Optional: user who responded
      'CONSTRAINT fk_event FOREIGN KEY(event_id) REFERENCES event(id) ON DELETE CASCADE,' +
      'CONSTRAINT fk_store FOREIGN KEY(store_id) REFERENCES store(id) ON DELETE CASCADE' +
      ')'
    );
  },

  down: function (migration, DataTypes) {
    return migration.sequelize.query('DROP TABLE IF EXISTS "event_store_requests"');
  }
};
