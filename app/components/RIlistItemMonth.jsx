// component item for Table View  (with edits disabled)
const React = require('react');
const Link = require('react-router-dom').Link
// react-bootstrap
const {Col, Row, Button, Glyphicon , OverlayTrigger} = require('react-bootstrap');
// style 
const style = require('../styles/RIlistItem');
/* component for displaying one line of list  */
class RIlistItemMonth extends React.Component { 
  constructor(props) {   
    super(props);      
    this.state = {  
  month_year: this.props.month_year,
         lar: this.props.lar      
            }
        }
  render() {
    
    return(
      <div>      
     <div className="table-row-line">       
        <Row > 
        <Col  sm={2} >{this.state.month_year} </Col>       
       <Col sm={1} > {this.state.lar}</Col>
          
     {/* 
       <Col sm={1} > <p style={{fontSize: 12}}> {this.state.fwo} </p> </Col>     
       <Col  sm={2} > {this.state.Gwo}</Col>
        <Col  sm={1} > {this.state.jwo}</Col>
        <Col  sm={1}  ><p style={{fontWeight: 'bold', fontSize: 14}} className={this.state.pfColor}>  {this.state.two}</p></Col>
        <Col  sm={1} > {this.state.owo}</Col>
        <Col  sm={3} > {this.state.record}</Col>
        */} 
              
        </Row>
               </div>

      </div>
    );
  }
}
module.exports = RIlistItemMonth;
//const {report, showDelete, showDelete2} = this.props;
