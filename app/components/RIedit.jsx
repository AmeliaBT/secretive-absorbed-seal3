
const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router-dom').Link
const Header = require('./Header');
// react-bootstrap
const {Grid, Row, Col, FormControl, ControlLabel, FormGroup, HelpBlock, Tabs, Tab, Form, Button} = require('react-bootstrap');

class RIedit extends React.Component {
  constructor(props) {   
    super(props);
this.state = {
  _id:"",
  reportID:"",
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
      this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

   /****************************/
  // Handlers
  /****************************/
  /*;
  */
  
  handleSubmit(event){
    alert("hi")
  }
   handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value  });
  };
   /**/
  customValidateText(text) {
      return (text.length > 0 && text.length < 17);
    }
  /****************************/
  
  componentWillMount() {
     // get report data
      let that = this;
      const xhr = new XMLHttpRequest();
      let repPath= this.props.location.pathname;
    let pageID=  repPath.substring(13); // report-edit/6032 12 pageID: /6031
//alert("pageID: " +pageID); 
   xhr.open('POST',"/report-edit" , true); 
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
     // if(response.isLogedIn == true) {
             that.setState({
                ["_id"]: response._id,
            ["reportID"]: response.reportID,
             ["inspector"]  : response.inspector ,
              ["daterec"]  : response.daterec ,  
                 ["Gwo"]: response.Gwo,
                 ["cwo"]  : response.cwo ,    
                 ["dwo"]  : response.dwo ,    
                 ["ewo"]  : response.ewo ,    
            ["fwo"]: response.fwo,
           ["hwo"]  : response.hwo ,   
                ["iwo"]  : response.iwo ,   
             ["jwo"]: response.jwo,
                ["kwo"]  : response.kwo ,   
                ["lwo"]  : response.lwo ,   
                ["mwo"]  : response.mwo ,   
                ["nwo"]  : response.nwo , 
               ["owo"]: response.owo,
                ["pwo"]  : response.pwo ,  
                ["qwo"]  : response.qwo,  
                ["rwo"]  : response.rwo ,  
                ["swo"]  : response.swo ,  
                ["two"]: response.two,
                ["record"]  : response.record ,   
                ["uwo"]  : response.uwo   
           });     
        }
  }

  
  render() {
  
    
    return (
      <div >
     <Header/>  
   <p> doc id:  {this.state._id}  </p>
  <Form  method="post" action="/set-report" onSubmit={this.handleSubmit} enctype="multipart/form-data" >       

    <Grid>  
   <Row>  <Col smOffset={7}  sm={4} > 
      <FormGroup > 
     <Button className="btn btn-primary btn-block" type="submit"><i className="fa fa-paper-plane"></i> Submit</Button>
      </FormGroup>
</Col></Row>      
      <Row >
<Col sm={3} >	 <div className="well">   
 <FormGroup className="input-row"><ControlLabel>Inspector:</ControlLabel> <FormControl   readOnly type="text" name="inspector" value={this.state.inspector	} placeholder={this.state.inspector	 }  /> </FormGroup>    

  <FormGroup className="input-row"><ControlLabel>Supplier:</ControlLabel>    <FormControl  className="input-row" type="text" name="ewo" value={this.state.ewo}   onChange={this.handleChangeValue} />  </FormGroup>  
 
  </div></Col> 
  <Col sm={2} >	 <div className="well">    
   <FormGroup ><ControlLabel>WO / PO / MTT:</ControlLabel> <FormControl   className="input-row3" type="text" name="dwo"  value={this.state.dwo}   onChange={this.handleChangeValue}  />      </FormGroup> 
   <FormGroup className="input-row"><ControlLabel> 	 NO:</ControlLabel> <FormControl type="text" name="kwo"       value={this.state.kwo	} placeholder={this.state.kwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </div></Col>
        <Col sm={3} >	<div className="well"> 
  <FormGroup className="input-row"><ControlLabel>Date Received:	</ControlLabel> <FormControl type="date" name="cwo"      value={this.state.cwo	} placeholder={this.state.cwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  <FormGroup className="input-row"><ControlLabel> Date Inspected: </ControlLabel><FormControl type="date" name="jwo"   value={this.state.jwo	} placeholder={this.state.jwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>
<Col sm={3} >	<div className="well"> 
<FormGroup ><ControlLabel>Source:</ControlLabel> 
  <FormControl  className="input-row3" type="text" name="mwo" value={this.state.mwo}  onChange={this.handleChangeValue} />  </FormGroup> 
<FormGroup ><ControlLabel>Destination:</ControlLabel> <FormControl  className="input-row3" type="text" name="nwo" value={this.state.nwo}  onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>
  </Row>
 <Row> <Col  sm={11} >  <div className="profile-line"></div></Col>  </Row>   
   <Row>
     

<Col sm={4} ><div className="well">   
<FormGroup className="input-row"><ControlLabel> 	 P/N:	</ControlLabel><FormControl type="text" name="fwo"   value={this.state.fwo	} placeholder={this.state.fwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>
<Col sm={4} ><div className="well">   
<FormGroup className="input-row"><ControlLabel> 	 Description:	</ControlLabel><FormControl type="text" name="Gwo"   value={this.state.Gwo	} placeholder={this.state.Gwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>

   <Col sm={3} ><div className="well">    
   
  <FormGroup className="input-row"><ControlLabel> 	 Received SW:	</ControlLabel><FormControl type="text" name="iwo"   value={this.state.iwo	} placeholder={this.state.iwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>
  </Row>
   
   
 <Row> <Col  sm={11} >  <div className="profile-line"></div></Col>  </Row>

  <Row>
  <Col sm={2} >	   <div className="well">
 <FormGroup className="input-row"><ControlLabel> 	 Lot Size:	</ControlLabel><FormControl type="number" name="owo"   value={this.state.owo	} placeholder={this.state.owo	} onChange={this.handleChangeValue} />  </FormGroup> 
  <FormGroup  className="input-row"><ControlLabel> 	 Sample Size:	</ControlLabel><FormControl type="number" name="pwo"   value={this.state.pwo	} placeholder={this.state.pwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </div></Col>

 <Col sm={2} >	   <div className="well">
<FormGroup className="input-row"><ControlLabel> 	 Qty Defective:	</ControlLabel><FormControl type="number" name="qwo"   value={this.state.qwo	} placeholder={this.state.qwo	} onChange={this.handleChangeValuePF} />  </FormGroup> 
    <FormGroup className="input-row"><ControlLabel> 	 Qty Rejected:	</ControlLabel><FormControl type="number" name="rwo"   value={this.state.rwo	} placeholder={this.state.rwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </div></Col>
     <Col sm={2} >	   <div className="well">
<FormGroup className="input-row"><ControlLabel> 	 Pass / Fail:	</ControlLabel><FormControl type="text" name="two"   value={this.state.two	} placeholder={this.state.two	} onChange={this.handleChangeValue}   />  </FormGroup> 
<FormGroup className="input-row"><ControlLabel> 	 DMR #:	</ControlLabel><FormControl type="text" name="swo"   value={this.state.swo	} placeholder={this.state.swo	} onChange={this.handleChangeValue} />  </FormGroup> 
</div></Col>

  <Col sm={5} > 
 <FormGroup className="input-row"><ControlLabel > Comment:</ControlLabel> 
  <textarea rows="3" type="textarea"  className="input-rowC" name="record"   value={this.state.record	} placeholder={this.state.record	} onChange={this.handleChangeValue}  /> 
  </FormGroup> 
   </Col>
  </Row>
 <Row> <Col  sm={11} >  <div className="profile-line"></div></Col>  </Row>
 <Row> 
<Col sm={6} >
<FormGroup className="input-row"><ControlLabel> 	Photo link	</ControlLabel><FormControl type="file"  name="lwo"    value={this.state.lwo }  placeholder={this.state.lwo	} onChange={this.handleChangeValue}  />   </FormGroup>  
</Col>
 <Col sm={5} >
<FormGroup className="input-row"><ControlLabel> 	Photo extra:	</ControlLabel><FormControl type="file" name="uwo"   value={this.state.uwo	} placeholder={this.state.uwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </Col> 
</Row>  
    
      
  </Grid>  
    </Form>  
  <br/>
   
   
    {/* 
        
  <Form  method="post" action="/addRIreport" onSubmit={this.handleSubmit} enctype="multipart/form-data" >       
 <Grid>  

   <Row>  <Col smOffset={7}  sm={4} > 
      <FormGroup > 
     <Button className="btn btn-primary btn-block" type="submit"><i className="fa fa-paper-plane"></i> Submit</Button>
      </FormGroup>
</Col></Row>
   
<Row >
<Col sm={3} >	 <div className="well">   
 <FormGroup className="input-row"><ControlLabel>Inspector:</ControlLabel> <FormControl   readOnly type="text" name="inspector" value={this.state.inspector	} placeholder={this.state.inspector	 }  /> </FormGroup>    

  <FormGroup className="input-row"><ControlLabel>Supplier:</ControlLabel>    <FormControl  className="input-row" type="text" name="ewo" value={this.state.ewo}   onChange={this.handleChangeValue} />  </FormGroup>  
 
  </div></Col>  
  <Col sm={2} >	 <div className="well">    
   <FormGroup ><ControlLabel>WO / PO / MTT:</ControlLabel>
   
     <FormControl 
      className="input-row3" type="text" name="dwo" 
       value={this.state.dwo} 
       onChange={this.handleChangeValue}> 
     </FormControl>  </FormGroup> 
    
  
  <FormGroup className="input-row"><ControlLabel> 	 NO:</ControlLabel> <FormControl type="text" name="kwo"       value={this.state.kwo	} placeholder={this.state.kwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </div></Col>
 ----------------------------------------
<Col sm={3} >	<div className="well"> 
  <FormGroup className="input-row"><ControlLabel>Date Received:	</ControlLabel> <FormControl type="date" name="cwo"      value={this.state.cwo	} placeholder={this.state.cwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  <FormGroup className="input-row"><ControlLabel> Date Inspected: </ControlLabel><FormControl type="date" name="jwo"   value={this.state.jwo	} placeholder={this.state.jwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>
<Col sm={3} >	<div className="well"> 
<FormGroup ><ControlLabel>Source:</ControlLabel> 
  <FormControl  className="input-row3" type="text" name="mwo" value={this.state.mwo}  onChange={this.handleChangeValue}>  </FormControl> </FormGroup> 
<FormGroup ><ControlLabel>Destination:</ControlLabel> <FormControl  className="input-row3" type="text" name="nwo" value={this.state.nwo}  onChange={this.handleChangeValue}> </FormControl> </FormGroup> 
  </div></Col>
  </Row>
 <Row> <Col  sm={11} >  <div className="profile-line"></div></Col>  </Row>   
   <Row>
     

<Col sm={4} ><div className="well">   
<FormGroup className="input-row"><ControlLabel> 	 P/N:	</ControlLabel><FormControl type="text" name="fwo"   value={this.state.fwo	} placeholder={this.state.fwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>
<Col sm={4} ><div className="well">   
<FormGroup className="input-row"><ControlLabel> 	 Description:	</ControlLabel><FormControl type="text" name="Gwo"   value={this.state.Gwo	} placeholder={this.state.Gwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>

   <Col sm={3} ><div className="well">    
   
  <FormGroup className="input-row"><ControlLabel> 	 Received SW:	</ControlLabel><FormControl type="text" name="iwo"   value={this.state.iwo	} placeholder={this.state.iwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>
  </Row>
   
   
 <Row> <Col  sm={11} >  <div className="profile-line"></div></Col>  </Row>

  <Row>
  <Col sm={2} >	   <div className="well">
 <FormGroup className="input-row"><ControlLabel> 	 Lot Size:	</ControlLabel><FormControl type="number" name="owo"   value={this.state.owo	} placeholder={this.state.owo	} onChange={this.handleChangeValue} />  </FormGroup> 
  <FormGroup  className="input-row"><ControlLabel> 	 Sample Size:	</ControlLabel><FormControl type="number" name="pwo"   value={this.state.pwo	} placeholder={this.state.pwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </div></Col>

 <Col sm={2} >	   <div className="well">
<FormGroup className="input-row"><ControlLabel> 	 Qty Defective:	</ControlLabel><FormControl type="number" name="qwo"   value={this.state.qwo	} placeholder={this.state.qwo	} onChange={this.handleChangeValuePF} />  </FormGroup> 
    <FormGroup className="input-row"><ControlLabel> 	 Qty Rejected:	</ControlLabel><FormControl type="number" name="rwo"   value={this.state.rwo	} placeholder={this.state.rwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </div></Col>
     <Col sm={2} >	   <div className="well">
<FormGroup className="input-row"><ControlLabel> 	 Pass / Fail:	</ControlLabel><FormControl type="text" name="two"   value={this.state.two	} placeholder={this.state.two	} onChange={this.handleChangeValue}   />  </FormGroup> 
<FormGroup className="input-row"><ControlLabel> 	 DMR #:	</ControlLabel><FormControl type="text" name="swo"   value={this.state.swo	} placeholder={this.state.swo	} onChange={this.handleChangeValue} />  </FormGroup> 
</div></Col>

  <Col sm={5} > 
 <FormGroup className="input-row"><ControlLabel > Comment:</ControlLabel> 
  <textarea rows="3" type="textarea"  className="input-rowC" name="record"   value={this.state.record	} placeholder={this.state.record	} onChange={this.handleChangeValue}  /> 
  </FormGroup> 
   </Col>
  </Row>
 <Row> <Col  sm={11} >  <div className="profile-line"></div></Col>  </Row>
 <Row> 
<Col sm={6} >
<FormGroup className="input-row"><ControlLabel> 	Photo link	</ControlLabel><FormControl type="file"  name="lwo"    value={this.state.lwo }  placeholder={this.state.lwo	} onChange={this.handleChangeValue}  />   </FormGroup>  
</Col>
 <Col sm={5} >
<FormGroup className="input-row"><ControlLabel> 	Photo extra:	</ControlLabel><FormControl type="file" name="uwo"   value={this.state.uwo	} placeholder={this.state.uwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </Col> 
</Row>  
   
  </Grid>     
   </Form>  
        <Col  sm={5} >	
  <FormGroup className="input-row"><ControlLabel > 	 PN:	</ControlLabel><FormControl type="text" name="fwo"   value={this.state.fwo	} placeholder={this.state.fwo	} onChange={this.fwoChanged} />  </FormGroup> 
  <FormGroup className="input-row" ><ControlLabel > 	Description :	</ControlLabel><FormControl type="text" name="Gwo"   value={this.state.Gwo	} placeholder={this.state.Gwo	} onChange={this.GwoChanged} />  </FormGroup> 
  <FormGroup className="input-row" ><ControlLabel> 	 Date:	</ControlLabel><FormControl type="text" name="jwo"   value={this.state.jwo	} placeholder={this.state.jwo	} onChange={this.jwoChanged} />  </FormGroup> 
  <div className="profile-line"></div>
        </Col> 
        <br/>
   
   
   
        */}   
        
        
      </div>
    );
  }

 

}



module.exports = RIedit;

