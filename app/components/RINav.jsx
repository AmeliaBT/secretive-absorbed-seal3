const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router-dom').Link


//import React, { Component } from 'react';
//import logo from './logo.svg';
//import './RINav.css';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

class RINav extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">
              Link
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <p className="Nav-intro">
          To get started, edit <code>src/Nav.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default RINav;