import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import logo from './assets/logo.svg';
import './assets/stylesheets/Forum.css';

class Forum extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Forum
          </p>
        </header>
        <Footer />
      </div>
    );
  }
}


export default Forum;
