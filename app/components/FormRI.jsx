const React = require('react');
const Link = require('react-router-dom').Link
// style for BOOKS
const style = require('../styles/FormRI');
// other components and etc
const Header = require('./Header');
//const CreatableSelect= require('react-select');
//const { Creatable }= require('react-select');

// react-bootstrap
const {ResponsiveEmbed, Image, InputGroup, option, Form, FormGroup, Col, FormControl, Button, Grid, Row, ControlLabel} = require('react-bootstrap');

const mySel = [
  { id: 1, selname: "WO" },
  { id: 2, selname: "PO" },
  { id: 3, selname: "Other" },
   { id: 4, selname: "" }
];
const mySelT = [
  { id: 1, selname: "Pass" },
  { id: 2, selname: "Fail" } 
];
//supplier name

const mySelE = [
  { id: 1, selname: "ATDG" },
  { id: 2, selname: "CAMEO" } ,
  { id: 3, selname: "" } 
];


  //Source
const mySelM = [
  { id: 1, selname: "FACTORY" },
  { id: 2, selname: "FAS" } ,
   { id: 3, selname: "TFGI" },
  { id: 4, selname: "OOBA" },
  { id: 5, selname: "OEM" },
  { id: 6, selname: "PR" } ,
  { id: 7, selname: "RCF" },
  { id: 8, selname: "RMA" },
  { id: 9, selname: "SR" } ,
    { id: 10, selname: "" }
];

  //destination
const mySelN = [
  { id: 1, selname: "FGI" },
  { id: 2, selname: "FAS" } ,
   { id: 3, selname: "EST" },
  { id: 4, selname: "RCF" },
  { id: 5, selname: "ENG" },
  { id: 6, selname: "Other" } ,
    { id: 7, selname: "" }
];


let options = mySel.map((el) => {
          return <option value={el.selname} key={el.selname}>{el.selname}</option>;
        });
let optionsE = mySelE.map((el) => {
          return <option value={el.selname} key={el.selname}>{el.selname}</option>;
        });
      
let optionsM = mySelM.map((el) => {
          return <option value={el.selname} key={el.selname}>{el.selname}</option>;
        });
     
let optionsN = mySelN.map((el) => {
          return <option value={el.selname} key={el.selname}>{el.selname}</option>;
        });
//const renderOptions = (options) => {return options.map((i) => {return <option key={i.name} name={i.name} value={i.value}>{i.value}</option>;  }); };
 let optionsDate = {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "numeric"
    };
