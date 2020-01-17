const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router-dom').Link
// style for BOOK
const style = require('../styles/HomePage');
// other components and etc
const Header = require('./Header');
const UserBook = require('./UserBook');
const IncomeProposal = require('./IncomeProposal');
const OutcomeProposal = require('./OutcomeProposal');
const FormRI =require('./FormRI');
// react-bootstrap
const {Grid, Row, Col, FormControl, ControlLabel, FormGroup, HelpBlock, Tabs, Tab, Form, Button} = require('react-bootstrap');

/* component for user profile */
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inspname: "",
      dep: ""        
      
    };
 // this.depChanged = this.depChanged.bind(this);
  
   
  }
  /****************************/
  // Handlers
  /****************************/

  customValidateText(text) {
      return (text.length > 0 && text.length < 17);
    }
  /****************************/
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
        console.log("respon parsed ")
        /*
        to do -list RIs for Inspector
*/
       // let reports = response.reports.map((e) => {
        {/* return <UserBook img_url={e.img_url} reportnumber={e.reportnumber}/>;*/}  
      //  return <UserBook  reportnumber={e.reportnumber}/>;
       // });
          if(response.isLogedIn == true) {
            console.log(" loged in ok")
             that.setState({
            ["inspname"]: response.inspname,
            ["dep"]: response.dep
             /*,
           
            ["user_reports"]: reports
            /*
           */
           });
          }
        }
  }
  render() {
    return(
        <div>
          <Header/>
          <div className="profile">
              <Grid>
                <Row className="show-grid">
                  <Col xs={6} md={4} className="left-col">
                    <div className="profile-label">Your profile</div>
                    <div className="profile-line"></div>

    <form className="input-label">
      <FormGroup controlId="formBasicText" >
        <ControlLabel>Your name</ControlLabel>
        <FormControl type="text" value={this.state.inspname}  readOnly  />
        <FormControl.Feedback />
      </FormGroup>
    </form>
                    <div className="profile-line"></div>

    <form className="input-label">
      <FormGroup controlId="formBasicText" >
        <ControlLabel>Your dep</ControlLabel>
        <FormControl type="text" value={this.state.dep} placeholder="enter your dep" onChange={this.depChanged} />
        <FormControl.Feedback />
      </FormGroup>
    </form>
    <div className="profile-line"></div>
                
    <div className="proposal-label">Your RI Reports (?) </div>
    <div className="profile-line"></div>
    {/* 
   
       
    <Tabs defaultActiveKey={1} id="uncontrolled-tab" className="tabs">
      <Tab eventKey={1} title="Income">  old </Tab>
      <Tab eventKey={2} title="Outcome">   old     </Tab>
    </Tabs>  
     */}
    
     </Col>
  <Col xs={12} md={8} className="right-col">
    <div className="library-label">Your RI Reports</div>

{/*
                <Form inline className="input-label add-form">
                  <FormGroup controlId="addBookForm"  >
                    <FormControl type="text" value={this.state.reportnumber} placeholder="enter reportnumber"
                      onChange={this.reportChanged} style={{ "width": "100%" }} />
                    <FormControl type="text" value={this.state.inspname} placeholder="enter inspname"
                      onChange={this.reportChanged} style={{ "width": "100%" }} />
                    <Button type="button" style={{ "width": "100%" }} onClick={this.addRIreport}>Add RI Report</Button>
                    <FormControl.Feedback />
                  </FormGroup>
                </Form>
 */}
 <FormRI />
<div className="library">
  {this.state.user_reports}
</div>
                  </Col>
                </Row>
              </Grid>
          </div>
        </div>
    );
  }
}
module.exports = HomePage;