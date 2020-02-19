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
    
    return(<div> 
       <p> see this ri photo: </p> <br/>
        <ResponsiveEmbed a16by9>
                    <embed type="image/href+xml" href = "https://static.pexels.com/photos/296886/pexels-photo-296886.jpeg"/>
                </ResponsiveEmbed>
        <br/>
        <img src= {this.state.img_url }  alt="ri1 pic"/> 
      
      </div>)
  }
}
module.exports = RIphoto;