/* the rep page that shows all reps */
class FormRI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportID:"",
      inspector: "",  // Inspector:
      daterec: "",  //Date Received
      Gwo: "",  // Description:      
      cwo: new Date().toLocaleDateString("en", optionsDate),  // Date Received:  .format("DD/MM/YYYY")    toLocaleDateString() toLocaleString() toLocaleDateString("en", options)
      dwo: "",  // WO / PO / MTT: mySel, //      
      ewo: "",  // Supplier:
      fwo: "",  // P/N:
      hwo: "",  // Documentation Revision:     
      iwo: "",  // Received SW:
      jwo: new Date().toLocaleDateString("en", optionsDate),  // Date Inspected:
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
      uwo: ""  // old extra; new file -photo "https://static.pexels.com/photos/807598/pexels-photo-807598.jpeg"

    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
     this.handleChangeValueImg = this.handleChangeValueImg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.handleChangeValuePF= this.handleChangeValuePF.bind(this);
    
    
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
     
       if(response.isLogedIn == true) {
       //  console.log(" loged in ok");
          that.setState({
        ["inspname"]: response.inspname,
         ["inspector"]: response.inspname,
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
  };
 handleChangeValuePF(event) {
   //qwo
     const target = event.target;
      const value = target.value;
      const name = target.name;
  
    if(value > 0 ) {    
      this.setState({ two: "Fail", qwo: value })}else{
        this.setState({two: "Pass", qwo: value })}   
  };
  handleChangeValueImg(event) {
     const target = event.target;
      const value = target.value;
      const name = target.name;    
    //replace C:/fakepath/ with
    //       http://10.4.5.6/Intranet/data/QualityAssurance/QC-Reports/RI_Photos/
    //str.substring(2)
 let   value2=value.substring(12) ;    
  let  value3="http://10.4.5.6/Intranet/data/QualityAssurance/QC-Reports/RI_Photos/" + value2;   
      this.setState({ [name]: value3  });
  };
    
  handleSubmit(event) { let that = this; 
   // console.log(that)
      const xhr = new XMLHttpRequest();      
      xhr.open('POST', '/add-report', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    let body =   
'reportID='   + encodeURIComponent(this.state.reportID)+
'&inspector='   + encodeURIComponent(this.state.inspector)+
'&daterec='   + encodeURIComponent(this.state.cwo)+
'&Gwo='   + encodeURIComponent(this.state.Gwo)+
'&cwo='   + encodeURIComponent(this.state.cwo)+
'&dwo='   + encodeURIComponent(this.state.dwo)+
'&ewo='   + encodeURIComponent(this.state.ewo)+
'&fwo='   + encodeURIComponent(this.state.fwo)+
'&hwo='   + encodeURIComponent(this.state.hwo)+

'&iwo='   + encodeURIComponent(this.state.iwo)+
'&jwo='   + encodeURIComponent(this.state.jwo)+
'&kwo='   + encodeURIComponent(this.state.kwo)+ 
'&lwo='   + encodeURIComponent(this.state.lwo)+
'&mwo='   + encodeURIComponent(this.state.mwo)+
'&nwo='   + encodeURIComponent(this.state.nwo)+
'&owo='   + encodeURIComponent(this.state.owo)+
'&pwo='   + encodeURIComponent(this.state.pwo)+
'&qwo='   + encodeURIComponent(this.state.qwo)+
'&rwo='   + encodeURIComponent(this.state.rwo)+
'&swo='   + encodeURIComponent(this.state.swo)+
'&two='   + encodeURIComponent(this.state.two)+
'&uwo='   + encodeURIComponent(this.state.uwo)+ 
'&record='   + encodeURIComponent(this.state.record) 
;
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
          ["ewo"]: "Succsess",
        //  ["fwo"]: "Succsess"
           });
        }
        else {
          that.setState({
          ["ewo"]: "Error "
           });
         }
        }
      event.preventDefault();
     }
  render() {
    return (
      <div >        
<Form  method="post" action="/addRIreport" onSubmit={this.handleSubmit} encType="multipart/form-data" >       
 <Grid>  
   {/* 
<FormGroup className="input-row" ><ControlLabel> 	 reportID:	</ControlLabel><FormControl type="text" name="reportID"   value={this.state.reportID	} placeholder={this.state.reportID	} onChange={this.handleChangeValue} />  </FormGroup> 
Submit RI form  
  <Row> <Col  sm={11} >  <div className="profile-line"></div></Col>  </Row>*/}
   <Row>  <Col smOffset={7}  sm={4} > 
      <FormGroup > 
     <Button className="btn btn-primary btn-block" type="submit"><i className="fa fa-paper-plane"></i> Submit</Button>
      </FormGroup>
</Col></Row>
   
<Row >
<Col sm={3} >	 <div className="well">   
 <FormGroup className="input-row"><ControlLabel>Inspector:</ControlLabel> <FormControl   readOnly type="text" name="inspector" value={this.state.inspector	} placeholder={this.state.inspector	 }  /> </FormGroup>    
 {/* <FormGroup ><ControlLabel>Supplier:</ControlLabel> <FormControl  className="input-row3" type="text" name="ewo" value={this.state.ewo} componentClass="select"  placeholder="select" onChange={this.handleSelectChangeE}> {optionsE} </FormControl> </FormGroup> 
   */}
  <FormGroup className="input-row"><ControlLabel>Supplier:</ControlLabel>    <FormControl  className="input-row" type="text" name="ewo" value={this.state.ewo}   onChange={this.handleChangeValue} />  </FormGroup>  
 
  </div></Col>  <Col sm={2} >	 <div className="well">    
   <FormGroup ><ControlLabel>WO / PO / MTT:</ControlLabel>
   
     <FormControl 
      className="input-row3" type="text" name="dwo" 
       value={this.state.dwo} componentClass="select"  placeholder="select" 
       onChange={this.handleChangeValue}> {options}  
     </FormControl>
        {/* 
     <FormControl 
      className="input-row3" type="text" name="dwo" 
       value={this.state.dwo} componentClass="select"  placeholder="select" 
       onChange={this.handleSelectChange}> {options} 
       onInputChange={this.handleChangeValue}
       isClearable
     </FormControl>     
          */} 
    
  </FormGroup> 
    
  
  <FormGroup className="input-row"><ControlLabel> 	 NO:</ControlLabel> <FormControl type="text" name="kwo"       value={this.state.kwo	} placeholder={this.state.kwo	} onChange={this.handleChangeValue} />  </FormGroup> 
 </div></Col>
<Col sm={3} >	<div className="well"> 
  <FormGroup className="input-row"><ControlLabel>Date Received:	</ControlLabel> <FormControl type="date" name="cwo"      value={this.state.cwo	} placeholder={this.state.cwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  <FormGroup className="input-row"><ControlLabel> Date Inspected: </ControlLabel><FormControl type="date" name="jwo"   value={this.state.jwo	} placeholder={this.state.jwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  </div></Col>
<Col sm={3} >	<div className="well"> 
<FormGroup ><ControlLabel>Source:</ControlLabel> 
  <FormControl  className="input-row3" type="text" name="mwo" value={this.state.mwo} componentClass="select"  placeholder="select"
    onChange={this.handleChangeValue}> {optionsM} </FormControl> </FormGroup> 
<FormGroup ><ControlLabel>Destination:</ControlLabel> <FormControl  className="input-row3" type="text" name="nwo" value={this.state.nwo} componentClass="select"  placeholder="select" onChange={this.handleChangeValue}> {optionsN} </FormControl> </FormGroup> 
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
{/* 
  <FormGroup className="input-row"><ControlLabel> 	 Documentation Revision:	</ControlLabel><FormControl type="text" name="hwo"   value={this.state.hwo	} placeholder={this.state.hwo	} onChange={this.handleChangeValue} />  </FormGroup> 
  */}     
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
<FormGroup className="input-row"><ControlLabel>Photo 1 (I:\QC-Reports\RI_Photos\) 	</ControlLabel><FormControl type="file"  name="lwo"     placeholder={this.state.lwo	} onChange={this.handleChangeValueImg}  />   </FormGroup>  
 <div style={{width: 400, height: 'auto'}}>
         
            <Image src={this.state.lwo } responsive />    
            </div>
   
   </Col>
 <Col sm={5} >
<FormGroup className="input-row"><ControlLabel> 	Photo 2	</ControlLabel>           <FormControl type="file" name="uwo"   placeholder={this.state.uwo	} onChange={this.handleChangeValueImg} />  </FormGroup> 

   <div style={{width: 330, height: 'auto'}}>         
            <Image src={this.state.uwo } responsive />    
            </div>
   
   </Col> 
</Row>  
     
  </Grid>     
   </Form>
   
        
        
        
  </div>
    );
  }
};

module.exports = FormRI;
/* 
  <Image src={"http://10.4.5.6/Intranet/data/QualityAssurance/QC-Reports/RI_Photos/" + this.state.lwo } responsive />   
<div style={{width: 660, height: 'auto'}}>
          <p> </p>
            <Image src={"https://static.pexels.com/photos/" + this.state.uwo + "/pexels-photo-" + this.state.uwo +".jpeg"	} responsive />    
            </div>

807598 
<ResponsiveEmbed a16by9>
                    <embed type="image/href+xml" href = "https://static.pexels.com/photos/296886/pexels-photo-296886.jpeg"/>
                </ResponsiveEmbed>
                
href = "https://drive.google.com/file/d/19Ol1VZu646JIQE20-iSmI5Wma0I1_a_2/view?usp=sharing"/>
            
 <embed type="image/href+xml" href = "https://static.pexels.com/photos/296886/pexels-photo-296886.jpeg"/>
             

   <InputGroup>
        <FormControl
          type="text"
          placeholder="Search..."
          onChange={this.handleChange.bind(this)}
        />
        <div className="search-icon">
          <i class="fas fa-search" />
        </div>
      </InputGroup>  
<FontAwesomeIcon icon="search" />

<FormGroup className="input-row"><ControlLabel> 	Photo 	</ControlLabel>
    
    <FormControl type="file"  name="uwo"  ref="imageInput" accept="image/png, image/jpeg" value={this.state.uwo }  onChange={ this.uploadFile }   />   </FormGroup>  
*/