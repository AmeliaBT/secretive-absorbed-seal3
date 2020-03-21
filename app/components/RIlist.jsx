// Edit  (no Filter); Inspector Reports only
const React = require('react');
const Link = require('react-router-dom').Link
// style for RIlist

const style = require('../styles/HomePage');
// react-bootstrap
const {Table ,filterFactory, Row, Col} = require('react-bootstrap');
// other components and etc
//import BootstrapTable from 'react-bootstrap-table-next';
//import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const Header = require('./Header');

const RIlistItem = require('./RIlistItem');
const RIlistItemMonth = require('./RIlistItemMonth');
    //RIlistItemMonth
/* the page that shows all RI reports */
class RIlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, 
      disabled: true,
       reportsM: "loading..." ,
      reports: "loading..."
    };
    
   this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
   // this.handleShowModal = this.handleShowModal.bind(this);  
  }
   /***********************/
   // handlers
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
    xhr.open('POST', '/get-user-filtered-reports', true);
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
          return <RIlistItem 
                   key={el.reportID}
                   reportnumber={el.reportID}  
                   inspector={el.inspector}
                   fwo={el.fwo}      
                   Gwo={el.Gwo}
                   jwo={el.jwo}
                   two={el.two}
                   owo={el.owo}
                   record={el.record}
                   lwo={el.lwo}
            /> 
        });   
  let arrLotYM;  
     for(let i=1; i< 5; i++){ 
 arrLotYM.push(["m-y" +i, "rate" +i]) ;}
        alert("hi " +arrLotYM );
        let reportsM = arrLotYM.map((el) => {
          return 
          /*
          <RIlistItemMonth
                    month_year={el[0]}
                    lar={el[1]}  
                   
            /> */
        });   
    
        
        
        
//  className="pull-right"  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
           that.setState({
          ["reports"]: <div className="reports">{reports} </div>,
             
         ["reportsM"]: <div className="reports">{reportsM} </div>
           });
       }    
  } 
  render() {
    return (
      <div>
        <Header/>       
         <Table className="myForm">
            <Row>
        
             <Col sm={1}> <b>mmmRI </b>  </Col> 
              <Col sm={1} ><b>kjkjr</b> </Col> 
                
          
           
           </Row>
       
        
        {this.state.reportsM}          

       </Table> 
       
     
      </div>
    );
  }
};

module.exports = RIlist;
//  <TableHeaderColumn>