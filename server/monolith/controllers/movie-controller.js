const Movie = require('../models/Movie')



class MovieController {

  static find(req, res, next) {
    Movie.find()
    .then(movies => {
      res.status(200).json(movies)
    })
    .catch(err => {
      console.log(error)
      next(err)
    })
  }

  static insertOne(req, res, next) {

    const {
      title,
      overview,
      poster_path,
      popularity,
      tags } = req.body

    const newMovie = {
      title,
      overview,
      poster_path,
      popularity: parseFloat(String(popularity)),
      tags
    }

    Movie.insertOne(newMovie)
    .then(createdMovie => {
      const movie = createdMovie.ops[0]
      res.status(201).json(movie)
    })
    .catch(err => {
      next(err)
    })
  }
  
  static findOne(req, res, next) {
    const { id } = req.params
    Movie.findOne(id)
    .then(movie => {
      res.status(200).json(movie)
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
      tags } = req.body
    const editedMovie = {
      title,
      overview,
      poster_path,
      popularity: parseFloat(String(popularity)),
      tags }
    const data = { id, editedMovie }

    Movie.updateOne(data)
    .then(result => {
      res.status(200).json({ modified: result.modifiedCount })
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteOne(req, res, next) {
    const { id } = req.params
    Movie.deleteOne(id)
    .then(result => {
      res.status(200).json({ deleted: result.deletedCount })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = MovieController