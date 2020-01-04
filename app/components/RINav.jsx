const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router-dom').Link
const style = require('../styles/RINav');

//import React, { Component } from 'react';
//import logo from './logo.svg';
//import './RINav.css';
//import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap'; 
//className="navbar-nav"
const {Navbar, NavItem, NavDropdown, MenuItem, Nav } = require('react-bootstrap');
class RINav extends React.Component {

  render() {
    return (
      <div className="navbar-navb">
        <header className="navbar-navb">
        
          <h1 className="navbar-navb">Welcome to Ri</h1>
        </header>
        <Navbar className="navbar-navb">
          <Navbar.Header className="navbar-navb">
            <Navbar.Brand className="navbar-navb">
              item 11
            </Navbar.Brand>
                        <Navbar.Brand>
              item 21
            </Navbar.Brand>
                        <Navbar.Brand>
              item 31
            </Navbar.Brand>
          </Navbar.Header>
          {/* 
          <Nav>
            <NavItem eventKey={1} >
              Link
            </NavItem>
            <NavItem eventKey={2} >
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
          */}
        </Navbar>
        <p className="Nav-intro">
          To get started .... <code>s some place </code> and save to reload.
        </p>
      </div>
    );
  }
}

module.exports = RINav;