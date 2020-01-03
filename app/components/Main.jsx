const React = require('react');
const Link = require('react-router-dom').Link
// style for MAIN
const style = require('../styles/Main');
// other components and etc
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
        <Header/>
      <Jumbotron>
       {/*  <h1 className="jmbtrn-p" style={{color: "#f6ff67"}}>New CMS dB </h1>*/}
         <h1 className="jmbtrn-p" >New RI dB </h1>
        <p className="jmbtrn-p">
        </p>
        <p className="jmbtrn-p">
          ― contact AT 
        </p>
      </Jumbotron>
      </div>
    );
  }
};

module.exports = Main;