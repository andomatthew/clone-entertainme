const mongo = require('../config/mongo')
const { getDatabase } = require('../config/mongo')
const { ObjectId } = require('mongodb')

class Movie {

  static find() {
    return getDatabase().collection('movies').find().toArray()
  }

  static findOne(id) {
    let objectId = new ObjectId(id)
    return getDatabase().collection('movies').findOne({ "_id": objectId })
  }

  static insertOne(data) {
    return getDatabase().collection('movies').insertOne(data)
  }

  static updateOne({ id, editedMovie }) {
    let objectId = new ObjectId(id)
    const filter = { "_id": objectId }
    const updatedMovie = {
      $set: {
        title: editedMovie.title,
        overview: editedMovie.overview,
        poster_path: editedMovie.poster_path,
        popularity: editedMovie.popularity,
        tags: editedMovie.tags
      }
    }
    return getDatabase().collection('movies').updateOne(filter, updatedMovie)
  }

  static deleteOne(id){
    let objectId = new ObjectId(id)
    return getDatabase().collection('movies').deleteOne({"_id": objectId })
  }

}


module.exports = Movie