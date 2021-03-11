const { getDatabase } = require('../config/mongodb')


class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }
}

module.exports = Movie