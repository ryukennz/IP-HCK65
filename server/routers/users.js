const express = require('express')
const Controller = require('../controllers/controller')
const users = express.Router()

users.post('/login', Controller.userLogin)
users.post('/register', Controller.userRegister)

module.exports = users