const React = require('react');
const Link = require('react-router-dom').Link
// style for HEADER
const style = require('../styles/Header');
// react-bootstrap
const {Nav, Navbar, NavItem, NavDropdown, MenuItem} = require('react-bootstrap');

/* the header component for navbar */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navBtns: null,
      booksLink: ""
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  /***********************/
  // handlers
  /***********************/
  handleLogOut() {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', '/log-out', true);

      xhr.send();

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.error == 0) {
          window.location.href = "/";
        }
      }
  }
  /***********************/
  componentWillMount() {
    // check if user is loged in
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/is-loged-in', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();
      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.isLogedIn == true) {
           that.setState({
          ["navBtns"]: <Nav pullLeft className="navbar-nav span">
                        <NavItem className='span'>
                           <Link  to='/profile' className="link">Hello, {response.nickname}</Link>
                        </NavItem> 
                        <NavItem className='span'>
                          <div  onClick={that.handleLogOut} className="link">Log out</div>
                        </NavItem>
                      </Nav>,
            ["booksLink"]: "/books"
           });
        }
        else {
          that.setState({
          ["navBtns"]: <Nav pullLeft className='navbar-nav span'>
               {/* <Nav pullRight>*/}
                        <NavItem  >
                           <Link  to='/signup' ><h5 className="link">Sign up</h5></Link>
                        </NavItem> 
                        <NavItem >
                          <Link to='/login' ><h5 className="link"> Log in  fff</h5></Link>
                        </NavItem>
                      </Nav>,
          ["booksLink"]: "/login"
           });
         }
        }
  }
  /***********************/
  render() {
    return (
      <div  className="link span">
       <Navbar inverse  collapseOnSelect>
         {/*  <Navbar inverse collapseOnSelect>*/}
        <Navbar.Header>
          <Navbar.Brand >            
            <Link to={this.state.booksLink} ><h5 className='link'>RI Reports</h5></Link>
            
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.state.navBtns}
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
};

module.exports = Header;
/* 
 <Link  to='/signup' className="link"><h5>^Sign^ [uP]</h5></Link>
                        </NavItem> 
                        <NavItem componentClass='span'>
                          <Link to='/login' className="link"><h5> ^Log^ [iN] </h5></Link>


                            <div className="link" onClick={that.handleLogOut}>^Log^ [ouT]</div>
*/