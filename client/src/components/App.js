import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import Forum from './Forum';
import Header from './Header';
import logo from './assets/logo.svg';
import './assets/stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/forum" component={Forum} />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
