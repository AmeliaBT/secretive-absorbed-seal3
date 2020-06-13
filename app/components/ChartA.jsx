// Charts
const React = require('react');
//const Link = require('react-router-dom').Link
//const style = require('../styles/HomePage');
const {Table ,Row, Col, Modal} = require('react-bootstrap');
const Header = require('./Header');
const FilterA =require('./FilterA');
const RIlistItemAll = require('./RIlistItemAll');
const  { Chart }= require('react-google-charts'); 
const TableHead =require('./TableHead');
   
let arrayOfRIs1= [  ["Date", "Lot Size"]];
let arrayOfRIs2= [  ["Date", "Qty Tested", "Qty Fail"]];
let arrayOfRIs3= ["Date"];
let uniqueYM;
//let MyChartRI1;
//let MyChartRI2;
//let arrayOfYM;
let arrLotYM;
let arrayOfRIsPF=[];
 
let optionsCh2 ={
        title: 'Lot Acceptance Rates Grouped by Month',
        timeline: { groupByRowLabel: true  },
        hAxis: { format: 'YYYY-MMM', title: "Year-Month Inspected" },
        vAxis: {  minValue: 0 ,title: "Rate %"}, 
  legend: "none"
      };
let optionsCh1 ={ 
  legend: {position: "top"},           
   hAxis: {title: "Date Inspected"},
   vAxis: {title: "Qty", minValue: 0 }   
  
};

let optionsCh3 ={    
   legend: {position: "top"},
    hAxis: { title: "Date Inspected"},
    vAxis: { title: "Qty",  minValue: 0}      
      };

/* the  page that shows all charts */
class ChartA extends React.Component {
  constructor(props) {
     
    super(props);
   
    this.state = {
      show: false, 
      disabled: true,
       reports: "loading..." ,
      res_len:"",
       riN:"",
      model: '', 
      pn: '' ,
      comment : '' ,
      sel_radio_a:"",
      supplier:'',
      source:'',
      destination:'',      
      sel_radio_b:"",
      sel_radio_c:"", //lot size
      sel_radio_d:"", // last12 , all 
      filterAB:"",
      modal_label: "Choose RI Reports to view",
      showTableHead:false,
      clearFilter:false      
    };
   
    this.handleParentData = this.handleParentData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);   

  }
   /***********************/
   // handlers
   /***********************/
   
 
    handleParentData(event) {
       let reportsT ;  
      let clearFilter=event.clearFilter;   
      let that = this;
      let xhr = new XMLHttpRequest();  
      xhr.open('POST', '/create-filtered-table2', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');    
        let body = 'Gwo=' + encodeURIComponent(event.model) +           
                  '&fwo=' + encodeURIComponent(event.pn) +
                  '&record=' + encodeURIComponent(event.comment) +
                  '&inspector=' + encodeURIComponent(event.sel_radio_a)+
                  '&ewo=' + encodeURIComponent(event.supplier) +
                  '&mwo=' + encodeURIComponent(event.source) +
                  '&nwo=' + encodeURIComponent(event.destination)+
                  '&two=' + encodeURIComponent(event.sel_radio_b)+
                  '&owo=' + encodeURIComponent(event.sel_radio_c)+ //lot size
             '&reportID=' + encodeURIComponent(event.riN)+
            '&cwo=' + encodeURIComponent(event.sel_radio_d)//last12 , all 
            ;
            
      xhr.send(body);
      xhr.onreadystatechange = function() {       
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
       let response = JSON.parse(this.responseText);
       let res_len=response.length;
         arrayOfRIs1=[  ["Date", "Lot Qty"]];
        arrayOfRIs2= [  ["Date", "Qty Tested", "Qty Fail"]];
       arrayOfRIs3= ["Date"];
        let reports = response.map((el) => { 
       if(el.cwo !== ""){
          let myDate= new Date(el.cwo.substring(0,10));
          let myDate2= el.cwo.substring(0,4 ) +"-" +el.cwo.substring(5,7) ; 
           let myLot= el.owo; 
           let qtyTested= el.pwo; 
           let qtyFail= el.qwo; 
          //  let qtyRejected= el.rwo; 
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
        if (clearFilter === false){
        that.setState( {showTableHead:true});
      reportsT = response.map((el) => {          
          return <RIlistItemAll  key={el.reportID}
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
      }else{reportsT = null;
          that.setState( {showTableHead:false}); }        
         Array.prototype.unique = function () {
  return [...new Set(this)]
}
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
 }
        
           that.setState({
             arrayOfRIs1:arrayOfRIs1,
              arrayOfRIs2:arrayOfRIs2,
              
               "arrLotYM":arrLotYM,
            res_len:res_len,
            model: event.model, 
            pn: event.pn ,           
            sel_radio_a: event.sel_radio_a ,
            sel_radio_b: event.sel_radio_b ,
             sel_radio_c: event.sel_radio_c ,
           comment :  event.comment,  
            supplier:event.supplier,
            source: event.source,
            destination: event.destination, 
//showTableHead:true,
            filterAB:'Showing ' + res_len +' results for ' 
             + event.riN
             + ' ' +event.model  
             + ' '  +event.pn  
             + ' ' + event.sel_radio_a  
              + ' '  +event.pn  
              + ' '  +event.comment  
              + ' '  +event.supplier
               + ' '  +event.source
               + ' '  +event.destination
              + ' ' + event.sel_radio_b 
              + ' ' + event.sel_radio_c  
               + ' ' + event.sel_radio_d  
             ,
          ["reports"]: <div className="reports"> {reports}  </div>,
              
                ["reportsT"]: <div className="reports"> {reportsT}  </div> 
           });
       }
    
  }

 
  handleShowModal() {
    // show Modal
    this.handleShow();    
  }
  
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
           arrayOfRIs3.push(myDate2 ) ; //ok 
           
           if(pass_fail.length === null){
           arrayOfRIsPF.push([myDate2, "Fail"]);
           }else{ arrayOfRIsPF.push([myDate2, pass_fail]);}
                    
      }            
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
  
 <Row> <Col  xs={10}   smOffset={1}  >   <p className="filter_msg">{this.state.filterAB}   </p>    
   </Col> </Row>     
<Row > 
   <Col xs={2} ><div  className="well" >  
      < FilterA handleData ={this.handleParentData} /> 
     <br/>
   </div> </Col>
  <Col xs={10} > <div   >  
    <Chart
      chartType="ColumnChart"  
      data={this.state.arrLotYM}
       options={optionsCh2 }
       width="100%"
       height="300px"
      
    />
 <Chart   
   chartType="ScatterChart"
      data={this.state.arrayOfRIs1 }
    options={optionsCh1 }
       width="100%"
       height="200px"
    />
<Chart
      chartType="ColumnChart"  
  data={this.state.arrayOfRIs2}
    options={optionsCh3 }
       width="100%"
       height="200px"
       legendToggle
    />
  

<br/>
  <Table >  
    {this.state.showTableHead && <TableHead />}
    {this.state.reportsT}
  </Table>      
  <Modal show={this.state.show} onHide={this.handleClose}>  </Modal>
    
    </div>
     </Col>
</Row> 
  
      </div>
    );
  }
};

module.exports = ChartA;
       
