const {
  body,
  validationResult,
} = require('express-validator');

const applicationValidator = [
  body('ownerName')
    .notEmpty()
    .withMessage('Owner name is required'),

  body('panNumber')
    .notEmpty()
    .withMessage('PAN number is required'),

  body('businessType')
    .notEmpty()
    .withMessage('Business type is required'),

  body('monthlyRevenue')
    .isNumeric()
    .withMessage(
      'Monthly revenue must be numeric'
    )
    .custom((value) => value > 0)
    .withMessage(
      'Monthly revenue must be positive'
    ),

  body('loanAmount')
    .isNumeric()
    .withMessage(
      'Loan amount must be numeric'
    )
    .custom((value) => value > 0)
    .withMessage(
      'Loan amount must be positive'
    ),

  body('tenureMonths')
    .isNumeric()
    .withMessage(
      'Tenure must be numeric'
    ),

  body('loanPurpose')
    .notEmpty()
    .withMessage(
      'Loan purpose is required'
    ),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,

        message: 'Validation failed',

        errors: errors.array().map((err) => err.msg),
      });
    }

    next();
  },
];

module.exports = applicationValidator;