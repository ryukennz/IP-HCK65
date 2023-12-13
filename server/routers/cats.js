const express = require('express')
const Controller = require('../controllers/controller')
const cats = express.Router()

cats.get('/', Controller.getCatsData)

module.exports = cats