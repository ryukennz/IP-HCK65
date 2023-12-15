const express = require('express')
const Controller = require('../controllers/controller')
const users = express.Router()

users.post('/login', Controller.userLogin)
users.post('/register', Controller.userRegister)
users.post('/google-login', Controller.googleLogin)
users.patch('/update-profile/:id', Controller.editProfile)

module.exports = users