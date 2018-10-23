import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a>Rn-Forum</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/forum">
              <NavItem>
                Forum
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Email" />
              <FormControl type="password" placeholder="Password" />
            </FormGroup>{' '}
            <Button bsStyle="success" type="submit">Login</Button>
            <Button bsStyle="primary" type="button">Sign Up</Button>
          </Navbar.Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
