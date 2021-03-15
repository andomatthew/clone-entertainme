const { getDatabase } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class TvSeries {

  static find() {
    return getDatabase().collection('tv-series').find().toArray()
  }

  static findOne(id) {
    console.log('masuk')
    const objectId = new ObjectId(id)
    const filter = { "_id": objectId }
    return getDatabase().collection('tv-series').findOne(filter)
  }

  static insertOne(data) {
    return getDatabase().collection('tv-series').insertOne(data)
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
    return getDatabase().collection('tv-series').updateOne(filter, updatedSeries)
  }

  static deleteOne(id) {
    const objectId = new ObjectId(id)
    const filter = { "_id": objectId }
    return getDatabase().collection('tv-series').deleteOne(filter)
  }
}


module.exports = TvSeries