// Edit  (no Filter); Inspector Reports only
const React = require('react');

const style = require('../styles/HomePage');
// react-bootstrap
const {Table , Row, Col} = require('react-bootstrap');
// other components and etc
const Header = require('./Header');
const RIlistItem = require('./RIlistItem');

class RIlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, 
      disabled: true,
       reports: "loading..." 
    };
    
   this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
   
  }
   /***********************/
   // handlers
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
  UNSAFE_componentWillMount() {
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
//  className="pull-right"  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
           that.setState({
          ["reports"]: <div className="reports">
                      {reports}     
                    </div>
           });
       }    
  } 
  render() {
    return (
      <div>
        <Header />
        <Table className="myForm">
          <Row>
            <Col sm={1}> <b>RI </b>  </Col>
            <Col sm={1} ><b> Inspector</b> </Col>
            <Col sm={1} > <b>PN </b></Col>
            <Col sm={2} ><b>Description </b></Col>
            <Col sm={1} > <b>Date Inspected </b></Col>
            <Col sm={1} ><b>Pass / Fail  </b></Col>
            <Col sm={1} > <b>Lot Size </b></Col>
            <Col sm={3} > <b>Comment</b> </Col>
            <Col sm={1} ><b>Edit  </b></Col>

          </Row>

          {this.state.reports}
        </Table>
      </div>
    );
  }
};

module.exports = RIlist;
//  <TableHeaderColumn>