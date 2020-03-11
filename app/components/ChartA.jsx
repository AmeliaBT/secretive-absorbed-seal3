const React = require('react');
const Link = require('react-router-dom').Link
// style for list

const style = require('../styles/HomePage');
// react-bootstrap
const {Table , Grid, Row, Col, Modal} = require('react-bootstrap');
// other components and etc
const Header = require('./Header');
const FilterA =require('./FilterA');
const  { Chart }= require('react-google-charts'); 
//const FilterB =require('./FilterB');

//const RIlistItemAll = require('./RIlistItemAll');

const columns = [
  { type: "string", id: "President" },
  { type: "date", id: "Start" },
  { type: "date", id: "End" }
];

const rows = [
  ["Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
  ["Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)]
];

const companyOne = [
  ["Name", "Popularity"],
  ["Cesar", 250],
  ["Rachel", 4200],
  ["Patrick", 2900],
  ["Eric", 8200]
];

const companyTwo = [
  ["Name", "Popularity"],
  ["Cesar", 370],
  ["Rachel", 600],
  ["Patrick", 700],
  ["Eric", 1500]
];

const MyChart = () => {
  return (
    <Chart
      chartType="ColumnChart"    
      data= {companyTwo}
      width="100%"
      height="400px"
    />
  );
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
      modal_label: "Choose RI Reports to view",
      dataA:"",
      dataB:""
      
    };
   
    this.handleParentData = this.handleParentData.bind(this);
    //this.handleParentDataB = this.handleParentDataB.bind(this);

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
      //let body = 'Gwo=' + encodeURIComponent(event.model) 'inspector='+ encodeURIComponent(event.sel_radio_a);
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
            

        

      
      let dataB=this.state.dataB;  
      xhr.send(body);
      xhr.onreadystatechange = function() {
      
        
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
     
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
            
       let res_len=response.length;
         let reports = response.map((el) => {          
          return 
           <p> got all data for chart; </p>
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
        });
        
 // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!           
        
           that.setState({
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
          ["reports"]: <div className="reports">
                      {reports}     
                    </div>
           });
       }
    
  }

  
 /*   
 handleParentDataB(event) {  
   this.setState({ sel_radio_b: event.sel_radio_b });
   let dataA=this.state.model + "  " + this.state.pn + "  " +this.state.sel_radio_a ;
 
   this.setState({ filterAB: "    Showing results for " + dataA }); 
    
  }*/
  
  
 
  
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
        
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
        /*  Records._ID,
	     C1, //dateInspected cwo
	     T1, //pass fail	        
	     O1, //qty lot
	     P1, //qty tested
	     Q1, //qty fail
	     R1, //qty rejected
	     CREATE_DATE, //"created"
       
       <RIlistItemAll  key={el.reportID}
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
*/
           
        
         let reports = response.reports.map((el) => {
          return 
          
 
  <p> {el.reportID}+ " " +{el.cwo}+ " " +{el.two}+ " " 
             </p>
             
           
        });
        
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
 <Row> <p className="filter_msg">{this.state.filterAB}   </p></Row>     
<Row > 
   <Col xs={1} ><div  className="well" > 
     
     
      < FilterA handleData ={this.handleParentData} /> 
     <br/>
     {/* < FilterB handleDataB ={this.handleParentDataB} /> */} 
     
   </div> </Col>
  
  
  <Col xs={11} > <div   >  
    
    <MyChart />
        <Chart
          chartType="Timeline"
          data={[columns, ...rows]}
          width="75%"
          height="400px"
        /> 
 

  <Modal show={this.state.show} onHide={this.handleClose}>  </Modal>
    
    </div>
     </Col>
</Row> 
  <Row>  
    <p> see reports here:</p>
     <p> ID dateInspected passfail qtylot qtytested qtyfail qtyrejected CREATE_DATE</p>
      {this.state.reports}
    </Row>  
      </div>
    );
  }
};

module.exports = ChartA;
//< SidebarB />  < FilterA />
/* 

        
<Table className="myForm">  
         {this.state.reports}
  </Table>  
*/