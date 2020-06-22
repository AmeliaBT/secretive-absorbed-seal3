
// Table View  with  Filter; All can view and  filter 
const React = require('react');
const style = require('../styles/HomePage');
// react-bootstrap
const {Table , Row, Col, Modal} = require('react-bootstrap');
// other components and etc
const Header = require('./Header');
const FilterA =require('./FilterA');
const RIlistItemAll = require('./RIlistItemAll');

class RIlistAll2 extends React.Component {
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
     sel_radio_d:"", //lot size     
      filterAB:"",
      modal_label: "Choose RI Reports to view",
      dataA:"",
      dataB:""
      
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
             '&reportID=' + encodeURIComponent(event.riN)+
            '&cwo=' + encodeURIComponent(event.sel_radio_d)
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
         let reports = response.map((el) => {          
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
          res_len: res_len,
          model: event.model,
          pn: event.pn,
          sel_radio_a: event.sel_radio_a,
          sel_radio_b: event.sel_radio_b,
          sel_radio_c: event.sel_radio_c,
          sel_radio_d: event.sel_radio_d,
          comment: event.comment,
          supplier: event.supplier,
          source: event.source,
          destination: event.destination,

          filterAB: 'Showing ' + res_len + ' results for '
            + event.riN
            + ' ' + event.model
            + ' ' + event.pn
            + ' ' + event.sel_radio_a
            + ' ' + event.pn
            + ' ' + event.comment
            + ' ' + event.supplier
            + ' ' + event.source
            + ' ' + event.destination
            + ' ' + event.sel_radio_b
            + ' ' + event.sel_radio_c
            + ' ' + event.sel_radio_d
          ,
          ["reports"]: <div className="reports">
            {reports}
          </div>
        });
      }
    
  }

   
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
  UNSAFE_componentWillMount() {
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
        <Header />

        <Row> <p className="filter_msg">{this.state.filterAB}   </p></Row>
        <Row >
          <Col xs={2} ><div className="well"   >
            < FilterA handleData={this.handleParentData} />
            <br />
          </div> </Col>
          <Col xs={10} > <div   >
            <Table > 
              <Row>
                <Col sm={1}> <b>RI </b>  </Col>
                <Col sm={1} ><b> Inspector</b> </Col>
                <Col sm={1} ><b> Part Number </b></Col>
                <Col sm={2} ><b>Description </b></Col>
                <Col sm={1} ><b> Date Inspected</b> </Col>
                <Col sm={1} ><b>Pass /Fail </b> </Col>
                <Col sm={1} > <b>Lot Size </b> </Col>
                <Col sm={2} > <b>Comment</b> </Col>
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
