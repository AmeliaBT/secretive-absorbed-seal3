const React = require('react');
const Link = require('react-router-dom').Link
// style for list

const style = require('../styles/RIlist');
// react-bootstrap
const {Table , Row, Col, Modal} = require('react-bootstrap');
// other components and etc
const Header = require('./Header');
//const ExportData = require('./ExportData');
const RIlistItemAll = require('./RIlistItemAll');

/* the  page that shows all reports */
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
    // load reports
      let that = this;
      let xhr = new XMLHttpRequest();  
   // xhr.open('POST', '/get-user-filtered-reports', true);
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
        <Table>
            <Row>
             <Col sm={1}> <b>RI </b>  </Col> 
                <Col sm={1} ><b> Inspector</b> </Col> 
                <Col sm={1} ><b> PN </b></Col> 
                <Col sm={1} ><b>Description  </b></Col> 
               <Col  sm={3} ><b> Date Inspected</b> </Col> 
              <Col  sm={1} ><b>Pass / Fail </b> </Col> 
               <Col sm={1} > <b>Lot Size </b> </Col> 
              
           </Row>
       
        
        {this.state.reports}
       </Table>  
         <Modal show={this.state.show} onHide={this.handleClose}>         
        </Modal>
       
     
      </div>
    );
  }
};

module.exports = RIlistAll;