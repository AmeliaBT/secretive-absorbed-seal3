//shows requested RI Report (form with photos); editing and saving are disabled 
const React = require('react');
const Header = require('./Header');
const RIphoto2 = require('./RIphoto2');
const {Grid, Row, Col, FormControl, ControlLabel, FormGroup} = require('react-bootstrap');
let myLink, myLink2;
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
  UNSAFE_componentWillMount() {
    // get report data
    let that = this;
    const xhr = new XMLHttpRequest();
    let repPath = this.props.location.pathname;
    let pageID = repPath.substring(13);
    xhr.open('POST', "/report-edit", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let body = 'reportID=' + encodeURIComponent(pageID);
    xhr.send(body);
    xhr.onreadystatechange = function () {
      if (this.readyState != 4) return;
      if (this.status != 200) {
        alert('error: ' + (this.status ? this.statusText : 'request has not been set'));
        return;
      }
      let response = JSON.parse(this.responseText);

      myLink = response.lwo;// props for photos
      myLink2 = response.uwo;

      let cwo2, jwo2;
      if (response.cwo == null) { cwo2 = "" } else { cwo2 = response.cwo.slice(0, -14) };
      if (response.jwo == null) { jwo2 = "" } else { jwo2 = response.cwo.slice(0, -14) };

      that.setState({
        ["_id"]: response._id,
        ["reportID"]: response.reportID,
        ["inspector"]: response.inspector,
        ["daterec"]: response.daterec,
        ["Gwo"]: response.Gwo,
        ["cwo"]: cwo2, //response.cwo.slice(0,-14) ,    
        ["dwo"]: response.dwo,
        ["ewo"]: response.ewo,
        ["fwo"]: response.fwo,
        ["hwo"]: response.hwo,
        ["iwo"]: response.iwo,
        ["jwo"]: jwo2, //response.jwo.slice(0,-14) ,
        ["kwo"]: response.kwo,
        ["lwo"]: response.lwo,
        ["mwo"]: response.mwo,
        ["nwo"]: response.nwo,
        ["owo"]: response.owo,
        ["pwo"]: response.pwo,
        ["qwo"]: response.qwo,
        ["rwo"]: response.rwo,
        ["swo"]: response.swo,
        ["two"]: response.two,
        ["record"]: response.record,
        ["uwo"]: response.uwo
      });
    }

  }


  render() {
    return (
      <div >
     <Header/>
        
       <Grid>  
           
        <Row>  
     <Col sm={11} ><h4>  RI Number:  {this.state.reportID}  </h4>  </Col></Row>  
     
         
  <Row> <Col  sm={11} >  <div className="profile-line1"><p>General</p> </div></Col>  </Row>       
         <Row >
<Col sm={3} >	 <div className="well">   
 <FormGroup className="input-row"><ControlLabel>Inspector:</ControlLabel> <FormControl   readOnly type="text" name="inspector" value={this.state.inspector	}  /> </FormGroup>    

  <FormGroup className="input-row"><ControlLabel>Supplier:</ControlLabel>    <FormControl  className="input-row" type="text" name="ewo" value={this.state.ewo}   readOnly />  </FormGroup>  
 
  </div></Col> 
  <Col sm={2} >	 <div className="well">    
   <FormGroup ><ControlLabel>WO / PO / MTT:</ControlLabel> <FormControl   className="input-row3" type="text" name="dwo"  value={this.state.dwo}   readOnly   />      </FormGroup> 
   <FormGroup className="input-row"><ControlLabel> 	 NO:</ControlLabel> <FormControl type="text" name="kwo"       value={this.state.kwo	}  readOnly  />  </FormGroup> 
 </div></Col>
        <Col sm={3} >	<div className="well"> 
  <FormGroup className="input-row"><ControlLabel>Date Received:	</ControlLabel> <FormControl type="date" name="cwo"      value={this.state.cwo	}  readOnly  />  </FormGroup> 
  <FormGroup className="input-row"><ControlLabel> Date Inspected: </ControlLabel><FormControl type="date" name="jwo"   value={this.state.jwo	} readOnly  />  </FormGroup> 
  </div></Col>
<Col sm={3} >	<div className="well"> 
<FormGroup ><ControlLabel>Source:</ControlLabel> 
  <FormControl  className="input-row3" type="text" name="mwo" value={this.state.mwo}  readOnly  />  </FormGroup> 
<FormGroup ><ControlLabel>Destination:</ControlLabel> <FormControl  className="input-row3" type="text" name="nwo" value={this.state.nwo}  readOnly  />  </FormGroup> 
  </div></Col>
  </Row>
 
  <Row> <Col  sm={11} >  <div className="profile-line"><p>Product</p>  </div></Col>  </Row>       
         
   <Row>
     

<Col sm={4} ><div className="well">   
<FormGroup className="input-row"><ControlLabel> 	 P/N:	</ControlLabel><FormControl type="text" name="fwo"   value={this.state.fwo	} readOnly  />  </FormGroup> 
  </div></Col>
<Col sm={4} ><div className="well">   
<FormGroup className="input-row"><ControlLabel> 	 Description:	</ControlLabel><FormControl type="text" name="Gwo"   value={this.state.Gwo	}  readOnly />  </FormGroup> 
  </div></Col>

   <Col sm={3} ><div className="well">    
   
  <FormGroup className="input-row"><ControlLabel> 	 Received SW:	</ControlLabel><FormControl type="text" name="iwo"   value={this.state.iwo	}  readOnly  />  </FormGroup> 
  </div></Col>
  </Row>
   
   
 
<Row> <Col  sm={11} >  <div className="profile-line2"><p>Inspection</p> </div></Col>  </Row>
  <Row>
  <Col sm={2} >	   <div className="well">
 <FormGroup className="input-row"><ControlLabel> 	 Lot Size:	</ControlLabel><FormControl type="number" name="owo"   value={this.state.owo	} readOnly  />  </FormGroup> 
  <FormGroup  className="input-row"><ControlLabel> 	 Sample Size:	</ControlLabel><FormControl type="number" name="pwo"   value={this.state.pwo	} readOnly  />  </FormGroup> 
 </div></Col>

 <Col sm={2} >	   <div className="well">
<FormGroup className="input-row"><ControlLabel> 	 Qty Defective:	</ControlLabel><FormControl type="number" name="qwo"   value={this.state.qwo	} readOnly  />  </FormGroup> 
    <FormGroup className="input-row"><ControlLabel> 	 Qty Rejected:	</ControlLabel><FormControl type="number" name="rwo"   value={this.state.rwo	} readOnly  />  </FormGroup> 
 </div></Col>
     <Col sm={2} >	   <div className="well">
<FormGroup className="input-row"><ControlLabel> 	 Pass / Fail:	</ControlLabel><FormControl type="text" name="two"   value={this.state.two	}  readOnly    />  </FormGroup> 
<FormGroup className="input-row"><ControlLabel> 	 DMR #:	</ControlLabel><FormControl type="text" name="swo"   value={this.state.swo	}  readOnly  />  </FormGroup> 
</div></Col>

  <Col sm={5} > 
 <FormGroup className="input-row"><ControlLabel > Comment:</ControlLabel> 
  <textarea rows="3" type="textarea"  className="input-rowC" name="record"   value={this.state.record	}  readOnly   /> 
  </FormGroup> 
   </Col>
  </Row>

 <Row> 
<Col sm={6} >
<FormGroup className="input-row"><ControlLabel> 	Photo 1:	</ControlLabel><FormControl type="text"  name="lwo"    placeholder={this.state.lwo	} readOnly  />   </FormGroup>  

  <div style={{width: 400, height: 'auto'}}>     
         <RIphoto2 img_url= {myLink } />  
            </div>
   
   </Col>
 <Col sm={5} >
<FormGroup className="input-row"><ControlLabel> 	Photo 2:	</ControlLabel><FormControl type="text" name="uwo"   placeholder={this.state.uwo	} readOnly />  </FormGroup> 
 <div style={{width: 400, height: 'auto'}}>       
         <RIphoto2 img_url= {myLink2 } />  
            </div>
   
   </Col> 
</Row>  
    
      
  </Grid>   
        
        
      </div>
    );
  }
}

module.exports = RIview;

