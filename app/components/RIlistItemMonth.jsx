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
     let pfColor;
    console.log(this.props.lar);
    if(this.props.lar < 100){pfColor = "text-danger"}else{pfColor="text-success" } 
    this.state = {  
          month_year: this.props.month_year,
     lotT: this.props.lotT,
     lotA: this.props.lotA,
          lar: this.props.lar,
      lotQty: this.props.lotQty,
      qtyT: this.props.qtyT,
     def: this.props.def ,
      defR:this.props.defR,
       pfColor: pfColor
    }
        }
  render() {    
    return(
      <div>      
      <div className="table-row-line"> <Row > 
        
         <Col  sm={3} >{this.state.month_year} </Col> 
         <Col sm={1} > {this.state.lotT}</Col>
         <Col sm={1} > {this.state.lotA}</Col>
        <Col sm={1} ><p style={{fontWeight: 'bold', fontSize: 14}} className={this.state.pfColor}> {this.state.lar} </p> </Col>
        
        <Col sm={2} > {this.state.lotQty}</Col>
         <Col sm={2} > {this.state.qtyT}</Col>
         <Col sm={1} > {this.state.def}</Col>
        <Col sm={1} > {this.state.defR}</Col>
        
        </Row> </div>
      </div>
    );
  }
}
module.exports = RIlistItemMonth;
//const {report, showDelete, showDelete2} = this.props;
     {/* 
     lotQty: this.props.lotQty
      qtyT: this.props.qtyT
     def: this.props.def
     
      month_year={el[0]} 
               lotT={el[1]}
               lotA={el[2]}
                 lar={el[3]}
              lotQty={el[4]}
                qtyT={el[5]}
                 def={el[6]}
     
      <Col  sm={2} >{this.state.month_year} </Col>       
       <Col sm={1} > {this.state.lar}</Col>
     
     lotT={el[1]}
                 lotA={el[2]}
                  lar={el[3]}
       <Col sm={1} > <p style={{fontSize: 12}}> {this.state.fwo} </p> </Col>     
       <Col  sm={2} > {this.state.Gwo}</Col>
        <Col  sm={1} > {this.state.jwo}</Col>
        <Col  sm={1}  ><p style={{fontWeight: 'bold', fontSize: 14}} className={this.state.pfColor}>  {this.state.two}</p></Col>
        <Col  sm={1} > {this.state.owo}</Col>
        <Col  sm={3} > {this.state.record}</Col>
        */} 
