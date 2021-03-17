import Home from './pages/Home'
import Favorite from './pages/Favorite'
import AddPage from './pages/AddPage'
import AppBar from './components/AppBar'
import UpdatePage from './pages/UpdatePage'
import { Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'


function App() {
  return (
    <div className="App">
        <Container>
          <AppBar/>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/favorite'>
              <Favorite/>
            </Route>
            <Route exact path="/add">
              <AddPage/>
            </Route>
            <Route exact path="/update/:id">
              <UpdatePage/>
            </Route>
          </Switch>
        </Container>
      </div>
  );
}

export default App;
