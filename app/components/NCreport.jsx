// element for RI Gallery -WIP 
const React = require('react');
const Link = require('react-router-dom').Link
// react-bootstrap
const {OverlayTrigger, Popover} = require('react-bootstrap');
// style for BOOK
const style = require('../styles/Report');

/* component for displaying book */
class NCreport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //img_url: this.props.img_url,
      inspector: this.props.inspector,
      reportID: this.props.reportnumber,
      tooltip: <Popover id="popover" title="some info">
                            <div>
                            inspector: {this.props.inspector}
                           </div>
                           <div>
                             dp: 
                           </div>
                        </Popover>
    };
  }
  /***********************/
  componentWillMount() {
    //get   supplier and pn of user by nickname
    let that = this;
      const xhr = new XMLHttpRequest();

xhr.open('POST', '/get-all-users-reports', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
      let body = 'inspector=' + encodeURIComponent(this.props.inspector);


      xhr.send(body);
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
    
  }
  /***********************/
  render() {
    return(
      <div className="book-all">
      {/*   <img src={this.state.img_url} alt="book pic" className="img-all"/>*/}
        <div className="bookname-all">{this.state.reportID}</div>
        <div className="exchange-btn-all" onClick={() => this.props.showModal(this.props.reportID, this.props.inspector)}>Show Report</div>
         <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={this.state.tooltip}
          >
              <div className="nickname-all">Inspector: {this.state.inspector}</div>
             
          </OverlayTrigger>
      </div>
    );
  }
}
module.exports = NCreport;