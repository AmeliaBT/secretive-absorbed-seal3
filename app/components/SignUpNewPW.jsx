const React = require('react');
const style = require('../styles/SignUp');

const Header = require('./Header');
// react-bootstrap
const {Form, FormGroup, Col, FormControl, Button} = require('react-bootstrap');

/* Change PW  form */
class SignUpNewPW extends React.Component {
  constructor(props) {
    super(props);
   

    this.state = {    
      password: ""      
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
   handleLogOut() {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/log-out', true);
      xhr.send();

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.error == 0) {
          window.location.href = "/";
        }
      }
  }
  
  
  handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
      const name = target.name;      
      this.setState({
        [name]: value
      });
  }
  handleSubmit(event) {
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/set-password', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      //securityLevel
      let body =           
      'password=' + encodeURIComponent(this.state.password)   ;
      xhr.send(body);
      xhr.onreadystatechange = function() {
        if (this.readyState != 4){
          this.handleLogOut
        } 
          //return;        
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.error == 0) {         
         window.location.href = "/reports";
          that.setState({         
          ["password"]: "Succsess"         
           });
               
          
        }
        else {
          that.setState({
          ["password"]: "error; PW not updated"
           });
         }
        }
    
    
      event.preventDefault();
     }
  
  
  render() {
    return (
      <div>
            <Header/>
            <Form className="FormSU" horizontal method="post" action="/set-password" name="changePW" onSubmit={this.handleSubmit}>
              
              <FormGroup controlId="formHorizontalPassword">
                <Col className="form-labelSU" sm={2}>
                  New Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" name="password" required value={this.state.password} placeholder="Password" onChange={this.handleChangeValue} />
                </Col>
              </FormGroup>
                     
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button className="btn btn-primary btn-block" type="submit"><i className="fa fa-paper-plane"></i> Update Password</Button>
                </Col>
              </FormGroup>
          </Form>
        </div>
    );
  }
};

module.exports = SignUpNewPW;
