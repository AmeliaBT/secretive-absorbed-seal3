const React = require('react');
const Link = require('react-router-dom').Link
class RIphoto2 extends React.Component {
  constructor(props) {
   super(props); 
  }
  render() {    
    return(<div> 
     <br/>    
        <img src={this.props.img_url} alt="ri photo 1"/> 
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