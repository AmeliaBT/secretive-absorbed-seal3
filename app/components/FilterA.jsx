const React = require('react');
const Link = require('react-router-dom').Link
// style for BOOKS
const style = require('../styles/FormRI');
// other components and etc
const options =require('./exampleData');
const Header = require('./Header');
//const CreatableSelect= require('react-select');
//const { Creatable }= require('react-select');

// react-bootstrap react-bootstrap-typeahead
const {Typeahead, TableHeaderColumn, InputGroup, option, Form, FormGroup, Col, FormControl, Button, Grid, Row, ControlLabel} = require('react-bootstrap');

class FilterA extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
            <Header/>
      <div className="px-5 py-5">
        <Typeahead
          labelKey="name"
          options={options}
          multiple
          placeholder="Choose a state..."
        />
      </div>
         </div>
    );
  }
}
module.exports = FilterA;