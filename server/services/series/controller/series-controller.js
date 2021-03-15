const Series = require('../model/Series')

class SeriesController {
  
  static find(req, res, next) {
    Series.find()
    .then(series => {
      res.status(200).json(series)
    })
    .catch(err => {
      next(err)
    })
  }

  static insertOne(req, res, next) {
    const {
      title,
      overview,
      poster_path,
      popularity,
      tags
    } = req.body

    const newTvSeries ={
      title,
      overview,
      poster_path,
      popularity: parseFloat(String(popularity)),
      tags
    }

    Series.insertOne(newTvSeries)
    .then(result => {
      const tvserial = result.ops[0]
      res.status(201).json(tvserial)
    })
    .catch(err => {
      next(err)
    })
  } 

  static findOne(req, res, next) {

    const { id } = req.params
    
    Series.findOne(id)
    .then(tvserial => {
      res.status(200).json(tvserial)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateOne(req, res, next) {
    
    const { id } = req.params
    
    const {
      title,
      overview,
      poster_path,
      popularity,
      tags
    } = req.body

    const editedSeries = {
      title,
      overview,
      poster_path,
      popularity: parseFloat(String(popularity)),
      tags
    }

    const data = { id, editedSeries }

    Series.updateOne(data)
    .then(result => {
      res.status(200).json({ modified: result.modifiedCount })
    })
    .catch(err => {
      next(err)
    })

  }

  static deleteOne(req, res, next) {
    const { id } = req.params
    Series.deleteOne(id)
    .then(response => {
      res.status(200).json({ deleted: response.deletedCount })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = SeriesController