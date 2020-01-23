const React = require('react');
const Link = require('react-router-dom').Link
// style for BOOKS
const style = require('../styles/FormRI');
// other components and etc
const Header = require('./Header');
// react-bootstrap
const {Form, FormGroup, Col, FormControl, Button, Grid, Row, ControlLabel} = require('react-bootstrap');


/* the books page that shows all books */
class FormRI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportID:"",
      inspname: "",
      dep: "",
      ri_report_to_add: "",
      supplier: "",
      daterec: new Date().toLocaleString(),
      dateinsp: new Date().toLocaleString(),
      wopomtt: "",
      no: "",
      destination: "",
      pn: "",
      description: "",
      lotsize: "",
      samplesize: "",

    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
//** %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
componentWillMount() {
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
     
    //note: from user schema!  
       if(response.isLogedIn == true) {
         console.log(" loged in ok");
          that.setState({
         ["inspname"]: response.inspname,
         ["dep"]: response.dep      
        });
       }
     }
} 


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

   handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value  });
  }
  handleSubmit(event) { let that = this; 
    console.log(that)
      const xhr = new XMLHttpRequest();      
      xhr.open('POST', '/add-report', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      
      let body =           
      
      'supplier=' + encodeURIComponent(this.state.supplier) +     
      '&pn=' + encodeURIComponent(this.state.pn) +    
      '&inspector=' + encodeURIComponent(this.state.inspname) +
      '&daterec='+ encodeURIComponent(this.state.daterec) +
      //reportID
      '&dep=' + encodeURIComponent(this.state.dep) +
      '&reportID=' + encodeURIComponent(this.state.reportID) ;

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
          ["supplier"]: "Succsess",
          ["pn"]: "Succsess"
           });
        }
        else {
          that.setState({
          ["supplier"]: "Wrong supplier and/or pn"
           });
         }
        }
      event.preventDefault();
     }
  render() {
    return (
      <div>        
<Form className="input-label" method="post" action="/addRIreport" onSubmit={this.handleSubmit}>   
           
<Col  sm={5}>
<FormGroup ><ControlLabel>reportID</ControlLabel>
    <FormControl type="text" name="reportID" required value={this.state.reportID } placeholder="RI number" onChange={this.handleChangeValue}  />   
  </FormGroup>        

  <div className="profile-line"></div>
<FormGroup ><ControlLabel>Inspector</ControlLabel>
    <FormControl type="text" name="inspector" required value={this.state.inspname} readOnly />   
  </FormGroup>        

  <div className="profile-line"></div>
  
  <FormGroup ><ControlLabel> Date Received</ControlLabel>
    <FormControl type="text" name="daterec" required value={this.state.daterec} placeholder={this.state.daterec} onChange={this.handleChangeValue} />
  </FormGroup>   
  <div className="profile-line"></div> 
  <div className="profile-line"></div> 
  <FormGroup > <ControlLabel> Part Numberx</ControlLabel>                
  <FormControl type="text" name="pn" required value={this.state.pn} placeholder="PN" onChange={this.handleChangeValue}/>  </FormGroup>
  <div className="profile-line"></div>

  </Col>

  <Col  sm={5}>
  <FormGroup ><ControlLabel> Supplier</ControlLabel>
    <FormControl type="text" name="supplier" required value={this.state.supplier} placeholder="supplier" onChange={this.handleChangeValue} />
  </FormGroup>        
  <div className="profile-line"></div>

</Col>
       
              <FormGroup>
                <Col smOffset={2} sm={10}>
               <Button type="submit">submit RI form</Button>
                 {/*     <Button type="button" style={{"width": "100%"}} onClick={this.addRIreport}>Add RI Report</Button>*/}
                </Col>
              </FormGroup>
          </Form>
        </div>
    );
  }
};

module.exports = FormRI;