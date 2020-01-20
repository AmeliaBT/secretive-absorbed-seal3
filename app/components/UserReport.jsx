const React = require('react');
const Link = require('react-router-dom').Link
// style for BOOK
const style = require('../styles/UserReport');

/* component for displaying books in user library */
class UserReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_url: this.props.img_url,
      bookname: this.props.bookname
    };
  }
  render() {
    return(
      <div className="book">
        <img src={this.state.img_url} alt="book pic" className="img-user"/>
        <div className="bookname">{this.state.bookname}</div>
      </div>
    );
  }
}
module.exports = UserReport;
//HomePage requests this:
//<UserReport  reportnumber={e.reportnumber}/>;