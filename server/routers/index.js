const express = require('express')
const users = require('./users')
const cats = require('./cats')
const router = express.Router()

router.use('/users', users)
router.use('/cats', cats)

module.exports = router