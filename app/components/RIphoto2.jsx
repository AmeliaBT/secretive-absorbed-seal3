const React = require('react');
const Link = require('react-router-dom').Link
class RIphoto2 extends React.Component {
  constructor(props) {
   super(props);
  alert("hi from photo2 this.props.img_url: ");
    alert(this.props.img_url) ;
     this.state = {
      img_url: this.props.img_url}
  }
  render() {
    
    return(<div> 
       <p> see this ri2 photo: </p> <br/>
        <p>url1:  {this.state.img_url}  </p> <br/>
      <p>url2:  {this.props.img_url}  </p> <br/>
      </div>)
  }
}
module.exports = RIphoto2;

/* 
<ResponsiveEmbed a16by9>
                    <embed type="image/href+xml" href = "https://static.pexels.com/photos/296886/pexels-photo-296886.jpeg"/>
                </ResponsiveEmbed>
        <br/>
        <img src="https://static.pexels.com/photos/296886/pexels-photo-296886.jpeg"  alt="ri1 pic"/> 



*/