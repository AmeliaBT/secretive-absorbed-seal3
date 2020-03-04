const React = require('react');
const ReactDOM = require('react-dom');

const style = require('../styles/FilterA');

class FilterA extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      myName: '', 
      email: '' ,
     color: 'green'
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
      color: e.target.value
    });
  }
  
  
  render() { return (        <div>        
<form>
Model: 
  <input type="text" name="myName"  value={this.state.myName} 
    onChange={this.handleChangeValue}/>  <br />
PN: 
  <input type="text" name="email"  value={this.state.email} 
    onChange={this.handleChangeValue} /> <br />
<br />         
  Inspector: 
    <ul>
            <li>
              <label>
                <input
                  type="radio"
                  value="Helen,"
                  checked={this.state.color === "Helen,"}
                  onChange={this.onRadioChange}
                />
                <span2>Helen</span2>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="Tuan"
                  checked={this.state.color === "Tuan"}
                  onChange={this.onRadioChange}
                />
                <span2>Tuan</span2>
              </label>
            </li>

            <li>
              <label>
                <input
                  type="radio"
                  value="Abc"
                  checked={this.state.color === "Abc"}
                  onChange={this.onRadioChange}
                />
                <span2>Abc</span2>
              </label>  
      </li>
                
             
          </ul>

  
  <input type="button" value="Submit" onClick={this.submitForm}/></form>        </div>    )  }}


module.exports = FilterA;

/*
<div className="px-5 py-5">

<CustomizedTypeahead
          labelKey="name" 
        options={options}
        multiple
          placeholder="Choose a state..."
        />   */