const express = require('express')
const router = express.Router()

const { transfer } = require ('../controllers/transfer')
const { validationRules } = require ('../utils/validationRules')
const { handleValidationErrors } = require ('../middleware/validationError')


router.post('/', validationRules, handleValidationErrors, transfer);

module.exports = router