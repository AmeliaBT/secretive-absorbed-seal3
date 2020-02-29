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
const RIlist = require('./components/RIlist');
const RIlistAll = require('./components/RIlistAll'); //change
const RIlistAll2 = require('./components/RIlistAll2'); 
const RIedit = require('./components/RIedit');
const RIview = require('./components/RIview');
const SignUp = require('./components/SignUp');
const LogIn = require('./components/LogIn');
const HomePage = require('./components/HomePage');
const FilterA = require('./components/FilterA');
//const DisplayMessages= require('./components/DisplayMessages');
//const DisplayMessagesB= require('./components/DisplayMessagesB');
const ManyRecords =require('./components/ManyRecords');
//  <Route path="/report-edit" component={RIedit}/>
//<Route path='/:handle' component={Profile} />
render((
  
  <Provider store={store}>
    <BrowserRouter>
      <div>
     
       
        <Route exact path="/" component={Main}/>
      
        
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogIn}/>
        <Route path="/homepage" component={HomePage}/>
        <Route path="/reports" component={RIreports}/>
         <Route path="/list" component={RIlist}/>
         <Route path="/list-all" component={RIlistAll}/>
         <Route path="/list-all2" component={RIlistAll2}/>
        <Route path="/report-edit" component={RIedit}/>
        <Route path="/report-view" component={RIview}/>
         <Route path="/up-many-records" component={ManyRecords}/>
          {/*< DisplayMessages />
         <Route path="/reports" component={RIreports}/>
        <Route path="/books" component={RIreports}/>*/}
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));