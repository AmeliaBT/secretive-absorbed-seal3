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
const RIlistItemAll = require('./RIlistItemMonth');

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
        
         let reports = response.reports.map((el) => {
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
           arrayOfRIsPF.push([myDate2, "Fail"]);
           }else{ arrayOfRIsPF.push([myDate2, pass_fail]);}   
              
              
            }
           
           
           
        // end new
           
          return <RIlistItemMonth
          key={el.reportID}
          reportnumber={el.reportID}  
              
            /> 
        });
        
        //new2
  uniqueYM = arrayOfRIs3.unique();
  arrLotYM=[["Y-M", "LAR"]]; //[Y-M , LAR (sum of lot  PASS/all lots)
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
       
       return <RIlistItemMonth
          month_year={new Date(uniqueYM[i])}
          lar={lotA/lotN*100}               
            /> 
 }   
        
        
        //end of new 2
        
 // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!           
        
           that.setState({
          ["reports"]: <div className="reports">
                      {reports}     
                    </div>
           });
       }
    
  }
  //https://react-bootstrap.github.io/components/table/
  render() {
    return (
      <div>
        <Header/> 
    
               
              
      {/* 
       < FilterA />   */}   
      



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

module.exports = RIlistAll;