const calculateEMI = (loanAmount, tenureMonths) => {
  const monthlyInterestRate = 0.12 / 12;

  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenureMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

  return Math.round(emi);
};

module.exports = calculateEMI;