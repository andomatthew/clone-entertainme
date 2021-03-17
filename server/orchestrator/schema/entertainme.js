const { gql } = require('apollo-server')
const axios = require('axios')


module.exports = {
  typeDefs: gql`
  
  type Entertainme {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    entertainme: [Entertainme]
  }

  `,
  resolvers: {
    Query: {
      entertainme: (parent, args, context, info) => {
        const movies = axios.get('http://localhost:4001/movies').then(({data}) => data)
        const series = axios.get('http://localhost:4002/series').then(({data}) => data)
        return Promise.all([movies, series])
          .then((response) => response[0].concat(response[1]))
          .catch(err => console.log(err))
      }
    }
  }
}
