const express = require('express')
const users = require('./users')
const cats = require('./cats')
const payment = require('./payments');

const router = express.Router()

router.use('/users', users)
router.use('/cats', cats)
router.use('/payments', payment)

module.exports = router