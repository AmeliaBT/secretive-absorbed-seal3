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
      reportsLink: "",
      listLink: "",
      listLinkAll: "",
      listLinkAll2: "",
      chartLinkA:""
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
         let securityLevel = response.securityLevel; 

        if(response.isLogedIn == true) {
            /* Show screen based on the Security level *********/         
     switch (securityLevel) {
      case 1:
         // user
        alert("user");
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
                       <NavItem className='span'> <Link  to='/homepage' className="link">{response.inspname}'s RI Form</Link> </NavItem> 
                      <NavItem className='span'> <Link  to='/up-many-records' className="link">Admin</Link> </NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>,
            ["reportsLink"]: "/reports",
             ["listLink"]: "/list",
             ["listLinkAll"]: "/list-all",
                ["listLinkAll2"]: "/list-all2",
                ["chartLinkA"]: "/chartA"
           });
        break;
      case 2:
         // Manager 
        alert("2");
        break;
      case 3:   
         //top level Admin
         alert("Admin");
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
                       <NavItem className='span'> <Link  to='/homepage' className="link">{response.inspname}'s RI Form</Link> </NavItem> 
                      <NavItem className='span'> <Link  to='/up-many-records' className="link">Admin</Link> </NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>,
            ["reportsLink"]: "/reports",
             ["listLink"]: "/list",
             ["listLinkAll"]: "/list-all",
                ["listLinkAll2"]: "/list-all2",
                ["chartLinkA"]: "/chartA"
           });
        break;
 default:
         // visitor
        alert("visitor");
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
                       <NavItem className='span'> <Link  to='/homepage' className="link">{response.inspname}'s RI Form</Link> </NavItem> 
                      <NavItem className='span'> <Link  to='/up-many-records' className="link">Admin</Link> </NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>,
            ["reportsLink"]: "/reports",
             ["listLink"]: "/list",
             ["listLinkAll"]: "/list-all",
                ["listLinkAll2"]: "/list-all2",
                ["chartLinkA"]: "/chartA"
           });
    }         
 /********************/
          
        /*  
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
                       <NavItem className='span'> <Link  to='/homepage' className="link">{response.inspname}'s RI Form</Link> </NavItem> 
                      <NavItem className='span'> <Link  to='/up-many-records' className="link">Admin</Link> </NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>,
            ["reportsLink"]: "/reports",
             ["listLink"]: "/list",
             ["listLinkAll"]: "/list-all",
                ["listLinkAll2"]: "/list-all2",
                ["chartLinkA"]: "/chartA"
           });
          */
        }
        else {
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
              {/* 
                        <NavItem className='span'>
                           <Link  to='/signup' className="link"><p  className="link">Sign up</p></Link>
                        </NavItem> 
              */}
                        <NavItem className='span'>
                          <Link to='/login' className="link"><p  className="link"> Log in </p></Link>
                        </NavItem>
                      </Nav>
            
            
           });
         }
        }
  }

  /***********************/
   /************  inverse    ***********/
  render() {
    return (
      <div  className="link span">
       <Navbar collapseOnSelect>
        <Navbar.Header>
                 <Navbar.Brand >           
            <Link to={this.state.listLinkAll} ><p  className="link"> KPIs  </p></Link>            
          </Navbar.Brand>
                  <Navbar.Brand >           
            <Link to={this.state.listLinkAll2} ><p  className="link">Reports  </p></Link>            
          </Navbar.Brand>
          <Navbar.Brand >           
            <Link to={this.state.chartLinkA} ><p  className="link">Charts  </p></Link>            
          </Navbar.Brand>
          <Navbar.Brand >           
            <Link to={this.state.reportsLink} ><p  className="link">Defects</p></Link>            
          </Navbar.Brand>
          
          <Navbar.Brand >           
            <Link to={this.state.listLink} ><p  className="link">Editing   </p></Link>            
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
                    


{/*   <Link  to='/homepage' className="link">Welcome Inspector, {response.nickname}{response.name} {response.inspector} </Link>*/}  

/* 

 <Link  to='/signup' className="link"><h5>^Sign^ [uP]</h5></Link>
                        </NavItem> 
                        <NavItem componentClass='span'>
                          <Link to='/login' className="link"><h5> ^Log^ [iN] </h5></Link>


                            <div className="link" onClick={that.handleLogOut}>^Log^ [ouT]</div>
*/