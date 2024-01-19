const express = require('express')
const Controller = require('../controllers/controller')
const authenticate = require('../middlewares/authentication')
const payment = express.Router()

payment.use(authenticate)

payment.get('/midtrans/token', Controller.getMidtransToken)

module.exports = payment