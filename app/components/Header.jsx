const React = require('react');
const Link = require('react-router-dom').Link
const style = require('../styles/Header');
// react-bootstrap
const {Nav, Navbar, NavItem} = require('react-bootstrap');

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
      chartLinkA:"",
      securityLevel: ""
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
  UNSAFE_componentWillMount() {
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
            /* Show screen based on the Security level *********/   
          let securityLevel = response.securityLevel; 
         
     switch (securityLevel) {
      case 1:
         // user
     
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">                    
                      <NavItem className='span'> <Link  to='/signup3' className="link"><p  className="link">Change PW </p></Link> </NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>,
            ["reportsLink"]: "/reports",
           
            ["listLinkAll"]: "/list-all",
              ["listLinkAll2"]: "/list-all2",
               ["chartLinkA"]: "/chartA",
            securityLevel: securityLevel
           });
        break;
      case 2:
         // Manager
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
                       <NavItem className='span'> <Link  to='/homepage' className="link">{response.inspname}'s RI Form</Link> </NavItem> 
                         <NavItem className='span'> <Link  to='/list' className="link">Edit Report </Link> </NavItem> 
                       <NavItem className='span'> <Link  to='/signup2' className="link"><p  className="link">Add User</p></Link> </NavItem> 
                       <NavItem className='span'> <Link  to='/signup3' className="link"><p  className="link">Change PW </p></Link> </NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>,
            ["reportsLink"]: "/reports",
           
             ["listLinkAll"]: "/list-all",
                ["listLinkAll2"]: "/list-all2",
                ["chartLinkA"]: "/chartA",
            securityLevel: securityLevel
           });
         
       
        break;
      case 3:   
         //top level Admin
        
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
                       <NavItem className='span'> <Link  to='/homepage' className="link">{response.inspname}'s RI Form</Link> </NavItem> 
                       <NavItem className='span'> <Link  to='/list' className="link">Edit Report </Link> </NavItem> 
                       <NavItem className='span'> <Link  to='/up-many-records' className="link">Admin</Link> </NavItem> 
                       <NavItem className='span'> <Link  to='/signup2' className="link"><p  className="link">Add User</p></Link> </NavItem> 
                      <NavItem className='span'> <Link  to='/signup3' className="link"><p  className="link">Change PW </p></Link> </NavItem> 
                       <NavItem className='span'> <div  onClick={that.handleLogOut} className="link">Log out</div> </NavItem>
                      </Nav>,
            ["reportsLink"]: "/reports",
            // ["listLink"]: "/list",
             ["listLinkAll"]: "/list-all",
                ["listLinkAll2"]: "/list-all2",
                ["chartLinkA"]: "/chartA",
            securityLevel: securityLevel
           });
        break;
 default:
         // visitor
        
        that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
              
                        <NavItem className='span'>
                          <Link to='/login' className="link"><p  className="link"> Log in </p></Link>
                        </NavItem>
                      </Nav>
            
            
           });   
     
    }         
 /********************/
       
        }
        else {
          that.setState({
          ["navBtns"]: <Nav pullLeft className="link span">
             
                        <NavItem className='span'>
                          <Link to='/login' className="link"><p  className="link"> Log in </p></Link>
                        </NavItem>
                      </Nav>
            
            
           });
         }
        }
  }

  /***********************/
 
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
                    
