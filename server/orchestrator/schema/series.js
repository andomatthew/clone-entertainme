const { gql } = require('apollo-server')
const axios = require('axios')


module.exports = {
  typeDefs: gql`
  
  type Serie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addSeries(
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: [String]
    ) : Serie
  }

  extend type Query {
    series: [Serie]
  }

  `,

  resolvers: {
    Query: {
      series: () => {
        return axios.get('http://localhost:4002/series')
          .then(({data}) => data)
          .catch(err => console.log(err))
      }
    },
    Mutation: {
      addSeries: () => {
        return axios.post('http://localhost:4002/series', args)
          .then(({data}) => data)
          .catch(err => console.log(err))
      }
    }
  }
}