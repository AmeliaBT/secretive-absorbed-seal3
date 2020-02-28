/* ****************************************
Sidebar component that displays a list of options, and receives a callback function as its props. The callback function will be called from the Sidebar component by clicking one of the buttons, and will allow to notify the containing component (the parent) of the click
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link


const {Radio, Col, Grid, Row, Button, Glyphicon, Form } = require('react-bootstrap');

const style = require('../styles/SidebarA');
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

   onRadioChange(e){
    this.setState({
      color: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
    console.log(this.state);
  }
  
  render() {
    return (
      <div>
      
      <Form>
  <div className="mb-3">
    <Form.Check name='radios' inline label="1" type='radio' id={`inline-1`} />
    <Form.Check inline name='radios' label="2" type='radio' id={`inline-2`} />
    <Form.Check
      inline
      disabled
      type='radio'
      label="3 (disabled)"
      name='radios'
      id={`inline-3`}
    />
  </div>
</Form>
   


         </div>
    );
  }
}
module.exports = SudebarA;

/* 
           <li>
                  <ButtonGroup vertical block data-toggle="buttons">
                    <Button className="btn btn-block" onClick={this._onOptionChange.bind(this, 'optionA')} active={this.state.option === 'optionA'}>Option A</Button>
                    <Button className="btn btn-block" onClick={this._onOptionChange.bind(this, 'optionB')} active={this.state.option === 'optionB'}>Option B</Button>
                    <Button className="btn btn-block" onClick={this._onOptionChange.bind(this, 'optionC')} active={this.state.option === 'optionC'}>Option C</Button>
                  </ButtonGroup>
            </li>
            
            
    <form onSubmit={this.onSubmit}>
          <p>Select Inspector:</p>

          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  value="red"
                  checked={this.state.color === "red"}
                  onChange={this.onRadioChange}
                />
               Red
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="green"
                  checked={this.state.color === "green"}
                  onChange={this.onRadioChange}
                />
               Green
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="blue"
                  checked={this.state.color === "blue"}
                  onChange={this.onRadioChange}
                />
               Blue
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="orange"
                  checked={this.state.color === "orange"}
                  onChange={this.onRadioChange}
                />
               Oranage
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="purple"
                  checked={this.state.color === "purple"}
                  onChange={this.onRadioChange}
                />
              Purple
              </label>
            </li>
          </ul>

          <button type="submit">Select</button>
        </form>
         
            
            
            
            
            
            
*/

