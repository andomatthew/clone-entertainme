import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { getAllServices } from '../queries/queries'
import { useHistory } from 'react-router-dom'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Container,
  makeStyles, 
  Button} from '@material-ui/core'

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }))

  const UPDATE_MOVIE = gql`
  mutation editMovie($id: String $input: MovieInput) {
    updateMovie(
      _id: $id
      movie: $input
    )
  }

`


export default function EditPage(a) {
  console.log(a)
  const classes = useStyles()
  const history = useHistory()

  const [updateMovie] = useMutation(UPDATE_MOVIE)

  const [formData, setForm] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: 0,
    tags: []
  })

  function handleSubmit(e)  {
  
  }
  
  function handleChange(e) {

    switch(e.id) {
      case 'title':
        setForm({...formData, title: e.value})
        break
      case 'overview':
        setForm({...formData, overview: e.value})
        break
      case 'poster_path':
        setForm({...formData, poster_path: e.value})
        break
      case 'popularity':
        setForm({...formData, popularity: parseFloat(e.value)})
        break
      case 'tags':
        setForm({...formData, tags: e.value.split(',')})
        break
      default:
        break
    }
  }
  

  
  
  return (
    <Container style={{position: 'relative', top: 50, textAlign:'center'}}>
      <h1>Update Page</h1>
      <form onSubmit={handleSubmit} >
        <FormControl fullWidth={true}>
          <InputLabel>Title</InputLabel>
          <Input value={formData.title} type="text" id="title" aria-describedby="title" onChange={(e) => handleChange(e.target)} />
          <FormHelperText id="title-helper">Movie/Series Title</FormHelperText>
        </FormControl>

        <FormControl fullWidth={true}>
          <InputLabel>Overview</InputLabel>
          <Input value={formData.overview} onChange={(e) => handleChange(e.target)} type="text" id="overview" aria-describedby="overview" />
          <FormHelperText id="overview-helper">Your overview about the movie or series</FormHelperText>
        </FormControl>

        <FormControl fullWidth={true}>
          <InputLabel>Poster</InputLabel>
          <Input value={formData.poster_path} onChange={(e) => handleChange(e.target)} type="text" id="poster_path" aria-describedby="poster_path" />
          <FormHelperText id="poster_path-helper">Poster for the movie/series</FormHelperText>
        </FormControl>

        <FormControl fullWidth={true}>
          <InputLabel>Popularity</InputLabel>
          <Input onChange={(e) => handleChange(e.target)} type="number" id="popularity" aria-describedby="popularity" />
          <FormHelperText value={formData.popularity} id="popularity-helper">Popularity should contain number</FormHelperText>
        </FormControl>

        <FormControl fullWidth={true}>
          <InputLabel>Tags</InputLabel>
          <Input value={formData.tags} onChange={(e) => handleChange(e.target)} type="text" id="tags" aria-describedby="popularity" />
          <FormHelperText id="tags-helper">Tags for the movie/series</FormHelperText>
        </FormControl>
        
        <Button type="submit">Add</Button>
      </form>
    </Container>
  )
}