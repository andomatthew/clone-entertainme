const router = require('express').Router()
const MovieController = require('../controllers/movie-controller')

router.get('/', MovieController.find)
router.post('/', MovieController.insertOne)
router.get('/:id', MovieController.findOne)
router.put('/:id', MovieController.updateOne)
router.delete('/:id', MovieController.deleteOne)


module.exports = router