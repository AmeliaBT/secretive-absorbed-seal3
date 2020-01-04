const React = require('react');
const Link = require('react-router-dom').Link
class DisplayMessages extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     input: '',
     messages: []
   }
this.handleChange=this.handleChange.bind(this);
this.submitMessage=this.submitMessage.bind(this);
 }
 // add handleChange() and submitMessage() methods here
handleChange(event){this.setState(
 {input: event.target.value})};
  
  
submitMessage(){ 
 this.setState(
   {messages: this.state.messages.concat(this.state.input),  
   input: ""}
 )}
render() {
      return (
           <div> <div className="row">
<div className ="col-xs-4">
        <h2 className="red-text text-center">Type in a <span className="text-danger">new Message: </span></h2>
        </div></div>
        { /* render an input, button, and ul here */ }
        <div className="row">
<div className="col-xs-4">       
 <input className="thick-green-border" onChange={this.handleChange} value ={this.state.input} />
 </div></div>
 <div className="row">
 <div className="col-xs-4">  
 <button  type="submit" className="btn btn-primary btn-block" onClick={this.submitMessage} ><i className="fa fa-paper-plane"></i> Submit </button>
 </div>
 </div>
 <div className="row">
 <div className="col-xs-4"> 
  <ul>{this.state.messages.map( i => <li> {i} </li>  ) }</ul>
  </div>
  </div>   { /* change code above this line */ }     </div> 
    );  } }; 

module.exports = DisplayMessages;
