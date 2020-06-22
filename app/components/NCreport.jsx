// element for NCreports -Defects  (Nonconformances)
const React = require('react');
const style = require('../styles/Report');
const Link = require('react-router-dom').Link
// react-bootstrap
const {Button, Glyphicon , OverlayTrigger} = require('react-bootstrap');
// react-bootstrap
const {Popover} = require('react-bootstrap');

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
      
      tooltip: <Popover id="pop" title=  {this.props.fwo}  >
                            <div>                                                    
                              DATE:   <b>  {jwo2}      </b> <br/>
                              SUPPLIER: <b>{this.props.ewo}   </b><br/>
                              INSPECTOR: <b> {this.props.inspector}</b><br/>
                           </div>
                           
                        </Popover>
    };
  }
 
  render() {
    return(
      <div className="book-all">
      {/*   <img src={this.state.img_url} alt="book pic" className="img-all"/>*/}
        <div  ><h4 className="nc-all">{this.state.Gwo}</h4></div>
        <div className="exchange-btn-all"  >
          <Link to={'report-view/' + this.state.reportID  }>
            <Button bsSize="xsmall"  >  <Glyphicon glyph="eye-open"/>   </Button></Link>
          </div>
        
         <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={this.state.tooltip}
          >
              <div key={this.state.reportID} className="nickname-all">NC: {this.state.record}</div>
             
          </OverlayTrigger>
      </div>
    );
  }
}
module.exports = NCreport;
