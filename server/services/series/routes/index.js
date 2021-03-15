const router = require('express').Router()
const seriesRoutes = require('./series-routes')

router.use('/series', seriesRoutes)


module.exports = router