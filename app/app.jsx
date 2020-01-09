const React = require('react');
const { render } = require('react-dom');

// router
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;

// redux
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const reducers = require('./reducers');

let store = createStore(reducers);

/* Import Components */
const Main = require('./components/Main');
const RIreports = require('./components/RIreports');
const SignUp = require('./components/SignUp');
const LogIn = require('./components/LogIn');
const Profile = require('./components/Profile');
const DisplayMessages= require('./components/DisplayMessages');
const DisplayMessagesB= require('./components/DisplayMessagesB');
render((
  
  <Provider store={store}>
    <BrowserRouter>
      <div>
     
       
        <Route exact path="/" component={Main}/>
        <Route path="/books" component={RIreports}/>
        
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogIn}/>
        <Route path="/profile" component={Profile}/>
       {/*  < DisplayMessages />*/}
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));