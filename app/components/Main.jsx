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
         <h1 className="jmbtrn-p" >New CMS dB </h1>
        <p className="jmbtrn-p">
       QA SJ started  testing the new RI website on Jan 2, 2020, which revamps the caurrent Android tablet app.
The new look is intended to be easier to navigate ....<br/>
 feedback on the new website can be shared by clicking here. <br/>
          
    A prove of concept; to demonstrate feasibility of using nodes, ract-redux (front end), 
                                      mongdb (back-end); secury  <br/>     
      Hosting MongoDB on AWS with MongoDB Atlas - <br/>
          Hosting, managing, and runing MongoDB on the AWS Cloud with MongoDB Atlas  <br/>
          1.Import Data into Cluster - bring data from existing JSON/CSV files into Atlas
          
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