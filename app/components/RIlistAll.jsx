// KPI  (no Filter);  Monthly stst ; All can view only
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
const RIlistItemMonth = require('./RIlistItemMonth');

let arrayOfRIs1= [  ["Date", "Lot Size"]];
let arrayOfRIs2= [  ["Date", "Qty Tested", "Qty Fail"]];
let arrayOfRIs3= ["Date"];
let uniqueYM;
let MyChartRI1;
let MyChartRI2;
let arrayOfYM;
let arrLotYM;
let arrayOfRIsPF=[];

class RIlistAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, 
      disabled: true,
       reportsM: "loading..." 
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
 /***********************/
  componentWillMount() {
    // load reports
      let that = this;
      let xhr = new XMLHttpRequest();  
 
      xhr.open('POST', '/get-all-users-reports', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
        
         let reportsX = response.reports.map((el) => {
         //new
            if(el.cwo !== ""){
          let myDate= new Date(el.cwo.substring(0,10));
          let myDate2= el.cwo.substring(0,4 ) +"-" +el.cwo.substring(5,7) ; 
           let myLot= el.owo; 
           let qtyTested= el.pwo; 
           let qtyFail= el.qwo; 
            let qtyRejected= el.rwo; 
           let pass_fail= el.two; 
            arrayOfRIs1.push([myDate, myLot ]) ;
            arrayOfRIs2.push([myDate,  qtyTested, qtyFail]) ; 
             // getting unique YYYY-MM
           arrayOfRIs3.push(myDate2 ) ;   
              
           if(pass_fail.length === null){
           arrayOfRIsPF.push([myDate2, "Fail", myLot,qtyTested, qtyFail]);
           }else{ arrayOfRIsPF.push([myDate2, pass_fail,myLot,qtyTested, qtyFail]);}               
            }
    
           return
        });
        
 //-------------------       
     
  Array.prototype.unique = function () {
  return [...new Set(this)]
}    
  uniqueYM = arrayOfRIs3.unique();
        uniqueYM.sort();
uniqueYM.reverse();
  let lotN;      
  arrLotYM=[]; //[Y-M , LAR (sum of lot  PASS/all lots)
 for(let i=1; i< uniqueYM.length; i++){ 
  
    let lotN=0; //number of lots
    let lotA=0; //number of lots PASS
   
    let lotQty=0;//sum of lot qty
    let QtyT=0 ; // sum of qty tested
    let Def = 0; //% Defective
    
   for(let j=0; j< arrayOfRIsPF.length; j++ ){
            let ym= arrayOfRIsPF[j][0];
          if(ym === uniqueYM[i] ) {
            lotN= lotN+1;
            lotQty=lotQty+arrayOfRIsPF[j][2];
            QtyT=QtyT+arrayOfRIsPF[j][3];
            Def=Def+arrayOfRIsPF[j][4];
            if(arrayOfRIsPF[j][1] === "Pass" ){ lotA =lotA+1;}           
          }           
   }
   
 //   arrLotYM.push([uniqueYM[i], lotN, lotA, lotA/lotN*100,lotQty, QtyT, Def, Def/QtyT*100,]) ;
   arrLotYM.push([uniqueYM[i], lotN, lotA, Math.round(lotA/lotN*100,2),lotQty, QtyT, Def, Math.round(Def/QtyT*100,2)]) ;
       // arrLotYM.push([uniqueYM[i], lotA/lotN*100 ]) ;
 }   
     
     
       
  let reportsM =arrLotYM.map((el) => {  
   return < RIlistItemMonth
          month_year={el[0]} 
               lotT={el[1]}
               lotA={el[2]}
                 lar={el[3]}
              lotQty={el[4]}
                qtyT={el[5]}
                 def={el[6]}
               defR={el[7]}
            /> 
        });   
        
           that.setState({
         ["reportsM"]: <div className="reports">  {reportsM}  </div>
             
           });
       }
    
  }

  render() {
    return (
      <div>
        <Header/> 
    <div> 
      
 <Row> <Col  xs={3}   smOffset={1}  >   <h4 >Key Performance Indicators  </h4>    
   </Col> </Row>  
<Row > 
   <Col xs={3}   ><div  className="well" >  
     <p ><br/>
     LotT -number of lots tested<br/>
LotA - number of lots accepted<br/>
LAR % - Lot Acceptance Rate  (LAR=LotA/LotT*100)<br/>
LotQty - sum of items in all lots<br/>
QtyT - number of items tested<br/>
QtyDef - number of items defective<br/>
%Def - % of items defective (%Def=QtyDef/QtyT*100)

     
     
     
     
     </p>
   </div> </Col>
  
  <Col xs={7} > <div   >        
<Table className="myForm">  
               
            <Row>             
              <Col sm={3} ><b> Year- Month</b> </Col> 
              <Col sm={1} ><b> Lot T </b></Col> 
              <Col sm={1} ><b> Lot A </b></Col> 
              <Col sm={1} ><b> LAR % </b></Col> 
              <Col sm={2} ><b> Lot Qty </b></Col> 
              <Col sm={2} ><b> Qty T </b></Col> 
              <Col sm={1} ><b> Qty Def </b></Col>
              <Col sm={1} ><b> % Def </b></Col> 
             
           </Row>
        {this.state.reportsM}
  
  </Table> 
    
         <Modal show={this.state.show} onHide={this.handleClose}>  </Modal>
     
    </div> </Col>
  
    <Col ></Col>
  </Row> 
          
    </div>
      </div>
    );
  }
};

module.exports = RIlistAll;
// <Col xs={5} > <div   >      
//<Col xs={4} ></Col>
/* 
<Col sm={3} ><b> Year- Month</b> </Col> 
              <Col sm={1} ><b> Lot T </b></Col> 
              <Col sm={1} ><b> Lot A </b></Col> 
              <Col sm={1} ><b> LAR % </b></Col> 
              <Col sm={2} ><b> Lot Qty </b></Col> 
              <Col sm={2} ><b> Qty T </b></Col> 
              <Col sm={1} ><b> Qty Def </b></Col>
              <Col sm={1} ><b> % Def </b></Col> 
*/