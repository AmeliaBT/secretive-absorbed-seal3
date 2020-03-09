const React = require('react');
const ReactDOM = require('react-dom');

const style = require('../styles/FilterA');

class FilterA extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      model: '', 
      pn: '' ,
      comment: '' ,
     sel_radio_a: '',
      supplier:'',
  source:'',
  destination:''
      
} 

   this.handleChangeValue = this.handleChangeValue.bind(this);
    this.submitForm = this.submitForm.bind(this);
      this.clearForm = this.clearForm.bind(this);
     this.onRadioChange = this.onRadioChange.bind(this);
}  
submitForm(e) { e.preventDefault();  
  this.props.handleData(this.state) } ;  

  clearForm() {
    this.setState({ 
       model: '', 
      pn: '' ,
       comment: '' ,
     sel_radio_a: '',
      supplier:'',
  source:'',
  destination:''
         
    }); 
  }
  
  
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
Model: <br />
  <input className="filter_input_a" type="text" name="model"  value={this.state.model} 
    onChange={this.handleChangeValue}/>  <br />
PN: <br />
  <input className="filter_input_a" type="text" name="pn"  value={this.state.pn} 
    onChange={this.handleChangeValue} /> <br />
<br />   
  
  Comment: <br />
  <input className="filter_input_a" type="text" name="comment"  value={this.state.comment} 
    onChange={this.handleChangeValue} /> <br />
<br />    
  Inspector: 
    <ul>
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
                  value="Jim"
                  checked={this.state.sel_radio_a === "Jim"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl">Jim</span>
              </label>  
      </li>              
            <li>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={this.state.sel_radio_a === "Other"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl" >Other</span>
              </label>
            </li> 
          </ul>  
  
  supplier: <br />
  <input className="filter_input_a" type="text" name="supplier"  value={this.state.supplier} 
    onChange={this.handleChangeValue} /> <br />
 Source: <br />
  <input className="filter_input_a" type="text" name="source"  value={this.state.source} 
    onChange={this.handleChangeValue} /> <br />
  Destination: <br />
  <input className="filter_input_a" type="text" name="destination"  value={this.state.destination} 
    onChange={this.handleChangeValue} /> <br />
  
  <input type="button" value="Submit" onClick={this.submitForm}/></form> 
    <input type="button" value="Clear" onClick={this.clearForm}/>
    </div>    )  }}


module.exports = FilterA;

/*
<div className="px-5 py-5">

<CustomizedTypeahead
          labelKey="name" 
        options={options}
        multiple
          placeholder="Choose a state..."
        />   */