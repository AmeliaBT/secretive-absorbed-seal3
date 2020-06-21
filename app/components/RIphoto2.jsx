//used by RI Report (form with photos); editing and saving are enabled 
const React = require('react');
const {Image} = require('react-bootstrap');
class RIphoto2 extends React.Component {
  constructor(props) {
   super(props); 
  }
  render() {    
    return(<div> 
     <br/>  
         <Image src={this.props.img_url} responsive />   
      </div>)
  }
}
module.exports = RIphoto2;
