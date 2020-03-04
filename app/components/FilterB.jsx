const React = require('react');
const ReactDOM = require('react-dom');

const style = require('../styles/FilterA');

class FilterB extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      model: '', 
      pn: '' ,
     sel_radio_a: ''
} 

   this.handleChangeValue = this.handleChangeValue.bind(this);
    this.submitForm = this.submitForm.bind(this);
     this.onRadioChange = this.onRadioChange.bind(this);
}  
submitForm(e) { e.preventDefault();  
  this.props.handleData(this.state) } ;  

  
   handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value });
  }
  
   onRadioChange(e){
    this.setState({
      sel_radio_a: e.target.value
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
                  value="Pass,"
                  checked={this.state.sel_radio_a === "Helen,"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl" >Helen</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="Tuan"
                  checked={this.state.sel_radio_a === "Tuan"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl">Tuan</span>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="Abc"
                  checked={this.state.sel_radio_a === "Abc"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl">Abc</span>
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