const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    },

    action: String,

    payload: Object,
  },
  {
    timestamps: true,
  }
);

const AuditLog = mongoose.model(
  'AuditLog',
  auditLogSchema
);

module.exports = AuditLog;