const React = require('react');
const LogIn = require('./LogIn');
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
           <p> To log in, enter your email and password, then click Login. Passwords are case-sensitive</p>
        <LogIn/>  
      </div>
    );
  }
};

module.exports = Main;