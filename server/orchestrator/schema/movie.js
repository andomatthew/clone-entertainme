const { gql } = require('apollo-server')
const axios = require('axios')


module.exports = {
  typeDefs: gql`
  
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }


  extend type Mutation {
    addMovie(
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: [String]
    ) : Movie

  
  extend type Query {
    movies: [Movie]
  }

  `,

  resolvers: {
    Query: {
      movies: (parent, args, context, info) => {
        return axios.get('http://localhost:4001/movies')
          .then(({data}) => data)
          .catch(err => { console.log(err) })
      }
    },
    Mutation: {
      addMovie: (parent, args, context, info) => {
        return axios.post('http://localhost:4001/movies', args)
          .then(({data}) => data)
          .catch(err => { console.log(err) })
      }
    }
  }
}