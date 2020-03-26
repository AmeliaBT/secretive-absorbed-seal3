// element for NCreports -Defects  (Nonconformances)
const React = require('react');

const Link = require('react-router-dom').Link
// react-bootstrap
const {Col, Row, Button, Glyphicon , OverlayTrigger} = require('react-bootstrap');
// react-bootstrap
const {Popover} = require('react-bootstrap');
// style for BOOK
const style = require('../styles/Report');

/* component for displaying book */
class NCreport extends React.Component {
  constructor(props) {
    
    super(props);
    let jwo2;
     let jwo=this.props.jwo;  //Date Inspected:
   
    
    if(jwo == null){jwo2= ""}else{jwo2= jwo.slice(0,10)};
    
    this.state = {
      //img_url: this.props.img_url,
      inspector: this.props.inspector,
      reportID: this.props.reportnumber,
        ewo:this.props.ewo,  //suplier
       fwo:this.props.fwo,  //PN
        Gwo:this.props.Gwo, //descrip
         jwo: jwo2, //   this.props.jwo, //date
         two:this.props.two, //pass-fail                   
          record:this.props.record ,//comment
         uwo:this.props.uwo ,  //photo url
      
      tooltip: <Popover id="popover" title=  {this.props.fwo}  >
                            <div>                                                    
                              DATE:   <b>  {jwo2}      </b> <br/>
                              SUPPLIER: <b>{this.props.ewo}   </b><br/>
                              INSPECTOR: <b> {this.props.inspector}</b><br/>
                           </div>
                           
                        </Popover>
    };
  }
  /***********************/

  /***********************/
  render() {
    return(
      <div className="book-all">
      {/*   <img src={this.state.img_url} alt="book pic" className="img-all"/>*/}
        <div  ><h4 className="nc-all">{this.state.Gwo}</h4></div>
        <div className="exchange-btn-all"  ><Link to={'report-view/' + this.state.reportID  }>   <Button bsSize="xsmall"  >  <Glyphicon glyph="eye-open"/>   </Button></Link></div>
        
         <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={this.state.tooltip}
          >
              <div className="nickname-all">NC: {this.state.record}</div>
             
          </OverlayTrigger>
      </div>
    );
  }
}
module.exports = NCreport;
// <Link to={'report-view/' + this.state.reportID  }>   <Button bsSize="xsmall"  >  <Glyphicon glyph="eye-open"/>   </Button></Link> 
// <div className="exchange-btn-all" onClick={() => this.props.showModal(this.props.reportID, this.props.inspector)}>Show Report</div>
//  <div className="bookname-all">{this.state.Gwo}</div>

//componentWillMount() {
    //get   supplier and pn of user by nickname
  //  let that = this;
  //    const xhr = new XMLHttpRequest();

//xhr.open('POST', '/get-all-users-reports', true);
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
 //     let body = 'inspector=' + encodeURIComponent(this.props.inspector);


  //    xhr.send(body);
/*
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        let   supplier = response.supplier;
        let pn = response.pn;
        if(response.supplier.length == 0)    supplier = "not specified";
        if(response.pn.length == 0)  pn = "not specified";
           that.setState({
          ["tooltip"]: <Popover id="popover" title="User location">
                            <div>
                            supplier: {  supplier}
                           </div>
                           <div>
                             PN: {pn}
                           </div>
                        </Popover>
           });
        }
    */
    
 // }