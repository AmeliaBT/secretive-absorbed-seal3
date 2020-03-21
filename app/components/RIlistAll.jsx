// Table View  (no Filter);  Monthly stst ; All can view only
/*
Month-Year
LotT
LotA
LAR%
LotQty
QtyT
%Def

*/
const React = require('react');
const Link = require('react-router-dom').Link
// style for list
const style = require('../styles/HomePage');
// react-bootstrap
const {Table , Grid, Row, Col, Modal} = require('react-bootstrap');
// other components and etc
const Header = require('./Header');

const RIlistItemAll = require('./RIlistItemAll');

class RIlistAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, 
      disabled: true,
       reports: "loading..." 
    };
    
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);  
  }
   /***********************/
   // handlers
   /***********************/
  handleShowModal() {
    // show Modal
    this.handleShow();    
  }
  /***********************/  
 
  /***********************/
   handleClose() {
    this.setState({ show: false });
  }
  /***********************/
  handleShow() {
     this.setState({
          ["disabled"]: true
           });
    this.setState({ show: true });
  }
   /***********************/
  componentWillMount() {
            
        });
  
  Array.prototype.unique = function () {
  return [...new Set(this)]
}
  uniqueYM = arrayOfRIs3.unique();
  arrLotYM=[["Y-M", "LAR"]]; //[Y-M , LAR (sum of lot  PASS/all lots)
        
//==========================================   
 for(let i=1; i< uniqueYM.length; i++){ 
    let lotN=0; //number of lots
    let lotA=0; //number of lots PASS
   for(let j=0; j< arrayOfRIsPF.length; j++ ){
            let ym= arrayOfRIsPF[j][0];            
          if(ym === uniqueYM[i] ) {
            lotN= lotN+1;
            if(arrayOfRIsPF[j][1] === "Pass" ){ lotA =lotA+1;}           
          }
   }
    arrLotYM.push([new Date(uniqueYM[i]), lotA/lotN*100 ]) ;
 }
            that.setState({
           ["reports"]: {reports},
            "arrayOfRIs1" : arrayOfRIs1,
             "arrayOfRIs2" : arrayOfRIs2,
             "arrLotYM":arrLotYM,
            showTableHead:false
          
           });
       
   }
}
   
  render() {
    return (
      <div>
        <Header/> 
  <br/>
  <Table >  
    {this.state.showTableHead && <TableHead />}
    {this.state.reportsT}
  </Table>     
         <Modal show={this.state.show} onHide={this.handleClose}>  </Modal>
  
    </div>

      </div>
    );
  }
};

module.exports = RIlistAll;

/* 

render() {
    return (
      <div>
        <Header/> 
  
    <div   >    
<Table className="myForm">                   
            <Row>
             <Col sm={1}> <b>RI </b>  </Col> 
                <Col sm={1} ><b> Inspector</b> </Col> 
                <Col sm={1} ><b> Part Number </b></Col> 
                <Col sm={2} ><b>Description </b></Col> 
               <Col  sm={1} ><b> Date Inspected</b> </Col> 
              <Col  sm={1} ><b>Pass /Fail </b> </Col> 
               <Col sm={1} > <b>Lot Size </b> </Col> 
              <Col sm={3} > <b>Comment</b> </Col> 
               <Col sm={1} > <b>View </b> </Col> 
           </Row>        
        {this.state.reports}
  </Table>  
         <Modal show={this.state.show} onHide={this.handleClose}>  </Modal>
  
    </div>

      </div>
    );
  }
};



*/