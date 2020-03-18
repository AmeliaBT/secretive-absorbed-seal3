//component item for Edit   (with edits enabled)
/* ootstrap's global default font-size is 14px, with a line-height of 1.428. This is applied to the <body> element and all paragraphs ( <p> ). In addition, all <p> elements have a bottom margin that equals half their computed line-height (10px by default).*/
const React = require('react');
const Link = require('react-router-dom').Link
// react-bootstrap
const {Col, Grid, Row, Button, Glyphicon } = require('react-bootstrap');

const style = require('../styles/RIlistItem');


/* component for displaying one line of list  */
class RIlistItem extends React.Component {
 
  constructor(props) {
    super(props); 
   // this.myRef = React.createRef();
    
   //  let  fwo=this.props.fwo; //P/N: 
    //let  Gwo=this.props.Gwo; //Description
     let jwo=this.props.jwo;//Date Inspected:
    let jwo2;     
    if(jwo == null ){jwo2=""}else{jwo2=jwo.slice(0,-14)};
    let pfColor;
    if(this.props.two === "Pass"){pfColor = "text-success font-size-small"}else{pfColor="text-danger font-size-small" }
   // let two=this.props.two; //Pass / Fail
   // let owo=this.props.owo; //Lot Size
   //    let record=this.props.record;
   //let lwo=this.props.lwo;

    this.state = {
          //img_url: this.props.img_url,
          inspector: this.props.inspector,
           reportID: this.props.reportnumber,
          fwo: this.props.fwo,
          Gwo: this.props.Gwo,           
           jwo: jwo2, //this.props.jwo.slice(0,-14),//Date Inspected:
          two: this.props.two, //Pass / Fail:
           owo: this.props.owo,
              record: this.props.record,
      lwo: this.props.lwo,
      pfColor: pfColor
                    }
    //this.handleOnClick = this.handleOnClick.bind(this);
        }

   handleOnClick() {
    // <RIedit PN={this.state.fwo} />   
  //    alert(this.state.reportID);
   //  alert("PN: " +this.state.inspector);
 //  alert("desc" + this.state.Gwo);   
  //  alert(this.state.reportID);
   }
  
   componentWillMount() {
    //get   supplier and pn of user by nickname
    let that = this;
    
  }
  
  
  /***********************/
  //<Link to={{ pathname: 'report-edit/' + this.state.reportID , state: { inspector: 'xyz'} }}>
  // in child const {xx} = props.location.state 
  render() {
  //  const {report, showDelete, showDelete2} = this.props;
     const {report, showDelete, showDelete2} = this.props;
    return(
       <div>
      <div className="table-row-line"> </div>
       
        <Row > 
        <Col  sm={1} >#{this.state.reportID} </Col>       
    <Col  sm={1} >#{this.state.inspector} </Col>   
     <Col sm={1} > {this.state.fwo}</Col>
       <Col  sm={2} > {this.state.Gwo}</Col>
        <Col  sm={1} > {this.state.jwo}</Col>
        <Col  sm={1} ><span className={this.state.pfColor}>  {this.state.two}</span></Col>
        <Col  sm={1} > {this.state.owo}</Col>
          <Col  sm={3} > {this.state.record}</Col>
        <Col  sm={1} >  <Link to={'report-edit/' + this.state.reportID  }>
            <Button bsSize="xsmall"  ><Glyphicon glyph="edit" /> </Button></Link> </Col>
       
              
        </Row>
        
      </div>
    );
  }
}


module.exports = RIlistItem ;

// className="spanGlyph mybtn-red" >
//