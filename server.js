// init project
const express = require('express');
const app = express();
// book search "engine"
const reports = require('google-books-search');
// dotenv
require('dotenv').config()
// body-parser
const bodyParser = require('body-parser');
// cookie-parser
const cookieParser = require('cookie-parser');
// passport
const passport = require('passport');
// bcrypt - hashing passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;
// session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// assert
const assert = require('assert');
//require/import the mongodb native drivers
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// using Node.js `require()`
const mongoose = require('mongoose');
// connection URL
const url = process.env.MONGOLAB_URI;      
// connection
//error here below
const promise_connection = mongoose.connect(url, { 	useMongoClient: true });

/* To Do: see Anon Message Board https://impossible-petalite.glitch.me/ for good connection

try
const promise_connection = mongoose.connect(url,{useNewUrlParser: true 
    //, useUnifiedTopology: true                                                })
.then(() => console.log("Success"))
.catch(err => console.log(err)); 


/*/



let db = mongoose.connection;
// if connection is success
promise_connection.then(function(db){
	console.log('Connected to mongodb');
});




/******************************/
// set store
/******************************/
let store = new MongoDBStore(
      {
        uri: url,
        collection: "sessions"
      });
 // Catch errors
    store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });
/***********************************/
// set USEs
/***********************************/
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ 
  extended: true
}));
/***/
app.use(cookieParser())
/***/
app.use(session({
  secret: process.env.COOKIE_SECRET,
  cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
      },
  store: store,
  resave: false,
  saveUninitialized: false
  //cookie: { secure: true }
}));
/***/
app.use(passport.initialize());
app.use(passport.session());
/***/
app.use(express.static('public'));
/***********************************/

/******************************/
// mongoDB models and schemas
/******************************/
// if connection is success
promise_connection.then(function(db){
	console.log('Connected to mongodb');
});
// describe the schema
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
let userSchema = new Schema({
  inspname: String,
      email: String,
      password: String,
      dep: String});
  
let reportSchema = new Schema({
   /* inspname: String,
    email: String,
    password: String,
    city: String,
    street: String,
    books: [],
    income: [],
    outcome: []*/
    inspector: String,
    email: String,
    password: String,
    supplier: String,
    daterec:Date,
    dateinsp:Date,
    wopomtt: String,
    no: String,
    destination:String,
    pn: String,
    description: String,
    lotsize: Number,
    samplesize: Number
});
// get the model
let reportModel = mongoose.model('reportsforri', reportSchema);
let userModel = mongoose.model('usersri', userSchema);

/***********************************/
// getting the layout(page) of application
app.get("*", function(request, response) {
  // prevent user from getting the wrong page when user is authenticated or not
  if((request.path == "/reports" || request.path == "/homepage") && request.isAuthenticated() === false) {
    response.redirect("/login");
  }
  else if((request.path == "/signup" || request.path == "/login") && request.isAuthenticated() === true) {
    response.redirect("/reports"); 
  }
  else {
   response.sendFile(__dirname + '/app/index.html');
  }
});

/******************************/
//       POST methods
/******************************/
app.post("/sign-up", function(request, response) {
  // check if email is already used
  userModel.find({ email: request.body["email"]}, function (err, document) {
              if(!err) {
                if(document.length == 0) {
                     // check if email is already used
                     userModel.find({ inspname: request.body["inspname"]}, function (err, document) {
                                if(!err) {
                                  if(document.length == 0) {
                                           //hash password
                                            bcrypt.hash(request.body["password"], saltRounds, function(err, hash) {
                                            
                                              //, street: "", books: [], income: [], outcome: []
                          // create a user
                    let obj = {inspname: request.body["inspname"], email: request.body["email"], password: hash, dep: request.body["dep"]};                    
                                                let user = new userModel(obj);
                                                user.save(function (err) {
                                                  if (!err) console.log('Success!');
                                                      // login after registration
                                                      userModel.find({inspname: request.body["inspname"], email: request.body["email"], password: hash}, function (err, document) {
                                                        if(!err) {
                                                          let user_id = document[0]["id"];
                                                          request.login(user_id, () => {
                                                            // send to user main page if error == zero
                                                               response.json({"error": 0});
                                                      });
                                                    }
                                                  });
                                              });
                                          });
                                }
                                else {
                                  response.json({"error": "inspname"});
                                }
                              }
                       });
                    }
                else if(document.length == 1) {
                 response.json({"error": "error"});
                }
            }
        });
});
/***********************************/
app.post("/log-in", function(request, response) {
              userModel.find({ email: request.body["email"]}, function (err, document) {
              if(!err) {
                if(document.length == 0) {
                  response.json({"error": "error0"});
                }
                else if(document.length == 1) {
                bcrypt.compare(request.body["password"], document[0]["password"], function(err, res) {
                if(res === true) {
                let user_id = document[0]["id"];
                request.login(user_id, () => {
                     response.json({"error": 0});
                           });
                        }
                  else if(res === false) {
                    response.json({"error": "error1"});
                  }
                   });
                }
            }
        });
});
/***********************************/
app.post("/log-out", function(request, response) {
          request.logout();
          request.session.destroy(function(err) {
          response.status(200).clearCookie('connect.sid', {path: '/'}).json({error: 0});
     })
});
/***********************************/
 //, street: document.street, books: document.books, income: document.income, outcome: document.outcome
  // in addition to check is loged in user also we get user inspname
 
