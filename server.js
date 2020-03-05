// init project
const express = require('express');
// for file upload
const multer  = require('multer');

//react-html-table-to-excel

const app = express();
const books = require('google-books-search');
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
//to fix error: DeprecationWarning: Mongoose: mpromise 
mongoose.Promise = global.Promise;
// connection URL
const url = process.env.MONGOLAB_URI;   

// connection
//error here below
const promise_connection = mongoose.connect(url, { 	useMongoClient: true });
//const storage = new GridFsStorage({ url: url});
//const GridFsStorage = require('multer-gridfs-storage');
//const storage = new GridFsStorage({ db: promise_connection });
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
//using the middleware Multer to upload the photo on the server side.

//app.use(multer({ dest: "./uploads/",  rename: function (fieldname, filename) { return filename; },}));
app.use(multer({dest:'./public/images/uploads'}).any());



/******************************/
// mongoDB models and schemas
/******************************/
// if connection is success
promise_connection.then(function(db){
	//console.log('Connected to mongodb');
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
  reportID: String,
  inspector: String, 
  daterec:Date,
   Gwo: String,
//created: Date,
cwo: Date,
dwo: String,
ewo: String,
fwo: String,
hwo: String,

iwo: String,
jwo: Date,
kwo: String,
lwo: String,  

mwo: String,
nwo: String,
owo:Number,
pwo:Number,
qwo:Number, //qty fail
record: String,
rwo:Number,
swo: String,
//title: String,
two: String, //pass-fail
uwo:  String,
//uwo:  {data: Buffer, contentType: String },
  record:String,
  modified:Number
});
// get the model
let reportModel = mongoose.model('reportsforri', reportSchema);
let userModel = mongoose.model('usersri', userSchema);

