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
const HomePage = require('./components/HomePage');
const DisplayMessages= require('./components/DisplayMessages');
const DisplayMessagesB= require('./components/DisplayMessagesB');
render((
  
  <Provider store={store}>
    <BrowserRouter>
      <div>
     
       
        <Route exact path="/" component={Main}/>
      
        
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogIn}/>
        <Route path="/homepage" component={HomePage}/>
        <Route path="/reports" component={RIreports}/>
       {/*  < DisplayMessages />
         <Route path="/reports" component={RIreports}/>
        <Route path="/books" component={RIreports}/>*/}
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));