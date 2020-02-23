const React = require('react');
const Link = require('react-router-dom').Link
// react-bootstrap
const {Col, Grid, Row, Button, Glyphicon , OverlayTrigger} = require('react-bootstrap');
// style 
const style = require('../styles/RIlistItem');
/* component for displaying one line of list  */
class RIlistItemAll extends React.Component {
 
  constructor(props) {
    super(props);  
    let jwo2;
     let jwo=this.props.jwo;//Date Inspected:
    if(jwo == null){jwo2=""}else{jwo2= jwo.slice(0,-14)};
   
    this.state = {
      //img_url: this.props.img_url,
      inspector: this.props.inspector,
       reportID: this.props.reportnumber,
      fwo: this.props.fwo,
      Gwo: this.props.Gwo,
       jwo: jwo2, //this.props.jwo.slice(0,-14), //Date Inspected:
      two: this.props.two, //Pass / Fail:
       owo: this.props.owo,
      record: this.props.record,
      lwo: this.props.lwo
      
      /*,
      tooltip:
    <Popover id="popover" title="some info">
           <div> P/N:  { fwo} </div>        
           <div> Description: { Gwo}  </div>
        <div> Date Inspected: { jwo}  </div>
        <div> Pass / Fail: { two}  </div>
        <div> Lot Size: { owo}  </div>
</Popover>*/
            }
        }

   componentWillMount() {
    //get   supplier and pn of user by nickname
    //let that = this;
    //  const xhr = new XMLHttpRequest();
     
  }
  /***********************/
  render() {
    const {report, showDelete, showDelete2} = this.props;
    return(
      <div>
     <div className="table-row-line"> </div>
      
        <Row > 
        <Col  sm={1} >{this.state.reportID} </Col>       
       <Col sm={1} > {this.state.inspector}</Col>
       <Col sm={1} > {this.state.fwo}</Col>
       <Col  sm={1} > {this.state.Gwo}</Col>
        <Col  sm={1} > {this.state.jwo}</Col>
        <Col  sm={1} > {this.state.two}</Col>
        <Col  sm={1} > {this.state.owo}</Col>
        <Col  sm={3} > {this.state.record}</Col>
        <Col  sm={1} > <Link to={'report-view/' + this.state.reportID  }>  <Button bsSize="xsmall" ><Glyphicon glyph="eye-open"/> </Button></Link> </Col>
        
              
        </Row>
       
      </div>
    );
  }
}
module.exports = RIlistItemAll ;


   {/* 
<div className="book-all">
     <img src={this.state.img_url} alt="book pic" className="img-all"/>*/}
/* 

        <div className="bookname-all">{this.state.reportID}</div>
        <div className="exchange-btn-all" onClick={() => this.props.showModal(this.props.reportID, this.props.inspector)}>ListItem</div>
         <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={this.state.tooltip}
          >
              <div className="nickname-all">Inspector: {this.state.inspector}</div>
             
          </OverlayTrigger>
      </div>


<tr>
        <td className="input-row">#{this.state.reportID}</td>
        <td className="input-row">{this.state.fwo}</td>
        <td className="input-row">{this.state.Gwo}</td>
        <td className="input-row">{this.state.jwo}</td>
        <td className="input-row">{this.state.two}</td>
        <td className="input-row">{this.state.owo}</td>
        <td className="input-row">
         <Link to={'report-edit/' + this.state.reportID}>
            <Button bsSize="xsmall" >Edit <Glyphicon glyph="edit"/> </Button></Link>
        </td>
        <td className="input-row">
          <Button bsSize="xsmall" className="report-delete" onClick={() => showDelete(report)}>
            Delete <Glyphicon glyph="remove-circle"/>
          </Button>
        </td>
      </tr>    
        

*/