const router = require('express').Router()
const TvSeriesController = require('../controllers/tv-series-controller')


router.get('/', TvSeriesController.find)
router.post('/', TvSeriesController.insertOne)
router.get('/:id', TvSeriesController.findOne)
router.put('/:id', TvSeriesController.updateOne)
router.delete('/:id', TvSeriesController.deleteOne)

module.exports = router