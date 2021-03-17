import { gql } from '@apollo/client'

export const getAllServices = gql`
    
query GetAll{
  movies {
    _id
    title
    overview
    tags
  }
  series {
    _id
    title
    overview
    tags
  }
}

`

export const ADD_MOVIE = gql`
mutation createMovie($input: MovieInput) {
  addMovie(movie: $input) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

