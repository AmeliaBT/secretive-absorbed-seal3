const React = require('react');
const Link = require('react-router-dom').Link
// style for MAIN
const style = require('../styles/Main');
// other components and etc
//const RINav = require('./RINav');
//const Header = require('./Header');
const LogIn = require('./LogIn');
const ManyRecords = require('./ManyRecords');
// react-bootstrap
const {Jumbotron} = require('react-bootstrap');

/* the main page that showed when user is not loged in */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
       {/*   <RINav/>     <Header/>*/}
        <p> To log in, enter your email and password, then click Login. Passwords are case-sensitive</p>
        <LogIn/>
    
     

      </div>
    );
  }
};

module.exports = Main;