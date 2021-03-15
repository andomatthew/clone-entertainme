const router = require('express').Router()
const movieRoutes = require('./movie-routes')
const tvSeriesRoutes = require('./tv-series-routes')



router.use('/movies', movieRoutes)
router.use('/tvseries', tvSeriesRoutes)




module.exports = router