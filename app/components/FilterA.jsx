const React = require('react');
const ReactDOM = require('react-dom');
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
}  
submitForm(e) { e.preventDefault();  
  this.props.handleData(this.state) } ;  

   handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value });
  }
  
  render() { return (        <div>        
<form>
Name: 
  <input type="text" name="myName"  value={this.state.myName} onChange={this.handleChangeValue}/>  <br />
Email: 
  <input type="text" name="email"  value={this.state.email} onChange={this.handleChangeValue} /> <br />
<br />         
  
    <ul>
            <li>
              <label>
                <input
                  type="radio"
                  value="red"
                  checked={this.state.color === "red"}
                  onChange={this.onRadioChange}
                />
                <span>Red</span>
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
                <span>Green</span>
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
                <span>Blue</span>
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
                <span>Ornage</span>
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
                <span>Purple</span>
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