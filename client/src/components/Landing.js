import React, { Component } from 'react';
import Header from './Header';
import logo from './assets/logo.svg';
import './assets/stylesheets/Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Landing Page
          </p>
        </header>
      </div>
    );
  }
}


export default Landing;
