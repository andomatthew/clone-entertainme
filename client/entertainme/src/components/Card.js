import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { gql, useMutation } from '@apollo/client'
import { getAllServices } from '../queries/queries'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const UPDATE_MOVIE = gql`
  mutation editMovie {
    updateMovie (
      _id: "6051b5bfc3dc1362263aaafc",
      title: "ini coba update pake dollar input",
      overview: "bagus",
      poster_path: "/asd",
      popularity: 100,
      tags: ["1", "2", "3"]
    )
  }
`

const DELETE_MOVIE = gql`
  mutation deleteMovie($input: String) {
    deleteMovie (_id: $input )
  }
`

export default function MediaCard(props) {
  const classes = useStyles();
  const history = useHistory()
  const [deleteMovie, { data }] = useMutation(DELETE_MOVIE)

  function handleEdit(e) {
    history.push(`/update/${props.service._id}`, {props: props.service})
  }

  function handleDelete(e) {
    e.preventDefault()
    // alert(props.service._id)
    deleteMovie({ variables: { input: props.service._id }, refetchQueries: [{ query: getAllServices }] })
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/85/0b/b2/850bb2e2-31d1-60b6-510f-b4e78e0e7285/source/512x512bb.jpg"
          title={props.service.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.service.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.service.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleEdit} size="small" color="primary">
          Edit
        </Button>
        <Button onClick={handleDelete} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