app.post("/is-loged-in", function(request, response) {
 
  if(request.session.hasOwnProperty("passport")) {
   userModel.findById(request.session.passport.user, (err, document) => {
    if(!err) { response.json({isLogedIn: request.isAuthenticated(), inspname: document.inspname, dep: document.dep});  } 
    else { console.log("ERROR!: ", err);} 

   }
 
 );
  } 
         
  else {
        response.json({isLogedIn: request.isAuthenticated(), inspname: "0"}); 
    }
});
/***********************************/
app.post("/set-dep", function(request, response) {
  userModel.findById(request.session.passport.user, (err, user) => {
  if (err) throw err;
  user.set({dep: request.body["dep"]});
  user.save(function (err, updatedUser) {
  if (err) throw err;
  response.json({update: true});
  });
 });
 });


/* ********************************* */
/*
app.post("/set-street", function(request, response) {
      reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) throw err;
      user.set({street: request.body["street"]});
      user.save(function (err, updatedUser) {
        if (err) throw err;
        response.json({update: true});
      });
    });
});
*/
/* ********************************* */
/*
app.post("/get-street-city-by-nick", function(request, response) {
      reportModel.findOne({inspname: request.body["inspname"]}, (err, user) => {
      if (err) throw err;
      response.json({street: user.street, city: user.city});
    });
});
/***********************************/
app.post("/add-book", function(request, response) {
      reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) throw err;
        //search book img
        reports.search(request.body["bookname"], function(error, results) {
            if ( ! error ) {
                let arrayOfBooks = user.reports;
                arrayOfBooks.push({bookname:request.body["bookname"], img_url: results[0].thumbnail, inspname: user.inspname});
                user.set({reports: arrayOfBooks});
                user.save(function (err, updatedUser) {
                  if (err) throw err;
                  response.json({update: true});
                });
            } else {
                console.log(error);
            }
        });  
    });
});
/***********************************/
app.post("/get-all-users-reports", function(request, response) {
       reportModel.find({}, (err, users) => {
          if(err) throw err;
          let reports = []          
         
          for(let i = 0; i < users.length; i++) {
            for(let j = 0; j < users[i].reports.length; j++) {
              // function for filtering
               function checkBookName(el) {
                 return el.chosenBook == users[i].reports[j].bookname;
               }
              let filteredIncome = users[i].income.filter(checkBookName);
              let filteredOutcome = users[i].outcome.filter(checkBookName);
              if((filteredIncome.length == 0) && (filteredOutcome.length == 0)) {
                reports.push(users[i].reports[j]);
              }
            }
            if(i == users.length - 1) response.json({reports: reports});
          }
       });
});
/***********************************/
app.post("/get-user-filtered-reports", function(request, response) {
       reportModel.findById(request.session.passport.user, (err, user) => {
          if (err) throw err;
          let reports = []          

            for(let j = 0; j < user.reports.length; j++) {
              // function for filtering
               function checkBookName(el) {
                 return el.chosenBook == user.reports[j].bookname;
               }
              let filteredIncome = user.income.filter(checkBookName);
              let filteredOutcome = user.outcome.filter(checkBookName);
              if((filteredIncome.length == 0) && (filteredOutcome.length == 0)) {
                reports.push(user.reports[j]);
              }
            }
         
          response.json({reports: reports});
     });
});
/***********************************/
app.post("/create-proposals", function(request, response) { 
  reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) response.json({error: 1});
       let arrayOfOutcome = user.outcome;
       arrayOfOutcome.push({chosenBook: request.body["chosenBook"], 
                            anotherUserinspname: request.body["anotherUserinspname"], 
                            chosenAnotherUserBook: request.body["chosenAnotherUserBook"]});
      user.set({outcome: arrayOfOutcome});
      user.save(function (err, updatedUser) {
                  if (err) response.json({error: 2});
                  reportModel.findOne({inspname: request.body["anotherUserinspname"]}, (err, anotherUser) => {
                      if (err) response.json({error: 3});
                    let arrayOfIncome = anotherUser.income;
                     arrayOfIncome.push({chosenBook: request.body["chosenAnotherUserBook"], 
                                          anotherUserinspname: user.inspname, 
                                          chosenAnotherUserBook: request.body["chosenBook"]});
                    anotherUser.set({income: arrayOfIncome});
                    anotherUser.save((err, updatedAnotherUser) => {
                      response.json({error: 0});
                    });
                  });
                });
    });
});
/***********************************/
app.post("/refuse-proposal", function(request, response) { 
  reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) response.json({error: 1});
        function checkProposal(element, index, array) {
              if((element.chosenBook == request.body["chosenBook"]) &&
                 (element.anotherUserinspname == request.body["anotherUserinspname"]) &&
                 (element.chosenAnotherUserBook == request.body["chosenAnotherUserBook"])) {
                  return true
              }
              else {
                return false;
              }
            }
       let arrayOfOutcome = user.outcome;
       arrayOfOutcome.splice(arrayOfOutcome.findIndex(checkProposal), 1);
      user.set({outcome: arrayOfOutcome});
      user.save(function (err, updatedUser) {
                  if (err) response.json({error: 2});
                  reportModel.findOne({inspname: request.body["anotherUserinspname"]}, (err, anotherUser) => {
                      if (err) response.json({error: 3});
                    let arrayOfIncome = anotherUser.income;
                     arrayOfIncome.splice(arrayOfIncome.findIndex(checkProposal), 1);
                    anotherUser.set({income: arrayOfIncome});
                    anotherUser.save((err, updatedAnotherUser) => {
                      response.json({error: 0});
                    });
                  });
                });
    });
});
/***********************************/
app.post("/accept-proposal", function(request, response) { 
  reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) response.json({error: 1});
        function checkProposal(element, index, array) {
              if((element.chosenBook == request.body["chosenBook"]) &&
                 (element.anotherUserinspname == request.body["anotherUserinspname"]) &&
                 (element.chosenAnotherUserBook == request.body["chosenAnotherUserBook"])) {
                  return true
              }
              else {
                return false;
              }
            }
        function checkBooknameUser(element, index, array) {
                  if(element.bookname == request.body["chosenBook"]) {
                      return true
                  }
                  else {
                    return false;
                  }
                }
        function checkBooknameAnotherUser(element, index, array) {
                      if(element.bookname == request.body["chosenAnotherUserBook"]) {
                          return true
                      }
                      else {
                        return false;
                      }
                    }
        let arrayOfIncome = user.income;
        //search book img
        reports.search(request.body["chosenAnotherUserBook"], function(error, results) {
            if ( ! error ) {
                let arrayOfBooks = user.reports;
                arrayOfBooks.splice(arrayOfBooks.findIndex(checkBooknameUser), 1);
                arrayOfBooks.push({bookname:request.body["chosenAnotherUserBook"], img_url: results[0].thumbnail, inspname: user.inspname});
                user.set({reports: arrayOfBooks});
                
                arrayOfIncome.splice(arrayOfIncome.findIndex(checkProposal), 1);
                user.set({income: arrayOfIncome});
              
                user.save(function (err, updatedUser) {
                            if (err) response.json({error: 2});
                            reportModel.findOne({inspname: request.body["anotherUserinspname"]}, (err, anotherUser) => {
                                if (err) response.json({error: 3});
                               //search book img
                                reports.search(request.body["chosenBook"], function(error, results) {
                                    if (!error) {
                                        let arrayOfBooks = anotherUser.reports;
                                      
                                        arrayOfBooks.splice(arrayOfBooks.findIndex(checkBooknameAnotherUser), 1);
                                      
                                        arrayOfBooks.push({bookname:request.body["chosenBook"], img_url: results[0].thumbnail, inspname: anotherUser.inspname});
                                        anotherUser.set({reports: arrayOfBooks});
                                      
                                        let arrayOfOutcome = anotherUser.outcome;
                                        arrayOfOutcome.splice(arrayOfOutcome.findIndex(checkProposal), 1);
                                        anotherUser.set({outcome: arrayOfOutcome});
                                        anotherUser.save((err, updatedAnotherUser) => {
                                          response.json({error: 0});
                                        });
                                        
                                    } else {
                                        console.log(error);
                                    }
                                });
                            });
                          });
              
            } else {
                console.log(error);
            }
        }); 
    });
});
/***********************************/
app.post("/refuse-proposal-income", function(request, response) { 
  reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) response.json({error: 1});
        function checkProposal(element, index, array) {
              if((element.chosenBook == request.body["chosenBook"]) &&
                 (element.anotherUserinspname == request.body["anotherUserinspname"]) &&
                 (element.chosenAnotherUserBook == request.body["chosenAnotherUserBook"])) {
                  return true
              }
              else {
                return false;
              }
            }
        let arrayOfIncome = user.income;
        arrayOfIncome.splice(arrayOfIncome.findIndex(checkProposal), 1);
      user.set({income: arrayOfIncome});
      user.save(function (err, updatedUser) {
                  if (err) response.json({error: 2});
                  reportModel.findOne({inspname: request.body["anotherUserinspname"]}, (err, anotherUser) => {
                      if (err) response.json({error: 3});
                    let arrayOfOutcome = anotherUser.outcome;
                    arrayOfOutcome.splice(arrayOfOutcome.findIndex(checkProposal), 1);
                    anotherUser.set({outcome: arrayOfOutcome});
                    anotherUser.save((err, updatedAnotherUser) => {
                      response.json({error: 0});
                    });
                  });
                });
    });
});
/******************************/
// user sessions handlers:
/******************************/
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});
// listen for requests
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
