const router = require('express').Router()
const MovieController = require('../controllers/movie-controller')




router.get('/movies', MovieController.show)


module.exports = router