/***********************************/
// getting the layout(page) of application
app.get("*", function(request, response) {
  // prevent user from getting the wrong page when user is authenticated or not
  if((request.path == "/list" || request.path == "/reports" || request.path == "/homepage") && request.isAuthenticated() === false) {
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
  console.log("expected an email below when login: ");
  console.log(request.body["email"]);
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
let nDocs; 
app.post("/add-report", function(request, response) {
// reportModel.findById(request.session.passport.user, (err, user) => {
  //if (err) throw err; 
   //get the number of documents
reportModel.find({}, (err, docs) => {
  if (err) throw err;        
 nDocs= docs.length +100000200 ;//7000;
 console.log(" nDoc= "  +nDocs) ;
//_____________________________

console.log(" nDoc1= "  +nDocs) ;
    // create a report

let obj =  {
//reportID: request.body["reportID"],   request.body._id;

reportID:  nDocs, 
daterec: request.body["daterec"], 
inspector: request.body["inspector"], 
Gwo: request.body["Gwo"], 

cwo: request.body["cwo"], 
dwo: request.body["dwo"], 
ewo: request.body["ewo"], 
fwo: request.body["fwo"], 
hwo: request.body["hwo"], 

iwo: request.body["iwo"], 
jwo: request.body["jwo"], 
kwo: request.body["kwo"],
lwo: request.body["lwo"], //photo string
mwo: request.body["mwo"], 
nwo: request.body["nwo"], 
owo: request.body["owo"], 
pwo: request.body["pwo"], 
qwo: request.body["qwo"], 
rwo: request.body["rwo"], 
swo: request.body["swo"], 
two: request.body["two"], 
record: request.body["record"],
uwo: request.body["uwo"] //photo file
 

};

console.log(obj);
 
    let report = new reportModel(obj);
          
            report.save(function (err) {
              //if (err) throw err;
              if (!err) console.log('Success!');
              response.json({"error": 0});
              
            });
//_____________________________

    });


        
   
// });
});
/***********************************/
//add-upload' not used does not work;

app.post("/add-upload", function(request, response) {
reportModel.find({}, (err, docs) => {
  if (err) throw err;        
 nDocs= docs.length + 100000200 ; //6000;
 //console.log(" nDoc= "  +nDocs) ;
let obj =  {
reportID:  nDocs, 
uwo: request.body["image"] //photo file
};
//console.log(obj); 
    let report = new reportModel(obj);          
            report.save(function (err) {
              //if (err) throw err;
              if (!err) console.log('Success!');
              response.json({"error": 0});              
            });
    });

});

/***********************************/
/*
app.post("/add-report", function(request, response) {
      reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) throw err;
        //search book img
        reports.search(request.body["reportnumber"], function(error, results) {
            if ( ! error ) {
                let arrayOfBooks = user.reports;
              //  arrayOfBooks.push({reportnumber:request.body["reportnumber"], img_url: results[0].thumbnail, inspname: user.inspname});
              arrayOfBooks.push({reportnumber:request.body["reportnumber"],  inspname: user.inspname});
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


*/
/***********************************/








app.post("/get-all-users-reports", function(request, response) {
       reportModel.find({}, (err, docs) => {
          if(err) throw err;
          let reports = []   ;
       
         // for(let i = 0; i < docs.length; i++) {
          for(let i = docs.length-1; i > -1; i--) {
         //   for(let j = 0; j < users[i].reports.length; j++) {              
               /* // function for filtering
               function checkBookName(el) {
                 return el.chosenBook == users[i].reports[j].reportnumber;
               }              
            let filteredIncome = users[i].income.filter(checkBookName);
              let filteredOutcome = users[i].outcome.filter(checkBookName);
              if((filteredIncome.length == 0) && (filteredOutcome.length == 0)) {
                reports.push(users[i].reports[j]);
              } */
           // }            
            reports.push(docs[i]);
           // if(i == docs.length - 1) response.json({reports: reports});
            if(i == 0) response.json({reports: reports});

          }
       });
});
/**  here err1  ********************************
 * get-user-filtered-reports for listLink  edit/delete
 * userModel.findById(request.session.passport.user
*/
app.post("/get-user-filtered-reports", function(request, response) {
   userModel.findById(request.session.passport.user, (err, user) => {
       if (err) throw err;
     let NN=user.inspname;     
     // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         reportModel.find({}, (err, docs) => {
          if(err) throw err;
          let reports = []   ;
          for(let i = docs.length-1; i > -1; i--) {
         if(docs[i].inspector === NN) { reports.push(docs[i]);}   
            /* 
              ["reportsLink"]: "/reports",
             ["listLink"]: "/reports"            */              
            if(i == 0) response.json({reports: reports});

          }
       });
    
     });
});
/***********************************/
//create-filtered-table2

app.post("/create-filtered-table2", function(request, response) {
   reportModel.find(
     {"Gwo":request.body["Gwo"], //Model
     "fwo":request.body["fwo"], //pn
     "inspector":request.body["inspector"]
                      // "Gwo":request.body["Gwo"]
                       
                       } , 
     (err, doc) => {
     
     if (err) throw err;
    // let NN=user.inspname;     
     // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
          response.json(doc);
    
    // });
});



  app.post("/report-edit", function(request, response) {  
   reportModel.findOne({"reportID":request.body["reportID"]}, (err, doc) => {
 // console.log("request: ");
  //  console.log(request); 
      if (err) throw err;
            response.json(doc);
          }        
     );
});
/***********************************/

/*app.post("/set-dep", function(request, response) {
  userModel.findById(request.session.passport.user, (err, user) => {
  if (err) throw err;
  user.set({dep: request.body["dep"]});
  user.save(function (err, updatedUser) {
  if (err) throw err;
  response.json({update: true});
  });
 });
 }); */

app.post("/set-report", function(request, response) {  
   reportModel.findOne({"_id":request.body["_id"]}, (err, doc) => {
  if (err) throw err;
    console.log("doc: ");
     console.log(doc);
  doc.set({   
daterec: request.body["daterec"],  
Gwo: request.body["Gwo"], 
cwo: request.body["cwo"], 
dwo: request.body["dwo"], 
ewo: request.body["ewo"], 
fwo: request.body["fwo"], 
hwo: request.body["hwo"], 
iwo: request.body["iwo"], 
jwo: request.body["jwo"], 
kwo: request.body["kwo"],
lwo: request.body["lwo"], //photo string
mwo: request.body["mwo"], 
nwo: request.body["nwo"], 
owo: request.body["owo"], 
//pwo: request.body["pwo"], 
qwo: request.body["qwo"], 
//rwo: request.body["rwo"], 
swo: request.body["swo"], 
two: request.body["two"], 
record: request.body["record"],
uwo: request.body["uwo"] //photo file   
  });
     
  // doc.save();

     
     doc.save(function (err) {
              
         if (err) throw err;
           response.json({error: 0})               
            });
     
     
 //    (function (err, updatedDoc) {  if (err) throw err;
    
  // response.json({error: 0})
     
    /* user.save(function (err, updatedUser) {
  if (err) throw err;
  response.json({update: true});
  });
    
    
    
     doc.save(function (err) {
              
              if (!err) console.log('Success!');
              response.json({"error": 0});              
            });
            
   ---------------------------------
    doc.save(function (err) {
              
           //   if (!err) console.log('Success! on saving edited RIfile');
                if (!err){ doc.save(); 
              response.json({"error": 0}); }else{
                response.json({"error": 55})
                console.log('not Success! on saving edited RIfile');
                                                }             
            });
     
            
    */ 
     
     
 // });
     
     
   });
});






/***********************************/

  app.post("/report-view", function(request, response) {  
   reportModel.findOne({"reportID":request.body["reportID"]}, (err, doc) => {

          });
});
/***********************************/

app.post("/up-many-records", function(request, response) {   
   console.log(request.body.record);
   // reportModel.create( request.body.record, function(err) {   
  //reportModel.create( [ ]    , function(err) {    console.log(err); // });
  
   response.json({error: 0});
      }        
     );

/* 

reportModel.insertMany(request.body.record)
    .then(function (docs) {
        response.json(docs);
    })
    .catch(function (err) {
        response.status(500).send(err);
    });

app.post("/up-many-records", function(request, response) {  
   reportModel.create(request, (err, doc) => {
  console.log("up-many-records request: ");   
  
 let arrayOfReps=request.body.record;  
       console.log(arrayOfReps); 
        reportModel.create(arrayOfReps, doc, err) 
     if (err) throw err;
        
   });
  

 
     console.log("created ");
     response.json({error: 0});

          }
        
     );

  
     doc.save(function (err) {
              
         if (err) throw err;
           response.json({error: 0})               
            });
[ {reportID : "8027" ,Gwo : "AT-2914SP" },[ {reportID : "8028" ,Gwo : "AT-2914SP" }]
created 


var createManyPeople = function(arrayOfPeople, done) {
Person.create(arrayOfPeople, function (err, data) {
if (err) {done(err);}
done(null, data);
});

};





*/




/***********************************/




app.post("/create-proposals", function(request, response) { 
  reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) response.json({error: 1});
       let arrayOfOutcome = user.outcome;
       arrayOfOutcome.push({chosenBook: request.body["chosenBook"], 
                            anotherUserinspname: request.body["anotherUserinspname"], 
                            chosenAnotherUserReport: request.body["chosenAnotherUserReport"]});
      user.set({outcome: arrayOfOutcome});
      user.save(function (err, updatedUser) {
                  if (err) response.json({error: 2});
                  reportModel.findOne({inspname: request.body["anotherUserinspname"]}, (err, anotherUser) => {
                      if (err) response.json({error: 3});
                    let arrayOfIncome = anotherUser.income;
                     arrayOfIncome.push({chosenBook: request.body["chosenAnotherUserReport"], 
                                          anotherUserinspname: user.inspname, 
                                          chosenAnotherUserReport: request.body["chosenBook"]});
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
                 (element.chosenAnotherUserReport == request.body["chosenAnotherUserReport"])) {
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
/*
app.post("/accept-proposal", function(request, response) { 
  reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) response.json({error: 1});
        function checkProposal(element, index, array) {
              if((element.chosenBook == request.body["chosenBook"]) &&
                 (element.anotherUserinspname == request.body["anotherUserinspname"]) &&
                 (element.chosenAnotherUserReport == request.body["chosenAnotherUserReport"])) {
                  return true
              }
              else {
                return false;
              }
            }
        function checkBooknameUser(element, index, array) {
                  if(element.reportnumber == request.body["chosenBook"]) {
                      return true
                  }
                  else {
                    return false;
                  }
                }
        function checkBooknameAnotherUser(element, index, array) {
                      if(element.reportnumber == request.body["chosenAnotherUserReport"]) {
                          return true
                      }
                      else {
                        return false;
                      }
                    }
        let arrayOfIncome = user.income;
        //search book img
        reports.search(request.body["chosenAnotherUserReport"], function(error, results) {
            if ( ! error ) {
                let arrayOfBooks = user.reports;
                arrayOfBooks.splice(arrayOfBooks.findIndex(checkBooknameUser), 1);
                arrayOfBooks.push({reportnumber:request.body["chosenAnotherUserReport"], img_url: results[0].thumbnail, inspname: user.inspname});
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
                                      
                                        arrayOfBooks.push({reportnumber:request.body["chosenBook"], img_url: results[0].thumbnail, inspname: anotherUser.inspname});
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

*/
/***********************************/
app.post("/refuse-proposal-income", function(request, response) { 
  reportModel.findById(request.session.passport.user, (err, user) => {
      if (err) response.json({error: 1});
        function checkProposal(element, index, array) {
              if((element.chosenBook == request.body["chosenBook"]) &&
                 (element.anotherUserinspname == request.body["anotherUserinspname"]) &&
                 (element.chosenAnotherUserReport == request.body["chosenAnotherUserReport"])) {
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

   