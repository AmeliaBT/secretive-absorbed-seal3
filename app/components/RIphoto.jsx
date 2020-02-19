const React = require('react');
const Link = require('react-router-dom').Link
class RIphoto extends React.Component {
  constructor(props) {
   super(props);
  alert("hi from photo this.props.img_url: ");
    alert(this.props.img_url) ;
     this.state = {
      img_url: this.props.img_url}
  }
  render() {
    
    return(<div> <img src= this.state.img_url  /> </div>)
  }
}
module.exports = RIphoto;