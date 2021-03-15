const router = require('express').Router()
const SeriesController = require('../controller/series-controller')

router.get('/', SeriesController.find)
router.post('/', SeriesController.insertOne)
router.get('/:id', SeriesController.findOne)
router.put('/:id', SeriesController.updateOne)
router.delete('/:id', SeriesController.deleteOne)



module.exports = router