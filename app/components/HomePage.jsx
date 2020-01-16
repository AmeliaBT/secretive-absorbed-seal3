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
// react-bootstrap
const {Grid, Row, Col, FormControl, ControlLabel, FormGroup, HelpBlock, Tabs, Tab, Form, Button} = require('react-bootstrap');

/* component for user profile */
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inspname: "Me2",
      dep: "d2",
      //ri_report_to_add: "RI-5358",
      reportnumber: 
      supplier: "oem2",
      daterec: "",
      dateinsp: "",
      wopomtt: "PO2",
      no: "1232",
      destination: "ata2",
      pn: "990-12122",
      description: "AT-92242",
      lotsize: 1002,
      samplesize: 52
     /*     
      street: "",
      ri_report_to_add: "",
     
      user_reports: "loading...",
      income: null,
      outcome: null*/
    };
   this.depChanged = this.depChanged.bind(this);
  //  this.streetChanged = this.streetChanged.bind(this);
   // this.reportChanged = this.reportChanged.bind(this);
    this.addRIreport = this.addRIreport.bind(this);
  }
  /****************************/
  // Handlers
  /****************************/
  depChanged(event) {
      const value = event.target.value;
          this.setState({
            ["dep"]: value
           });
    // set dep in DB
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/set-dep', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      let body = 'dep=' + encodeURIComponent(value);

      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        console.log(response);
        }
  }
  /**/
  streetChanged(event) {
    const value = event.target.value;
          this.setState({
            ["street"]: value
           });
    // set street in DB
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/set-street', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      let body = 'street=' + encodeURIComponent(value);

      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        console.log(response);
        }
  }
  /**/
  reportChanged(event) {
    const value = event.target.value;
          this.setState({
            ["ri_report_to_add"]: value
           });
  }
  reportChanged2(event) {
    const value = event.target.value;
          this.setState({
            ["ri_report_to_add2"]: value
           });
  }
  /**/
  addRIreport() {
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/add-report', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

     // let body = 'reportnumber=' + encodeURIComponent(this.state.ri_report_to_add)  ;
     //inspname: "",       dep: 
     let body = 'reportnumber=' + encodeURIComponent(this.state.reportnumber) ;
     /*
     let body = 'inspname  =  '   + encodeURIComponent(this.state.inspname) +
     ', dep  =  '   + encodeURIComponent(this.state.dep) +
     ' , ri_report_to_add  =  '   + encodeURIComponent(this.state.ri_report_to_add) +
     ' , supplier  =  '   + encodeURIComponent(this.state.supplier) +
     ' , daterec  =  '   + encodeURIComponent(this.state.daterec)+
     ' , dateinsp  =  '   + encodeURIComponent(this.state.dateinsp)+
     ' , wopomtt  =  '   + encodeURIComponent(this.state.wopomtt)+
     ' , no  =  '   + encodeURIComponent(this.state.no)+
     ' , destination  =  '   + encodeURIComponent(this.state.destination)+
     ' , pn  =  '   + encodeURIComponent(this.state.pn)+
     ' , description  =  '   + encodeURIComponent(this.state.description)+
     ' , lotsize  =  '   + encodeURIComponent(this.state.lotsize)+
     ' , samplesize  =  '   + encodeURIComponent(this.state.samplesize);

*/
     console.log(body);
      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        console.log(response);
        }
  }
  /**/
  customValidateText(text) {
      return (text.length > 0 && text.length < 17);
    }
  /****************************/
  componentWillMount() {
     // get user nickname
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
        /*
        let income = response.income.map((e) => {
          return <IncomeProposal reportnumber1={e.chosenBook} reportnumber2={e.chosenAnotherUserBook} nickname={e.anotherUserNickname}/>;
        });
        let outcome = response.outcome.map((e) => {
          return <OutcomeProposal reportnumber1={e.chosenBook} reportnumber2={e.chosenAnotherUserBook} nickname={e.anotherUserNickname}/>;
        });
*/
        let reports = response.reports.map((e) => {
        {/* return <UserBook img_url={e.img_url} reportnumber={e.reportnumber}/>;*/}  
        return <UserBook  reportnumber={e.reportnumber}/>;
        });
          if(response.isLogedIn == true) {
             that.setState({
            ["inspname"]: response.inspname,
            ["dep"]: response.dep,
           // ["street"]: response.street,
            ["user_reports"]: reports
            /*,
            ["income"]: <div className="proposals-container">
                           {income}
                        </div>,
            ["outcome"]: <div className="proposals-container">
                           {outcome}
                        </div>*/
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
    {/* 
    <form className="input-label">
      <FormGroup controlId="formBasicText" >
        <ControlLabel>Your street</ControlLabel>
        <FormControl type="text" value={this.state.street} placeholder="enter your street" onChange={this.streetChanged}/>
        <FormControl.Feedback />
      </FormGroup>
    </form>
        */}            
    <div className="proposal-label">New RI report </div>
    <div className="profile-line"></div>
    <Tabs defaultActiveKey={1} id="uncontrolled-tab" className="tabs">
      <Tab eventKey={1} title="Income">   {this.state.income}  </Tab>
      <Tab eventKey={2} title="Outcome">  {this.state.outcome}       </Tab>
    </Tabs>   </Col>
  <Col xs={12} md={8} className="right-col">
    <div className="library-label">Your RI Reports</div>



      <Form inline className="input-label add-form">
      <FormGroup controlId="addBookForm"  >
        <FormControl  type="text"  value={this.state.ri_report_to_add}  placeholder="enter P/N"
          onChange={this.reportChanged} style={{"width": "100%"}} />
            
<FormControl  type="text"  value={this.state.inspname}  placeholder="enter inspname"
          onChange={this.reportChanged} style={{"width": "100%"}} />


      <Button type="button" style={{"width": "100%"}} onClick={this.addRIreport}>Add RI Report</Button>
    <FormControl.Feedback />
  </FormGroup>
</Form>
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