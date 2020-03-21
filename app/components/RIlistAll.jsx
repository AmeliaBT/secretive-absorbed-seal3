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
        
         let reports = response.reports.map((el) => {          
          if(el.cwo !== ""){
          let myDate= new Date(el.cwo.substring(0,10));
           // myDate.format("YYYY/mmm");
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
        return     
        });
        //for the table   
 
       // that.setState( {showTableHead:true});
      reportsT = response.map((el) => {          
          return <RIlistItemMonth 
            key={el.reportID}
           reportnumber={el.reportID}  
           inspector={el.inspector}
             fwo={el.fwo}     
           Gwo={el.Gwo}
           jwo={el.jwo}
           two={el.two}
           owo={el.owo}
           record={el.record}
           lwo ={el.lwo}       
            /> 
        });
   
         
      }       
  
  Array.prototype.unique = function () {
  return [...new Set(this)]
}
  uniqueYM = arrayOfRIs3.unique();
  arrLotYM=[["Y-M", "LAR"]]; //[Y-M , LAR (sum of lot  PASS/all lots)
        
//==========================================   
 for(let i=1; i< uniqueYM.length; i++){ 
    let lotT=0; //number of lots
    let lotA=0; //number of lots PASS
   for(let j=0; j< arrayOfRIsPF.length; j++ ){
            let ym= arrayOfRIsPF[j][0];            
          if(ym === uniqueYM[i] ) {
            lotT= lotT+1;
            if(arrayOfRIsPF[j][1] === "Pass" ){ lotT =lotA+1;}           
          }
   }
    arrLotYM.push([new Date(uniqueYM[i]), lotA/lotT*100 ]) ;
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

      
    );
  }
};

module.exports = RIlistAll;

/* 





*/