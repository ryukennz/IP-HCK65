const express = require('express')
const Controller = require('../controllers/controller')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const users = express.Router()

users.post('/login', Controller.userLogin)
users.post('/register', Controller.userRegister)
users.post('/google-login', Controller.googleLogin)

users.use(authenticate)

users.get('/me', Controller.currentUser)

users.patch('/update-profile/:id', authorization, Controller.editProfile)

users.patch('/me/upgrade', Controller.upgradeAccount)

module.exports = users