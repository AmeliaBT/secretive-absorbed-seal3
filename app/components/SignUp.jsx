const React = require('react');
const style = require('../styles/SignUp');
const Header = require('./Header');
// react-bootstrap
const {Form, FormGroup, Col, FormControl, Button} = require('react-bootstrap');

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      inspname: "",
      dep: "",
      securityLevel:""
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      
      xhr.open('POST', '/sign-up', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      //securityLevel
      let body = 'email=' + encodeURIComponent(this.state.email) +
      '&password=' + encodeURIComponent(this.state.password) +
      '&inspname=' + encodeURIComponent(this.state.inspname) +
      '&securityLevel=' + encodeURIComponent(this.state.securityLevel) +
      '&dep=' + encodeURIComponent(this.state.dep);


      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.error == 0) {
         
         window.location.href = "/reports";
          that.setState({
          ["email"]: "Succsess",
          ["password"]: "Succsess",
          ["inspname"]: "Success",
          ["dep"]: "Success",
          ["securityLevel"]:"Success"
           });
        }
        else {
          that.setState({
          ["email"]: "Email or inspname already exists",
          ["inspname"]: "Email or inspname already exists"
           });
         }
        }
      event.preventDefault();
     }
  render() {
    return (
      <div>
            <Header/>
            <Form className="FormSU" horizontal method="post" action="/signup" name="signup" onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalinspname">
                <Col className="form-labelSU" sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" name="inspname" required value={this.state.inspname} placeholder="RI Inspector Name" onChange={this.handleChangeValue} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col className="form-labelSU" sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" name="email" required value={this.state.email} placeholder="Email at ATI" onChange={this.handleChangeValue} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col className="form-labelSU" sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" name="password" required value={this.state.password} placeholder="Password" onChange={this.handleChangeValue} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalDepartment">
                <Col className="form-labelSU" sm={2}>
                  Department
                </Col>
                <Col sm={10}>
                  <FormControl type="text" name="dep" required value={this.state.dep} placeholder="Department" onChange={this.handleChangeValue} />
                </Col>
                 </FormGroup>
              <FormGroup controlId="formHorizontalLevel">
                <Col className="form-labelSU" sm={2}>
                 Security Level
                </Col>               
                
                <Col sm={10}>
                  <FormControl type="text" name="securityLevel" required value={this.state.securityLevel} placeholder=" Security Level" onChange={this.handleChangeValue} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button className="btn btn-primary btn-block" type="submit"><i className="fa fa-paper-plane"></i> Add User</Button>
                </Col>
              </FormGroup>
          </Form>
        </div>
    );
  }
};

module.exports = SignUp;