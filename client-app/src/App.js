import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from './containers/Login'
import OAuth from './containers/OAuth'
import Home from './containers/Home'

class App extends Component {

  render() {
    return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/oauth" component={OAuth} />
      </div>
    </Router>)
  }
}

export default App;
