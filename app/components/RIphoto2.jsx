//used by RI Report (form with photos); editing and saving are enabled 
const React = require('react');
const Link = require('react-router-dom').Link
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

/* 

<img src={this.props.img_url} alt="ri photo 1"/> 
<ResponsiveEmbed a16by9>
                    <embed type="image/href+xml" href = "https://static.pexels.com/photos/296886/pexels-photo-296886.jpeg"/>
                </ResponsiveEmbed>
        <br/>
        <img src="https://static.pexels.com/photos/296886/pexels-photo-296886.jpeg"  alt="ri1 pic"/> 



*/