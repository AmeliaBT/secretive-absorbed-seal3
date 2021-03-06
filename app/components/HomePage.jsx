//RI Gallery
const React = require('react');
// other components and etc
const Header = require('./Header');
const FormRI =require('./FormRI');
// react-bootstrap
const { Row} = require('react-bootstrap');

/* component for ri home page */
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inspname: "",
      dep: ""  
    };
 
  }
  /****************************/
  // Handlers
  /****************************/

  customValidateText(text) {
      return (text.length > 0 && text.length < 17);
    }
  /****************************/
  UNSAFE_componentWillMount() {
     // get user inspname 
      let that = this;
      const xhr = new XMLHttpRequest();      
      xhr.open('POST', '/is-loged-in', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);   
     
          if(response.isLogedIn == true) {
          
             that.setState({
            ["inspname"]: response.inspname,
            ["dep"]: response.dep
           
           });
          }
        }
  }
  render() {
    return(
        <div>
          <Header/>
  <div className="profile">
            
 <Row className="show-grid">
 

 <div className="title-line"> 
  <p>QLT-1201-F03 Receiving Inspection Form for: <span>  {this.state.inspname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span> department: 
  <span>  { this.state.dep} </span>  </p>
  </div>
  <div className="profile-line"></div> 
 
</Row>
</div>
        
<div className="myForm"> 
        <FormRI />  
          </div>
        </div>
    );
  }
}
module.exports = HomePage;
