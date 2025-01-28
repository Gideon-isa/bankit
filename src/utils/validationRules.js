const {body} = require('express-validator');

const validationRules = [
  body('accountNumber')
    .isLength({ min: 10, max: 10 })
    .withMessage('Invalid from account number'),
  body('receipientAccountNumber')
    .isLength({ min: 10, max: 10 })
    .withMessage('Invalid to account number'),
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be greater than zero'),
];

module.exports = {
    validationRules
};