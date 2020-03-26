// NC old RI Gallery WIP 

const React = require('react');
const Link = require('react-router-dom').Link
// style 
const style = require('../styles/RIreports');
// react-bootstrap
const {Modal, Button, form, FormGroup, FormControl, ControlLabel, option} = require('react-bootstrap');
// other components and etc
const Header = require('./Header');
const NCreport = require('./NCreport');

/* the reports page that shows all NC */
class NCreports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       show: false,
       modal_label: "Choose a report to view ",
     
       disabled: true,
       reports: "loading...",
       modal_content: "loading..."
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
    this.setState({
        //  ["chosenAnotherUserBook"]: chosenAnotherUserBook,
          //["anotherUserNickname"]: anotherUserNickname
           });
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
      
     // xhr.open('POST', '/get-all-users-reports', true);
     xhr.open('POST', '/get-defect-reports', true);
    //get-defect-reports
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
        //  return <RIreport showModal={that.handleShowModal} reportnumber={el.reportnumber} nickname={el.nickname} img_url={el.img_url}/> 
/*
*/
          return <NCreport 
                   key={el.reportID}
                   reportnumber={el.reportID} 
                   inspector={el.inspector}
                   ewo={el.ewo}  //suplier
                   fwo={el.fwo}  //PN
                   Gwo={el.Gwo} //descrip
                   jwo={el.jwo} //date
                   two={el.two} //pass-fail                   
                   record={el.record} //comment
                   uwo={el.uwo} //photo url
                                       
                   /> 
        });
           that.setState({
          ["reports"]: <div className="reports">
                      {reports}     
                    </div>
           });
       }
      // getl user's filtered reports
      xhr = new XMLHttpRequest();
      
    //  xhr.open('POST', '/get-user-filtered-reports', true);
    xhr.open('POST', '/get-defect-reports', true);
    //get-defect-reports
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.send();

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        let options = response.reports.map((el) => {
 
      return <option value={el.reportnumber} key={el.toString()}>{el.reportnumber}</option>;

        });
        if(options.length > 0) {
           that.setState({
          ["modal_content"]: <FormControl componentClass="select"
                                placeholder="select"
                                onChange={that.handleSelectChange}>
                                {options}
                              </FormControl>
           });
        }
        else {
           that.setState({
            ["modal_content"]: "You do not have reports: add the one before exchanging!"
             });
        }
       }
  }
  render() {
    return (
      <div>
        <Header/>
        <h4 >Defects </h4> 
        {this.state.reports}
         <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modal_label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                {this.state.modal_content}
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            {/*<Button onClick={this.handleExchange} className="btn-modal" disabled={this.state.disabled}>Confirm</Button>*/}
            <Button onClick={this.handleClose} className="btn-modal">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

module.exports = NCreports;