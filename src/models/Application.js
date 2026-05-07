const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    panNumber: {
      type: String,
      required: true,
      uppercase: true,
    },

    businessType: {
      type: String,
      required: true,
    },

    monthlyRevenue: {
      type: Number,
      required: true,
    },

    loanAmount: {
      type: Number,
      required: true,
    },

    tenureMonths: {
      type: Number,
      required: true,
    },

    loanPurpose: {
      type: String,
      required: true,
    },

    monthlyEMI: Number,

    creditScore: Number,

    decision: String,

    reasonCodes: [String],
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  'Application',
  applicationSchema
);

module.exports = Application;