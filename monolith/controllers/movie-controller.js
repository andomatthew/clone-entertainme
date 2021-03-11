const Movie = require('../models/Movie')


class MovieController {

  static show(req, res, next) {
    Movie.find()
    .then(movies => {
      res.status(200).json(movies)
    })
    .catch(error => {
      console.log(error)
      // next(error)
    })
  }

}

module.exports = MovieController