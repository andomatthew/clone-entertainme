const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()


module.exports = {
  typeDefs: gql`
  
  type Series {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  input SeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }


  extend type Mutation {
    
    addSeries (series: SeriesInput) : Series

    deleteSeries (
      _id: String
    ) : Int

    updateSeries (
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    ) : Int
  }

  extend type Query {
    series: [Series]
    serie(_id: String): Series
  }

  `,

  resolvers: {
    Query: {
      series: () => {
        return redis.get('series')
          .then(result => {
            if(!result) {
              console.log('series dari fetch')
              return axios.get('http://localhost:4002/series')
                .then(({data}) => {
                  redis.set('series', JSON.stringify(data))
                  return data
                })
            } else {
              console.log('series dari redis')
              return JSON.parse(result)
            }
          })
      },
      serie: (parent, args, context, info) => {
        return axios.get(`http://localhost:4002/series/${args._id}`)
          .then(({ data }) => data)
          .catch(err => console.log(err))
      }
    },
    Mutation: {
      addSeries: (parent, args, context, info) => {
        return axios.post('http://localhost:4002/series', args.series)
          .then(({data}) => {
            redis.del('series')
            return data
          })
          .catch(err => console.log(err))
      },
      deleteSeries: (parents, args, context, info) => {
        return axios.delete(`http://localhost:4002/series/${args._id}`)
          .then(({ data }) => {
            redis.del('series')
            return data.deleted
          })
          .catch(err => console.log(err))
      },
      updateSeries: (parent, args, context, info) => {
        const detail = {
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags:args.tags  
        }
        return axios.put(`http://localhost:4002/series/${args._id}`, detail)
          .then(({ data }) => {
            redis.del('series')
            return data.modified
          })
          .catch(err => console.log(err))
      }
    }
  }
}