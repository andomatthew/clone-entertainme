const { getDatabase } = require('../config/mongo')
const { ObjectId } = require('mongodb')

class Series {

  static find() {
    return getDatabase().collection('series').find().toArray()
  }

  static findOne(id) {
    const objectId = new ObjectId(id)
    const filter = { "_id": objectId }
    return getDatabase().collection('series').findOne(filter)
  }

  static insertOne(data) {
    return getDatabase().collection('series').insertOne(data)
  }

  static updateOne({ id, editedSeries }) {
    const objectId = new ObjectId(id)
    const filter = { "_id": objectId }
    const updatedSeries = {
      $set: {
        title: editedSeries.title,
        overview: editedSeries.overview,
        poster_path: editedSeries.overview,
        popularity: editedSeries.popularity,
        tags: editedSeries.tags
      }
    }
    return getDatabase().collection('series').updateOne(filter, updatedSeries)
  }

  static deleteOne(id) {
    const objectId = new ObjectId(id)
    const filter = { "_id": objectId }
    return getDatabase().collection('series').deleteOne(filter)
  }
}


module.exports = Series