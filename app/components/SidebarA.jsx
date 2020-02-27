/* ****************************************
Sidebar component that displays a list of options, and receives a callback function as its props. The callback function will be called from the Sidebar component by clicking one of the buttons, and will allow to notify the containing component (the parent) of the click
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link


const {Radio, Col, Grid, Row, Button, Glyphicon , OverlayTrigger, Popover} = require('react-bootstrap');

const style = require('../styles/RIlistItem');
const options =require('./exampleData');
//const CustomizedTypeahead =require('./CustomizedTypeahead');
const {Typeahead} = require('react-bootstrap-typeahead');

class SudebarA extends React.Component {
  constructor() {
    super();
    this.state = {
       color: 'green'

    };
    
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

   onRadioChange = (e) => {
    this.setState({
      color: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }
  
  render() {
    return (
      <div>
           <li>
                  <ButtonGroup vertical block data-toggle="buttons">
                    <Button className="btn btn-block" onClick={this._onOptionChange.bind(this, 'optionA')} active={this.state.option === 'optionA'}>Option A</Button>
                    <Button className="btn btn-block" onClick={this._onOptionChange.bind(this, 'optionB')} active={this.state.option === 'optionB'}>Option B</Button>
                    <Button className="btn btn-block" onClick={this._onOptionChange.bind(this, 'optionC')} active={this.state.option === 'optionC'}>Option C</Button>
                  </ButtonGroup>
            </li>

         </div>
    );
  }
}
module.exports = SudebarA;

