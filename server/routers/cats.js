const express = require('express')
const Controller = require('../controllers/controller')
const authenticate = require('../middlewares/authentication')
const cats = express.Router()

cats.get('/', Controller.getCatsData)

cats.use(authenticate)

cats.post('/', Controller.addCats)
cats.get('/fav-cats', Controller.showFavCats )
cats.delete('/fav-cats/:id', Controller.deleteFavCats)

module.exports = cats