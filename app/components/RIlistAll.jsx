// Table View  (no Filter); All can view only
const React = require('react');
const Link = require('react-router-dom').Link
// style for list
const style = require('../styles/HomePage');
// react-bootstrap
const {Table , Grid, Row, Col, Modal} = require('react-bootstrap');
// other components and etc
const Header = require('./Header');
const RIlistItemAll = require('./RIlistItemAll');

/* the  page that shows all reports */
class RIlistAll extends React.Component {
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
           record={el.record}
           lwo ={el.lwo}       
            /> 
        });
        
   // alert("hi  reports" +reports);       
  let arrLotYM=[];
       
     for(let i=1; i< 5; i++){ 
 arrLotYM.push(["m-y" +i, "rate" +i]) ;}
      //  console.log("arrLotYM");
       // console.log(arrLotYM);
       // alert("hi  arrLotYM: " +arrLotYM );
 /* 
 4) [Array(2), Array(2), Array(2), Array(2)]
0: (2) ["m-y1", "rate1"]
1: (2) ["m-y2", "rate2"]
2: (2) ["m-y3", "rate3"]
3: (2) ["m-y4", "rate4"]
 */      
        
        
        let reportsM = arrLotYM.map((el) => {
          //let xy=[el[0],el[1]];
          //console.log("hi")
          //console.log(xy);
          return  <RIlistItemMonth
                    month_year="Mar 2019" //{xy[0]}
                    lar="13%" //{xy[1]}  
                   
            /> 
        });   
    
 // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!           
        
           that.setState({
          ["reports"]: <div className="reports">
                      {reports}     
                    </div>,
               ["reportsM"]: <div className="reports">{reportsM} </div>
           });
       }
    
  }
  //https://react-bootstrap.github.io/components/table/
  render() {
    return (
      <div>
        <Header/> 


    <div   >  
    
      
  
<Table className="myForm">  
                 
            <Row>
             <Col sm={1}> <b>YM </b>  </Col> 
                <Col sm={1} ><b> LAR</b> </Col> 
              
           </Row>
        
        {this.state.reportsM}
  </Table>  
         <Modal show={this.state.show} onHide={this.handleClose}>  </Modal>
   
  <p> </p>
    </div>
   

      </div>
    );
  }
};

module.exports = RIlistAll;