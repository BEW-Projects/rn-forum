import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedBottom>
          <Nav pullRight>
          <Navbar.Form pullLeft>
            <Button bsStyle="primary" type="button">Chat</Button>
          </Navbar.Form>
          </Nav>
      </Navbar>
    );
  }
}

export default Footer;
