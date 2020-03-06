const React = require('react');
const Link = require('react-router-dom').Link
// style for list

const style = require('../styles/HomePage');
// react-bootstrap
const {Table , Grid, Row, Col, Modal} = require('react-bootstrap');
// other components and etc
const Header = require('./Header');
const FilterA =require('./FilterA');
const FilterB =require('./FilterB');

const RIlistItemAll = require('./RIlistItemAll');
let test = {a: 1, b: 2};

/* the  page that shows all reports */
class RIlistAll2 extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      show: false, 
      disabled: true,
       reports: "loading..." ,
       model: '', 
       pn: '' ,
      sel_radio_b:"",
       sel_radio_a:"",
        filterAB:"",
      modal_label: "Choose RI Reports to view"
      
      
    };
   
    this.handleParentData = this.handleParentData.bind(this);
    this.handleParentDataB = this.handleParentDataB.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this); 
    

  }
   /***********************/
   // handlers
   /***********************/
   
  
  handleParentData(event) {
    // load reports
    alert("ok 1")
    
    let body = 'Gwo=' + encodeURIComponent(event.model) +
      '&fwo=' + encodeURIComponent(event.pn) +
      '&inspector=' + encodeURIComponent(event.sel_radio_a);
    
      let that = this;
      let xhr = new XMLHttpRequest();  
  
   
    //  xhr.open('POST', '/get-all-users-reports', true);
     
     xhr.open('POST', '/create-filtered-table2', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    alert("ok 1 body: ");
    alert(body);
    alert(body.inspector);
      xhr.send(body);
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
            alert("ok 2 respons from server ") ;
          alert(response.length) ;
        
         let reports = response.reports.map((el) => {
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
        
 // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!           
        alert("ok 3");
           that.setState({
          ["reports"]: <div className="reports">
                      {reports}     
                    </div>
           });
       }
    alert("ok 4");
  }
  
  
  xxhandleParentData(event) {   
 
    alert("hi");
    let that = this;
    
      const xhr = new XMLHttpRequest(); 
    
    xhr.open('POST', '/create-filtered-table2', true);
     
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');     
      
      xhr.send();
      xhr.onreadystatechange = function() {
                 
 let body = 'Gwo:=' + encodeURIComponent(event.model) +
      '&fwo=' + encodeURIComponent(event.pn) +
      '&inspector=' + encodeURIComponent(event.sel_radio_a);
      xhr.send(body);
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        

             
        
         let reports = response.reports.map((el) => {
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
     
         //let dataB=this.state.sel_radio_b;
           that.setState({
             model: event.model ,
      pn: event.pn , 
      sel_radio_a: event.sel_radio_a ,
      filterAB: "    Showing results for " + event.model + " " + event.pn + " " +event.sel_radio_a ,
          ["reports"]: <div className="reports">
                      {reports}     
                    </div>
           });
           
          
      }
    
  }
    
    
    
    
  }
    
 handleParentDataB(event) {  
   this.setState({ sel_radio_b: event.sel_radio_b });
   let dataA=this.state.model + "  " + this.state.pn + "  " +this.state.sel_radio_a ;
  this.setState({ filterAB: "    Showing results for " + dataA  +"  " +event.sel_radio_b}); 
    
  }
  

  
 /* handleFilters() {
    
      let that = this;
      const xhr = new XMLHttpRequest();  
    
    xhr.open('POST', '/create-filtered-table2', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');     
      
      xhr.send();
      xhr.onreadystatechange = function() {
                 
 let body = 'Gwo:=' + encodeURIComponent(this.state.model) +
      '&fwo=' + encodeURIComponent(this.state.pn) +
      '&inspector=' + encodeURIComponent(this.state.sel_radio_a);
      xhr.send(body);
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        

             
        
         let reports = response.reports.map((el) => {
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
     
        
           that.setState({
          ["reports"]: <div className="reports">
                      {reports}     
                    </div>
           });
       }
    
  }
  
  */
  
  
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
             
        
         let reports = response.reports.map((el) => {
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
      < FilterB handleDataB ={this.handleParentDataB} /> 
     
   </div> </Col>
  
  
  <Col xs={11} > <div   >  
    
    
         
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
     </Col>
</Row> 
      
      </div>
    );
  }
};

module.exports = RIlistAll2;
//< SidebarB />  < FilterA />