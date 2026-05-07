const validatePAN = (pan) => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  return regex.test(pan);
};

module.exports = validatePAN;