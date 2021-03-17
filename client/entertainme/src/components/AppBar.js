import React from 'react';
//material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'

//react-router
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  search: {
    display: 'flex',
    alignItems: 'center'
  }
})


export default function Navigation() {
  const classes = useStyles()
  const history = useHistory()
  
  return(
    <React.Fragment>
      <AppBar
        className={classes.root}
      >
        <Toolbar style={{display: 'flex', justifyContent: 'flex-start'}}>
          <Link to="/">
            <Button>
              <Typography variant="h6">Home</Typography>
            </Button>
          </Link>
          <Link to="/favorite">
            <Button>
              <Typography variant="h6">My Favorites</Typography>
            </Button>
          </Link>
          <Link to="/add">
            <Button>
              <Typography variant="h6">Add</Typography>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}