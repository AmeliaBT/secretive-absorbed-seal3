const React = require('react');
const ReactDOM = require('react-dom');
class FilterA extends React.Component {
  constructor(props){
    super(props);
    this.state = { myName: '', email: ''  } 

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
  
  render() {    return (        <div>        <form>
Name: <input type="text" name="myName"  value={this.state.myName} onChange={this.handleChangeValue}/>  <br />
Email: <input type="text" name="email"  value={this.state.email} onChange={this.handleChangeValue} /> <br /><br />          <input type="button" value="Submit" onClick={this.submitForm}/></form>        </div>    )  }}


module.exports = FilterA;

/*
<div className="px-5 py-5">

<CustomizedTypeahead
          labelKey="name" 
        options={options}
        multiple
          placeholder="Choose a state..."
        />   */