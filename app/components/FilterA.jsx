const React = require('react');
const Link = require('react-router-dom').Link
// style for BOOKS
//const style = require('../styles/FormRI');
// other components and etc
const options =require('./exampleData');
/*
let options=[
  { name: 'Alabama', population: 4780127, capital: 'Montgomery', region: 'South' },
  { name: 'Alaska', population: 710249, capital: 'Juneau', region: 'West' },
  { name: 'Arizona', population: 6392307, capital: 'Phoenix', region: 'West' },
  { name: 'Arkansas', population: 2915958, capital: 'Little Rock', region: 'South' }
];
*/



//const CreatableSelect= require('react-select');
//const { Creatable }= require('react-select');

// react-bootstrap react-bootstrap-typeahead
//const {Typeahead, TableHeaderColumn, InputGroup, option, Form, FormGroup, Col, FormControl, //Button, Grid, Row, ControlLabel} = require('react-bootstrap');
// from 'react-bootstrap-typeahead';
const {Typeahead} = require('react-bootstrap-typeahead');
// <div className="px-5 py-5">
class FilterA extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'xx'
    };
  }

  render() {
    return (
      <div>
          <div >
        <h5>FilterA</h5>
        {/* 
        <Typeahead
          labelKey="name"
          options={options}
          multiple
          placeholder="Choose a state..."
        />*/}
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