const validatePAN = require('../utils/validatePAN');
const calculateEMI = require('../utils/calculateEMI');

const decisionEngine = (data) => {
  let score = 100;

  const reasonCodes = [];

  const {
    panNumber,
    monthlyRevenue,
    loanAmount,
    tenureMonths,
  } = data;

  const monthlyEMI = calculateEMI(
    loanAmount,
    tenureMonths
  );

  if (!validatePAN(panNumber)) {
    score -= 40;

    reasonCodes.push('INVALID_PAN');
  }

  if (loanAmount > monthlyRevenue * 20) {
    score -= 35;

    reasonCodes.push('HIGH_LOAN_RATIO');
  }

  if (monthlyEMI > monthlyRevenue * 0.6) {
    score -= 30;

    reasonCodes.push('LOW_REPAYMENT_CAPACITY');
  }

  if (tenureMonths < 6) {
    score -= 15;

    reasonCodes.push('HIGH_RISK_TENURE');
  }

  if (tenureMonths > 60) {
    score -= 10;

    reasonCodes.push('LONG_TENURE_RISK');
  }

  if (
    monthlyRevenue < 50000 &&
    loanAmount > 5000000
  ) {
    score -= 50;

    reasonCodes.push('DATA_INCONSISTENCY');
  }

  score = Math.max(score, 0);

  const decision =
    score >= 70 ? 'Approved' : 'Rejected';

  return {
    decision,
    creditScore: score,
    monthlyEMI,
    reasonCodes,
  };
};

module.exports = decisionEngine;