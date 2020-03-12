//https://stackoverflow.com/questions/47004716/google-charts-data-grouping-for-column-chart?rq=1
const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/HomePage');
const {Table , Grid, Row, Col, Modal} = require('react-bootstrap');
const Header = require('./Header');
const FilterA =require('./FilterA');
const ChartA1 =require('./ChartA1');
const  { Chart }= require('react-google-charts'); 

let arrayOfRIs= [  ["Date", "Lot Size", "Qty Tested", "qty fail"]];
let MyChartRI;
//let optionsCh2={title: 'Lot Qty '};
let optionsCh1 ={  title: 'Lot Size',
               timeline: {  groupByRowLabel: true },
                hAxis: {title: "Date Inspected",  format: 'MMM/yyyy'},
               vAxis: { title: "Lot Size", minValue: 0 },
// hAxis: { title: "Lot Qty", viewWindow: { min: 0, max: 15 } },
//  vAxis: { title: "Date tested", viewWindow: { min: 0, max: 15 } },
                 legend: "none"
}
  
let optionsCh2 ={
        title: 'Lot Size',
        timeline: { groupByRowLabel: true  },
        hAxis: { format: 'MMM/yyyy', //  gridlines: {count: 15}
               },
    vAxis: {  minValue: 0
       //  gridlines: {color: 'red'},
          }
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
         arrayOfRIs=[  ["Date", "Lot Qty"]];
        
        let reports = response.map((el) => { 
      if(el.cwo !== ""){
          let myDate= new Date(el.cwo.substring(0,10));
           let myLot= el.owo; 
            arrayOfRIs.push([myDate, myLot]) ;            
      }    
            return         
          
        });
      
        
           that.setState({
             arrayOfRIs:arrayOfRIs,
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
           let myLot= el.owo; 
            arrayOfRIs.push([myDate, myLot]) ; 
            
      }            
        });
        
                
        
          that.setState({
           ["reports"]: {reports},
            "arrayOfRIs" : arrayOfRIs             
           });
       }
    
  }
   
  render() {
    return (
      <div>
        <Header/> 
  
 <Row> <p className="filter_msg">{this.state.filterAB}   </p></Row>     
<Row > 
   <Col xs={1} ><div  className="well" >  
      < FilterA handleData ={this.handleParentData} /> 
     <br/>
   </div> </Col>
  <Col xs={11} > <div   >  
 <Chart
      //chartType="ColumnChart" 
   chartType="ScatterChart"
      data={this.state.arrayOfRIs }
    options={optionsCh1 }
       width="100%"
       height="300px"
       legendToggle
    />
<Chart
      chartType="ColumnChart"  
      data={this.state.arrayOfRIs}
       options={optionsCh2 }
       width="100%"
       height="300px"
       legendToggle
    />
    <ChartA1 />

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
        /*  Records._ID,
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