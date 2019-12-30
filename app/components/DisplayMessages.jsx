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
          <div>
       <h2>Type in a new Message:</h2>
       { /* render an input, button, and ul here */ }
<input  onChange={this.handleChange} value ={this.state.input} />
<button onClick={this.submitMessage} >submit message </button>
       
<ul>{this.state.messages.map( i => <li> {i} </li>  ) }</ul>
       { /* change code above this line */ }
     </div>
   );
 }
};
module.exports = DisplayMessages;
