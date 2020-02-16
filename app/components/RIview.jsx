
const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router-dom').Link
//const style = require('../styles/Profile');
const Header = require('./Header');
const {Grid, Row, Col, FormControl, ControlLabel, FormGroup, HelpBlock, Tabs, Tab, Form, Button} = require('react-bootstrap');

class RIview extends React.Component {
  
  constructor(props) {   
    super(props);
this.state = {
         
      reportID: "", // this.props.reportnumber,
     inspector: "",  // Inspector:
      daterec: "",  //Date Received
      Gwo: "",  // Description:      
      cwo: "" ,// Date Received:      
      dwo: "",  // WO / PO / MTT: mySel, //      
      ewo: "",  // Supplier:
      fwo: "",  // P/N:
      hwo: "",  // Documentation Revision:     
      iwo: "",  // Received SW:
      jwo: "", // Date Inspected:
      kwo: "",  // NO:
      lwo: "", 
      mwo: "",  // Source:
      nwo: "",  // Destination:
      owo: "",  // Lot Size:
      pwo: "",  // Sample Size:
      qwo: "",  // Qty Defective:
      rwo: "",  // Qty Rejected:
      swo: "",  // DMR #:
      two: "",  // Pass / Fail:
      record: "", // comment -note
      uwo: ""  // old extra; new file -photo
}
       
  }
  componentWillMount() {
     // get report data
      let that = this;
      const xhr = new XMLHttpRequest();
      let repPath= this.props.location.pathname;
    let pageID=  repPath.substring(13); // report-edit/6032 12 pageID: /6031    
   
   xhr.open('POST',"/report-view" , true); 
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
    
 let body = 'reportID=' + encodeURIComponent(pageID) ;
      xhr.send(body);
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);        
             that.setState({
            ["reportID"]: response.reportID,
            ["fwo"]: response.fwo,
            ["Gwo"]: response.Gwo,
             ["jwo"]: response.jwo,
               ["two"]: response.two,
               ["owo"]: response.owo
   
           });        
        }
  }
  
  render() {
    return (
      <div >
     <Header/>
        <Col  sm={5} >	
  <FormGroup className="input-row"><ControlLabel > 	 PN:	</ControlLabel><FormControl type="text" name="fwo"   value={this.state.fwo	} readOnly />  </FormGroup> 
  <FormGroup className="input-row" ><ControlLabel > 	Description :	</ControlLabel><FormControl type="text" name="Gwo"   value={this.state.Gwo	}  readOnly />  </FormGroup> 
  <FormGroup className="input-row" ><ControlLabel> 	 Date:	</ControlLabel><FormControl type="text" name="jwo"   value={this.state.jwo	} readOnly />  </FormGroup> 
  <div className="profile-line"></div>
        </Col>    
      </div>
    );
  }
}

module.exports = RIview;

