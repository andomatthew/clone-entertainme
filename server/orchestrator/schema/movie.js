const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

console.log('masuk')

module.exports = {
  typeDefs: gql`
  
  type Movie {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieUpdate {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }


  extend type Mutation {

    addMovie (movie: MovieInput) : Movie

    deleteMovie (
      _id: String
    ) : Int

    updateMovie(
      _id: String
      movie: MovieInput
    ) : Int

  }

  extend type Query {
    movies: [Movie]
    movie(_id: String): Movie
  }

  `,
  resolvers: {
    Query: {
      movies: (parent, args, context, info) => {
        return redis.get("movies")
          .then((result) => {
            if(!result) {
              console.log('movies dari fetch')
              return axios.get('http://localhost:4001/movies')
              .then(({data}) => {
                redis.set('movies', JSON.stringify(data))
                return data
              })
            } else {
              console.log('movies dari redis')
              return JSON.parse(result)
            }
          })
          .catch(err => console.log(err))
      },
      movie: (parent, args, context, info) => {
        return axios.get(`http://localhost:4001/movies/${args._id}`)
          .then(({data}) => data)
          .catch(err => console.log(err))
      }
    },
    Mutation: {
      addMovie: (parent, args, context, info) => {
        return axios.post('http://localhost:4001/movies', args.movie)
          .then(({data}) => {
            redis.del('movies')
            return data
          })
          .catch(err => console.log('masuk error'))
      },
      deleteMovie: (parent, args, context, info) => {
        return axios.delete(`http://localhost:4001/movies/${args._id}`)
          .then(({data}) => {
            redis.del('movies')
            return data.deleted
          })
          .catch(err => console.log(err))
      },
      updateMovie: (parent, args, context, info) => {
        console.log('=====', args,  '=======')
        const detail = {
          title: args.movie.title,
          overview: args.movie.overview,
          poster_path: args.movie.poster_path,
          popularity: args.movie.popularity,
          tags:args.movie.tags  
        }
        return axios.put(`http://localhost:4001/movies/${args._id}`, detail)
          .then(({ data }) => {
            redis.del('movies')
            return data.modified
          })
          .catch(err => console.log(err))
      }
    }
  }
}
