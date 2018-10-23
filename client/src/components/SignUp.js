import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import './assets/stylesheets/SignUp.css';
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';

class Forum extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  getValidationState() {
    const length = this.state.username.length;
    if (length > 5) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="body-container">
        <h1>Sign Up</h1>
        <form>
        <FormGroup
          controlId="username"
        >
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="Username"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="email"
        >
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="password"
        >
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="passwordConfirm"
        >
          <FormControl
            type="password"
            value={this.state.confirmPassword}
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
      </div>
        <Footer />
      </div>
    );
  }
}


export default Forum;
