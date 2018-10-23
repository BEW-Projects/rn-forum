import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import Forum from './Forum';
import Header from './Header';
import SignUp from './SignUp';
import logo from './assets/logo.svg';
import './assets/stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
