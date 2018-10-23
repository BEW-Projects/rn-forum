import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import logo from './assets/logo.svg';
import './assets/stylesheets/Landing.css';
import { Jumbotron, Button } from 'react-bootstrap';

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Jumbotron className="landingJumbo">
        <h1>Welcome to rn-forum!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
      </Jumbotron>
      <Footer />
      </div>
    );
  }
}


export default Landing;
