//https://stackoverflow.com/questions/47004716/google-charts-data-grouping-for-column-chart?rq=1
const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/HomePage');
const {Table , Grid, Row, Col, Modal} = require('react-bootstrap');
const Header = require('./Header');
const FilterA =require('./FilterA');
//const ChartA1 =require('./ChartA1');
const  { Chart }= require('react-google-charts'); 

let arrayOfRIs1= [  ["Date", "Lot Size"]];
//let arrayOfRIs2= [  ["Date", "Lot Size", "Qty Tested", "Qty Fail", "Qty Rejected"]];
let arrayOfRIs2= [  ["Date", "Qty Tested", "Qty Fail"]];
let arrayOfRIs3= ["Date"];
let uniqueYM;
let MyChartRI1;
let MyChartRI2;
let arrayOfYM;
let arrLotYM;
let arrayOfRIsPF=[];
    

//let optionsCh2={title: 'Lot Qty '};
let optionsCh1 ={  title: 'Receiving Inspection',
               timeline: {  groupByRowLabel: true },
                hAxis: {title: "Date Inspected",  format: 'MMM/yyyy'},
               vAxis: { title: "Lot Size", minValue: 0 },
                 legend: "none"
}
  // hAxis: { title: "Lot Qty", viewWindow: { min: 0, max: 15 } },
//  vAxis: { title: "Date tested", viewWindow: { min: 0, max: 15 } },
   //  gridlines: {color: 'red'},
//  gridlines: {count: 15}
let optionsCh2 ={
        title: 'Lot Acceptance Rate',
        timeline: { groupByRowLabel: true  },
        hAxis: { format: 'MMM/yyyy', title: "Date (Year-Month) Inspected" },
        vAxis: {  minValue: 0 ,title: "Rate %"}, 
  legend: "none"
      };
let optionsCh3 ={
        title: 'Qty ..',
        timeline: { groupByRowLabel: true  },
        hAxis: { format: 'MMM/yyyy'},
        vAxis: {  minValue: 0},
       legend: {position: "top"}
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
     
      filterAB:"",
      modal_label: "Choose RI Reports to view"
      
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
             '&reportID=' + encodeURIComponent(event.riN)
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
       //  arrayOfRIs2= [  ["Date", "Lot Size", "Qty Tested", "Qty Fail", "Qty Rejected"]];
        arrayOfRIs2= [  ["Date", "Qty Tested", "Qty Fail"]];
        
        let reports = response.map((el) => { 
       if(el.cwo !== ""){
          let myDate= new Date(el.cwo.substring(0,10));
          let myDate2= el.cwo.substring(0,4 ) +"-" +el.cwo.substring(5,7) ; 
           let myLot= el.owo; 
           let qtyTested= el.pwo; 
           let qtyFail= el.qwo; 
            let qtyRejected= el.rwo; 
           let pass_fail= el.two; 
            arrayOfRIs1.push([myDate, myLot ]) ; 
          
        // arrayOfRIs2.push([myDate, myLot, qtyTested, qtyFail, qtyRejected ]) ;   
        arrayOfRIs2.push([myDate,  qtyTested, qtyFail]) ; 
         
          // getting unique YYYY-MM
           arrayOfRIs3.push(myDate2 ) ;           
           if(pass_fail.length === null){
           arrayOfRIsPF.push([myDate2, "Fail"]);
           }else{ arrayOfRIsPF.push([myDate2, pass_fail]);}  
        
      }    
            return         
          
        });
      
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
             ,
          ["reports"]: <div className="reports"> {reports}  </div>
              
             
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
 
    //get-all-users-reports
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
          //  arrayOfRIs2.push([myDate, myLot, qtyTested, qtyFail, qtyRejected]) ; 
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
   //new Date
     //arrLotYM.push([uniqueYM[i], lotA/lotN*100 ]) ; //ok
   arrLotYM.push([new Date(uniqueYM[i]), lotA/lotN*100 ]) ;
 }
   
    
        
 // 888888888     
          that.setState({
           ["reports"]: {reports},
            "arrayOfRIs1" : arrayOfRIs1,
             "arrayOfRIs2" : arrayOfRIs2,
             "arrLotYM":arrLotYM
          //   "arrayOfRIs3" :arrayOfRIs3,
          //  "uniqueYM": uniqueYM,
          
            //,
             // "arrLotYM": arrLotYM
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
   //data={this.state.arrayOfRIs2}
  //arrLotYM
  data={this.state.arrLotYM}
       options={optionsCh2 }
       width="100%"
       height="300px"
      
    />
 <Chart
      //chartType="ColumnChart" 
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
  

  <Modal show={this.state.show} onHide={this.handleClose}>  </Modal>
    
    </div>
     </Col>
</Row> 
  
      </div>
    );
  }
};

module.exports = ChartA;
       
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 


        /* 
          <ChartA1 />
        
        Records._ID,
	     C1, //dateInspected cwo
	     T1, //pass fail	        
	     O1, //qty lot
	     P1, //qty tested
	     Q1, //qty fail
	     R1, //qty rejected
	     CREATE_DATE, //"created"
       
       
       
       */
    {/* <RIlistItemAll  key={el.reportID}
           reportnumber={el.reportID}  
           inspector={el.inspector}
             fwo={el.fwo}     
           Gwo={el.Gwo}
           jwo={el.jwo}
           two={el.two}
           owo={el.owo}
           record={el.record}
           lwo ={el.lwo}       
            /> */}