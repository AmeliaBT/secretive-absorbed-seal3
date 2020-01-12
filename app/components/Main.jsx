const React = require('react');
const Link = require('react-router-dom').Link
// style for MAIN
const style = require('../styles/Main');
// other components and etc
//const RINav = require('./RINav');
const Header = require('./Header');

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
       {/*   <RINav/> */}
        <Header/>
      <Jumbotron className="jmbtrn-p">
       {/*  <h1 className="jmbtrn-p" style={{color: "#f6ff67"}}>New CMS dB </h1>*/}
         <h3 className="jmbtrn-p" > New RI dB for testing </h3>
        <p className="jmbtrn-p">
          This is main section:<br/>
          Sign in or log in to view dB<br/>
          <br/>
       <br/>
          Features (WIP)<br/>
          A. Authentication: middleware for Node.js Passport<br/>
          B. Information Security: middleware HelmetJS (to prevent sensitive information from 
          unintentially being passed between the server and client)<br/>
          C. Hash and Compare Passwords: cryptography BCrypt hashes (saltRounds = 10)<br/>


        </p>
        
      </Jumbotron>
      </div>
    );
  }
};

module.exports = Main;