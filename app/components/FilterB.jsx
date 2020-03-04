const React = require('react');
const ReactDOM = require('react-dom');

const style = require('../styles/FilterA');

class FilterB extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      
     sel_radio_b: ''
} 

 
    this.submitForm = this.submitForm.bind(this);
     this.onRadioChange = this.onRadioChange.bind(this);
}  
submitForm(e) { e.preventDefault();  
  this.props.handleDataB(this.state) } ;  

  
  
  
   onRadioChange(e){
    this.setState({
      sel_radio_b: e.target.value
    });
  }
  
  
  render() { return (        <div>        
<form>
   
  Pass /Fail: 
    <ul>
            <li>
              <label>
                <input
                  type="radio"
                  value="Pass"
                  checked={this.state.sel_radio_b === "Pass"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl" >Pass</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="Fail"
                  checked={this.state.sel_radio_b === "Fail"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl">Fail</span>
              </label>
            </li>

               
             
          </ul>

  
  <input type="button" value="Submit" onClick={this.submitForm}/></form>        </div>    )  }}


module.exports = FilterB;

/*
<div className="px-5 py-5">

<CustomizedTypeahead
          labelKey="name" 
        options={options}
        multiple
          placeholder="Choose a state..."
        />   */