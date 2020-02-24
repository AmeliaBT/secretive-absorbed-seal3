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
 nDocs= docs.length +7000;
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
//add-upload'

app.post("/add-upload", function(request, response) {
reportModel.find({}, (err, docs) => {
  if (err) throw err;        
 nDocs= docs.length +6000;
 console.log(" nDoc= "  +nDocs) ;


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
   // console.log(request.body.record)
   // reportModel.create( request.body.record, function(err) { 
  
  reportModel.create( request.body.record, function(err) { 
   [
    {
        "Gwo": "XyzT-iYZG746YZOD-PKG3",
        "xid": "1",
        "created": "1354294261591",
        "cwo": "11/30/2012",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-002993-10",
        "hwo": "YZ",
        "inspector": "Tuan",
        "iwo": "4.2.1",
        "jwo": "11/15/2012",
        "kwo": "24491",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20121115_142817.jpg",
        "modified": "1358543948278",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "50",
        "pwo": "20",
        "qwo": "0",
        "record": "D004604 applied",
        "rwo": "0",
        "swo": "",
       "reportID": "1000001",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG746YZOD-PKG3",
        "xid": "2",
        "created": "1354295052084",
        "cwo": "11/30/2012",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-002877-00",
        "hwo": "H",
        "inspector": "Tuan",
        "iwo": "3.8.02-25",
        "jwo": "11/15/2012",
        "kwo": "24512",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20121115_142347.jpg",
        "modified": "1360706623767",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "5",
        "pwo": "5",
        "qwo": "0",
        "record": "wo# 24512, XyzTDG, convert fr pkg1 to pkg3",
        "rwo": "0",
        "swo": "",
       "reportID": "1000002",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-8100MM/24POE-10",
        "xid": "3",
        "created": "1357940982106",
        "cwo": "1/11/2013",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-003093-10",
        "hwo": "D004672",
        "inspector": "Tuan",
        "iwo": "ats-8100-2.2.4.5-Patch",
        "jwo": "1/11/2013",
        "kwo": "518656",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130111_135216.jpg",
        "modified": "1387494551173",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "D004672 applied. This s/w for MMO# 518651 only.",
        "rwo": "0",
        "swo": "",
       "reportID": "1000003",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-27YZINI-XyzXyz-001",
        "xid": "4",
        "created": "1359500056187",
        "cwo": "1/29/2013",
        "dwo": " PO",
        "ewo": "XyzTMMN",
        "fwo": "123-003674-001",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "n/a",
        "jwo": "1/29/2013",
        "kwo": "GOUXyz6523",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130129_150148.jpg",
        "modified": "1359501761474",
        "mwo": " FXyzCTONNY",
        "nwo": " FGI",
        "owo": "100",
        "pwo": "20",
        "qwo": "0",
        "record": "First lot rec'd after production release. ",
        "rwo": "0",
        "swo": "",
       "reportID": "1000004",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-8100MM/24POE-10",
        "xid": "5",
        "created": "1360360165378",
        "cwo": "2/8/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-003093-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "2/8/2013",
        "kwo": "24766",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130208_135404.jpg",
        "modified": "1360693144777",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "NNeconfig -50 to -10, \"KC\" label removed.",
        "rwo": "0",
        "swo": "",
       "reportID": "1000005",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZC101XL-30",
        "xid": "6",
        "created": "1360362565136",
        "cwo": "2/8/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-000444-30",
        "hwo": "H",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "2/8/2013",
        "kwo": "24778",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130208_143407.jpg",
        "modified": "1365786181744",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "NNcf fr -10 to -30, using p/s kit 814-000528.",
        "rwo": "0",
        "swo": "",
       "reportID": "1000006",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG746YZOD-YZXyzIN",
        "xid": "7",
        "created": "1360618070726",
        "cwo": "2/11/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-002628-00",
        "hwo": "k",
        "inspector": "Tuan",
        "iwo": "3-8-02_25",
        "jwo": "2/11/2013",
        "kwo": "24780",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130211_133630.jpg",
        "modified": "1365713527213",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "NNeconf fr pkg 1 to main. Note: main unit will not have blank pannel.",
        "rwo": "0",
        "swo": "",
       "reportID": "1000007",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZC1004-10",
        "xid": "8",
        "created": "1360619165388",
        "cwo": "2/11/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-001045-10",
        "hwo": "g",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "2/11/2013",
        "kwo": "24781",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130211_135002.jpg",
        "modified": "1363133423819",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "50",
        "pwo": "20",
        "qwo": "0",
        "record": "NNeconfig -60 to -10.",
        "rwo": "0",
        "swo": "",
       "reportID": "1000008",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZC102XL-40",
        "xid": "9",
        "created": "1360620207874",
        "cwo": "2/11/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-000445-40",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "2/11/2013",
        "kwo": "24783",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130211_140623.jpg",
        "modified": "1363126680715",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "NNeconfig -10 to -40",
        "rwo": "0",
        "swo": "",
       "reportID": "1000009",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG634WXyz-NN2-10",
        "xid": "10",
        "created": "1364404623425",
        "cwo": "3/27/2013",
        "dwo": " YZTT",
        "ewo": "XXyzVI",
        "fwo": "123-002384-10",
        "hwo": "D",
        "inspector": "Tuan",
        "iwo": "3-8-105",
        "jwo": "3/27/2013",
        "kwo": "1359DIXyz49",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130327_103033.jpg",
        "modified": "1364482655471",
        "mwo": " Jim J",
        "nwo": " FGI",
        "owo": "97",
        "pwo": "20",
        "qwo": "0",
        "record": "Chassis screened by Jim J. 34 pcs to XFG 115, 63 pcs to FGI.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000010",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-GMM950/8-10",
        "xid": "11",
        "created": "1364408854676",
        "cwo": "3/27/2013",
        "dwo": " WO",
        "ewo": "CXyzYZEO",
        "fwo": "123-003126-10",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "v1.1.3",
        "jwo": "3/27/2013",
        "kwo": "24979",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130327_113008.jpg",
        "modified": "1364482647440",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "NNeconf -50 to -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000011",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-8000MM/16-10",
        "xid": "12",
        "created": "1365713202329",
        "cwo": "4/11/2013",
        "dwo": " WO",
        "ewo": "DELTXyz NETWONNKMM",
        "fwo": "123-000825-10",
        "hwo": "x",
        "inspector": "Helen, ",
        "iwo": "na",
        "jwo": "4/11/2013",
        "kwo": "9320765",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130412_101439.jpg",
        "modified": "1365786992381",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "80",
        "pwo": "20",
        "qwo": "0",
        "record": "Baker Hughes MMO# 52192, switch-config.cfg installed, see FTP/NNI-H/Photo_QXyz_NNI for config file. Xyznd see test team for s/n.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000012",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZC103XL-10",
        "xid": "13",
        "created": "1365713528636",
        "cwo": "4/11/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-000446-10",
        "hwo": "c",
        "inspector": "Helen, ",
        "iwo": "na",
        "jwo": "4/11/2013",
        "kwo": "9320349",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130411_135610.jpg",
        "modified": "1366215611211",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "70",
        "pwo": "20",
        "qwo": "0",
        "record": "NNeconfig -60change to",
        "rwo": "0",
        "swo": "",
       "reportID": "10000013",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/YZT-901",
        "xid": "14",
        "created": "1366317666359",
        "cwo": "4/18/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-000752-901",
        "hwo": "P",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "4/18/2013",
        "kwo": "24964",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130418_134731.jpg",
        "modified": "1366318127650",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "200",
        "pwo": "20",
        "qwo": "0",
        "record": "Tested after converted by Proto MMervices.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000014",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG2524 1BX 2FXMM 4GBE LF",
        "xid": "15",
        "created": "1366320519257",
        "cwo": "4/18/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-003256-00",
        "hwo": "J",
        "inspector": "Tuan",
        "iwo": "4.2.2",
        "jwo": "4/18/2013",
        "kwo": "24893",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130418_143317.jpg",
        "modified": "1366320903370",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "40",
        "pwo": "20",
        "qwo": "0",
        "record": "D004650 applied.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000015",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-250G-B",
        "xid": "16",
        "created": "1366404440647",
        "cwo": "4/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-000635-00",
        "hwo": "V",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "4/19/2013",
        "kwo": "25025",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130419_135017.jpg",
        "modified": "1366413322307",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Tested for Trenton Tel. MMee test dept for details.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000016",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-253G",
        "xid": "17",
        "created": "1366404668046",
        "cwo": "4/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-002420-00",
        "hwo": "P",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "4/19/2013",
        "kwo": "25027",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130419_135416.jpg",
        "modified": "1366642523636",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Tested for Trenton Tel. MMee test dept for details.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000017",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-401-C",
        "xid": "18",
        "created": "1366404956499",
        "cwo": "4/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-002024-00",
        "hwo": "YZ",
        "inspector": "Tuan",
        "iwo": "NN15.0.2",
        "jwo": "4/19/2013",
        "kwo": "25026",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130419_135826.jpg",
        "modified": "1366642607709",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Tested for Tentron Tel. MMee test dept for details.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000018",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-409-Xyz",
        "xid": "19",
        "created": "1366405191937",
        "cwo": "4/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-002386-00",
        "hwo": "H",
        "inspector": "Tuan",
        "iwo": "NN15.0.2",
        "jwo": "4/19/2013",
        "kwo": "25028",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130419_140427.jpg",
        "modified": "1366643049615",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "Tested for Trenton Tel. MMee test dept for details.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000019",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-301-C",
        "xid": "20",
        "created": "1366405575365",
        "cwo": "4/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-000594-01",
        "hwo": "G",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "4/19/2013",
        "kwo": "25029",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130419_141125.jpg",
        "modified": "1366643107436",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "6",
        "pwo": "6",
        "qwo": "0",
        "record": "Tested for Trenton Tel. MMee test dept for details.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000020",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-143-Xyz",
        "xid": "21",
        "created": "1366405939685",
        "cwo": "4/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003058-00",
        "hwo": "K",
        "inspector": "Tuan",
        "iwo": "NN15.0.1",
        "jwo": "4/19/2013",
        "kwo": "25030",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130419_141420.jpg",
        "modified": "1366643319449",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "Tested for Trenton Tel. MMee test dept for details.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000021",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-123-C",
        "xid": "22",
        "created": "1366406105853",
        "cwo": "4/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-001491-01",
        "hwo": "K",
        "inspector": "Tuan",
        "iwo": "NN14.0.5",
        "jwo": "4/19/2013",
        "kwo": "25031",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130419_141712.jpg",
        "modified": "1366643198165",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "Tested for Trenton Tel. MMee test dept for details.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000022",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-144-Xyz",
        "xid": "23",
        "created": "1366406276790",
        "cwo": "4/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003078-00",
        "hwo": "L",
        "inspector": "Tuan",
        "iwo": "NN15.0.1 Gamma",
        "jwo": "4/19/2013",
        "kwo": "25032",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130419_141946.jpg",
        "modified": "1366643408101",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "3",
        "pwo": "3",
        "qwo": "0",
        "record": "Tested for Trenton Tel. MMee test dept for details.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000023",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2701FTXa/MMC-901",
        "xid": "24",
        "created": "1371226844021",
        "cwo": "6/13/2013",
        "dwo": " YZTT",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003166-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "6/13/2013",
        "kwo": "131072",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130614_092620.jpg",
        "modified": "1371227276073",
        "mwo": " NNCF",
        "nwo": "109 FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Tested by NNeconfig to site 109, MMO# EXyz62319.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000024",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2701FTXa/MMT-901",
        "xid": "25",
        "created": "1371227282727",
        "cwo": "6/14/2013",
        "dwo": " Packing list ",
        "ewo": "Proto MMervices",
        "fwo": "123-003167-901",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "6/14/2013",
        "kwo": "20961",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130614_093250.jpg",
        "modified": "1371227650156",
        "mwo": " NNCF",
        "nwo": " NNCF",
        "owo": "15",
        "pwo": "15",
        "qwo": "0",
        "record": "Proto MMervices reworked MMC to MMT, rwk instruction BB05-01-13.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000025",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG746YZOD-PKG3",
        "xid": "26",
        "created": "1371231154134",
        "cwo": "6/14/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-002877-00",
        "hwo": "H",
        "inspector": "Tuan",
        "iwo": "3-8-02-25",
        "jwo": "6/14/2013",
        "kwo": "25187",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130614_103525.jpg",
        "modified": "1371231715076",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "3",
        "pwo": "3",
        "qwo": "0",
        "record": "Convert  PKG1 to PKG3.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000026",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZC1004-10",
        "xid": "27",
        "created": "1371231451958",
        "cwo": "6/14/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-001045-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "6/14/2013",
        "kwo": "25186",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130614_104014.jpg",
        "modified": "1371231663727",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "15",
        "pwo": "15",
        "qwo": "0",
        "record": "Convert -60 to -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000027",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-FMM724L-50",
        "xid": "28",
        "created": "1371231775077",
        "cwo": "6/14/2013",
        "dwo": " WO",
        "ewo": "Cameo",
        "fwo": "123-002715-50",
        "hwo": "C",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "6/14/2013",
        "kwo": "25131",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130614_104837.jpg",
        "modified": "1371232300336",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "100",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert  -10 to -50",
        "rwo": "0",
        "swo": "",
       "reportID": "10000028",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2701FTXa/MMT-901",
        "xid": "29",
        "created": "1371232475783",
        "cwo": "6/14/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003167-901",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "6/14/2013",
        "kwo": "na61413",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130614_105759.jpg",
        "modified": "1371233073138",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "5",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert MMC to MMT.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000029",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPTX",
        "xid": "30",
        "created": "1376935206705",
        "cwo": "8/19/2013",
        "dwo": " YZTT",
        "ewo": "DELTXyz Electronics",
        "fwo": "123-001206-00",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/19/2013",
        "kwo": "131560",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130819_110424.jpg",
        "modified": "1376947374405",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test for eval/IPNN.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000030",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPMMX",
        "xid": "31",
        "created": "1376935490451",
        "cwo": "8/19/2013",
        "dwo": " YZTT",
        "ewo": "DELTXyz Electronics",
        "fwo": "123-001201-00",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/19/2013",
        "kwo": "131560",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130819_110650.jpg",
        "modified": "1376947497010",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test for eval/IPNN.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000031",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-P015-Xyz",
        "xid": "32",
        "created": "1376935648640",
        "cwo": "8/19/2013",
        "dwo": " YZTT",
        "ewo": "Eopto-Link",
        "fwo": "123-003771-00",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/19/2013",
        "kwo": "131560",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130819_110847.jpg",
        "modified": "1376947947841",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Test for eval/IPNN.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000032",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPBD20-13/I",
        "xid": "33",
        "created": "1376935796763",
        "cwo": "8/19/2013",
        "dwo": " YZTT",
        "ewo": "Eopto-Link",
        "fwo": "123-003878-00",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/19/2013",
        "kwo": "131560",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130819_111113.jpg",
        "modified": "1376948037834",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test for eval/IPNN.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000033",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG1425-10 NXyz PWNN LF",
        "xid": "34",
        "created": "1376936018847",
        "cwo": "8/19/2013",
        "dwo": " YZTT",
        "ewo": "XyzTDG",
        "fwo": "123-003494-10",
        "hwo": "G",
        "inspector": "Tuan",
        "iwo": "4.2.3",
        "jwo": "8/19/2013",
        "kwo": "131560",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130819_111434.jpg",
        "modified": "1376948239152",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Test for eval/IPNN.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000034",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG2426F",
        "xid": "35",
        "created": "1376936107170",
        "cwo": "8/19/2013",
        "dwo": " YZTT",
        "ewo": "XyzTDG",
        "fwo": "123-003612-00",
        "hwo": "D",
        "inspector": "Tuan",
        "iwo": "4.3.1_32",
        "jwo": "8/19/2013",
        "kwo": "131560",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130819_111606.jpg",
        "modified": "1376948474944",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test for eval/IPNN.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000035",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG022-010",
        "xid": "36",
        "created": "1376936205164",
        "cwo": "8/19/2013",
        "dwo": " YZTT",
        "ewo": "XyzTDG",
        "fwo": "123-003638-010",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/19/2013",
        "kwo": "131560",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130819_111748.jpg",
        "modified": "1376948608291",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Test for eval/IPNN.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000036",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x510-52GTX-10",
        "xid": "37",
        "created": "1376936408776",
        "cwo": "8/19/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003619-10",
        "hwo": "H",
        "inspector": "Tuan",
        "iwo": "V5.4.2Xyz-0.1",
        "jwo": "8/19/2013",
        "kwo": "25338",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130819_112229.jpg",
        "modified": "1376948678118",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "27",
        "pwo": "20",
        "qwo": "0",
        "record": "D004795 applied.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000037",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-NN015-Xyz",
        "xid": "38",
        "created": "1377021573776",
        "cwo": "8/20/2013",
        "dwo": " WO",
        "ewo": "Valere",
        "fwo": "123-97291-00",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/20/2013",
        "kwo": "NNI-25374",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130820_110330.jpg",
        "modified": "1377032387651",
        "mwo": " FXyzCTONNY",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Valere p/n: CXyz210203104.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000038",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-NN027-Xyz",
        "xid": "39",
        "created": "1377021909391",
        "cwo": "8/20/2013",
        "dwo": " WO",
        "ewo": "Valere",
        "fwo": "123-97303-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/20/2013",
        "kwo": "NNI-25373",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130820_110817.jpg",
        "modified": "1377032642775",
        "mwo": " FXyzCTONNY",
        "nwo": " FGI",
        "owo": "9",
        "pwo": "9",
        "qwo": "0",
        "record": "Valere p/n: CBB030YZ. Xyzirpax p/n: LYZLK1-1NNMM5-32846-30-V.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000039",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-NN181-Xyz",
        "xid": "40",
        "created": "1377022470124",
        "cwo": "8/20/2013",
        "dwo": " WO",
        "ewo": "Valere",
        "fwo": "123-003189-00",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/20/2013",
        "kwo": "NNI-25376",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130820_111730.jpg",
        "modified": "1377032752467",
        "mwo": " FXyzCTONNY",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Valere p/n: CK4MM-XyzNL-VC.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000040",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-NN142-Xyz",
        "xid": "41",
        "created": "1377022758344",
        "cwo": "8/20/2013",
        "dwo": " WO",
        "ewo": "Valere",
        "fwo": "123-002054-00",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/20/2013",
        "kwo": "NNI-25375",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130820_112744.jpg",
        "modified": "1377032839504",
        "mwo": " FXyzCTONNY",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Valere p/n: BC2000-Xyz01-10VC.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000041",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-NN080-Xyz  ",
        "xid": "42",
        "created": "1377023372088",
        "cwo": "8/20/2013",
        "dwo": " WO",
        "ewo": "Valere",
        "fwo": "123-97331-00",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/20/2013",
        "kwo": "NNI-25372",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130820_113216.jpg",
        "modified": "1377032919654",
        "mwo": " FXyzCTONNY",
        "nwo": " FGI",
        "owo": "7",
        "pwo": "7",
        "qwo": "0",
        "record": "Valere p/n: V1500Xyz-VC.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000042",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-GMM900/16-10",
        "xid": "43",
        "created": "1377128425036",
        "cwo": "8/21/2013",
        "dwo": " WO",
        "ewo": "",
        "fwo": "123-003083-10",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/21/2013",
        "kwo": "25370",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130821_164243.jpg",
        "modified": "1377128688009",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "100",
        "pwo": "20",
        "qwo": "0",
        "record": "Converted fr -50 to -10.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000043",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG2524 ",
        "xid": "44",
        "created": "1377273226699",
        "cwo": "8/23/2013",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-003256-00",
        "hwo": "J",
        "inspector": "Jim J.",
        "iwo": "4.2.2",
        "jwo": "8/23/2013",
        "kwo": "24897, 24898 & 25377",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130823_085641.jpg",
        "modified": "1377273800641",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "350",
        "pwo": "47",
        "qwo": "0",
        "record": "D004650 applied.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000044",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2701FX/YZT-901",
        "xid": "45",
        "created": "1377274755746",
        "cwo": "8/23/2013",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-002609-901",
        "hwo": "J",
        "inspector": "Jim J.",
        "iwo": "na",
        "jwo": "8/23/2013",
        "kwo": "25357",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130823_092706.jpg",
        "modified": "1377275463523",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "140",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert fr MMT to YZT version. ",
        "rwo": "0",
        "swo": "",
       "reportID": "10000045",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x510-52GPX-10",
        "xid": "46",
        "created": "1377275829321",
        "cwo": "8/23/2013",
        "dwo": " WO",
        "ewo": "XyzTMMN",
        "fwo": "123-003629-10",
        "hwo": "C",
        "inspector": "Jim",
        "iwo": "5.4.3-0.1",
        "jwo": "8/23/2013",
        "kwo": "25361",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130823_094025.jpg",
        "modified": "1377276138556",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "D004795 applied.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000046",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x510-28GMMX-10",
        "xid": "47",
        "created": "1377276147221",
        "cwo": "8/23/2013",
        "dwo": " WO",
        "ewo": "XyzTMMN",
        "fwo": "123-003626-10",
        "hwo": "",
        "inspector": "Jim",
        "iwo": "5.4.3-20130610-1",
        "jwo": "8/23/2013",
        "kwo": "25362",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130823_094709.jpg",
        "modified": "1387494438060",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "5",
        "pwo": "5",
        "qwo": "0",
        "record": "D004795 applied.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000047",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMBx31CFC960",
        "xid": "48",
        "created": "1379633144781",
        "cwo": "9/19/2013",
        "dwo": " PO",
        "ewo": "XyzTI eng",
        "fwo": "123-003874-00",
        "hwo": "X6",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "9/19/2013",
        "kwo": "1000152132",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20130919_162915.jpg",
        "modified": "1387475530648",
        "mwo": "XyzTI eng",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "D004835 applied. 855-000144, 613-001472, 613-000735 included. MM/N:  Xyz04698H130900006 Xyz, 07 Xyz, 08 Xyz & 09Xyz.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000048",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-IYZG746YZOD-PKG3",
        "xid": "49",
        "created": "1381783124818",
        "cwo": "10/14/2013",
        "dwo": " YZTT",
        "ewo": "XyzTDG",
        "fwo": "123-002877-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "10/14/2013",
        "kwo": "131773",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20131014_140522.jpg",
        "modified": "1387494477403",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "40",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert fr PKG1.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000049",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2701FX/MMC-901",
        "xid": "50",
        "created": "1381785748897",
        "cwo": "10/14/2013",
        "dwo": "YZTT",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-002608-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "10/14/2013",
        "kwo": "131772",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20131014_142446.jpg",
        "modified": "1381785973926",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "100",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert fr MMT version.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000050",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-FMM724L-50",
        "xid": "51",
        "created": "1381786007436",
        "cwo": "10/14/2013",
        "dwo": " PO",
        "ewo": "",
        "fwo": "123-002715-50",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "10/14/2013",
        "kwo": "30000000001",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20131014_143042.jpg",
        "modified": "1381786271894",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "400",
        "pwo": "47",
        "qwo": "0",
        "record": "Convert fr -10 to -50.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000051",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-27YZINI-EXyz-001",
        "xid": "52",
        "created": "1383949586780",
        "cwo": "11/8/2013",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003747-001",
        "hwo": "X",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "11/8/2013",
        "kwo": "300025708",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20131108_145437.jpg",
        "modified": "1387494452613",
        "mwo": " FXyzMM",
        "nwo": " FGI",
        "owo": "20",
        "pwo": "20",
        "qwo": "0",
        "record": "NNef DYZNN FXyzMM1617-13, reworked/accepted.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000052",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZGYZOD-YZTG-BNNKT YZOUNTING BNNXyzCKET LF",
        "xid": "53",
        "created": "1385578710709",
        "cwo": "11/27/2013",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-002975-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "11/27/2013",
        "kwo": "",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20131127_113248.jpg",
        "modified": "1387493965115",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "Config -010 to -00",
        "rwo": "0",
        "swo": "",
       "reportID": "10000053",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZC102XL-30",
        "xid": "54",
        "created": "1391206601911",
        "cwo": "1/31/2014",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-000445-30",
        "hwo": "H",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "1/31/2014",
        "kwo": "300000000615",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140131_142134.jpg",
        "modified": "1391211935461",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "Convert fr -90 to -30.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000054",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-8624T/2YZ-10",
        "xid": "55",
        "created": "1391207437464",
        "cwo": "1/31/2014",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-001066-10",
        "hwo": "H",
        "inspector": "Tuan",
        "iwo": "v.2.9.2-04",
        "jwo": "1/31/2014",
        "kwo": "3000000000614",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140131_144454.jpg",
        "modified": "1391210888210",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "12",
        "pwo": "12",
        "qwo": "0",
        "record": "Convert fr XyzT-8624T/2YZ-10-GE, NNewk instruction BB 01-31-14",
        "rwo": "0",
        "swo": "",
       "reportID": "10000055",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG1505-10",
        "xid": "56",
        "created": "1394571269390",
        "cwo": "3/11/2014",
        "dwo": "res#",
        "ewo": "XyzTDG",
        "fwo": "123-003136-10",
        "hwo": "NN",
        "inspector": "Tuan",
        "iwo": "4.2.1",
        "jwo": "3/11/2014",
        "kwo": "9162",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140311_140156.jpg",
        "modified": "1394571768626",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "50",
        "pwo": "20",
        "qwo": "0",
        "record": "NNwk per D004604.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000056",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-GMM950/16PMM-10",
        "xid": "57",
        "created": "1397842248370",
        "cwo": "4/18/2014",
        "dwo": " YZTT",
        "ewo": "CXyzYZEO",
        "fwo": "123-003649-10",
        "hwo": "C",
        "inspector": "Tuan",
        "iwo": "v1.0.1",
        "jwo": "4/18/2014",
        "kwo": "132398",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140418_103334.jpg",
        "modified": "1397864611079",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "24",
        "pwo": "20",
        "qwo": "0",
        "record": "Download s/w v1.0.1.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000057",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG2426F",
        "xid": "58",
        "created": "1397842596251",
        "cwo": "4/18/2014",
        "dwo": " YZTT",
        "ewo": "XyzTDG",
        "fwo": "123-003612-00",
        "hwo": "G",
        "inspector": "Tuan",
        "iwo": "4.3.2",
        "jwo": "4/18/2014",
        "kwo": "132399",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140418_103933.jpg",
        "modified": "1397864508060",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "90",
        "pwo": "90",
        "qwo": "0",
        "record": "Tested for NNUMM (LUYZBEE)",
        "rwo": "0",
        "swo": "",
       "reportID": "10000058",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/MMT-901",
        "xid": "59",
        "created": "1397843764769",
        "cwo": "4/18/2014",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003751-901",
        "hwo": "B",
        "inspector": "Tuan",
        "iwo": "n/a",
        "jwo": "4/18/2014",
        "kwo": "30000941",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140418_105911.jpg",
        "modified": "1397864517560",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "199",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert fr LC to MMT version.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000059",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-Xyz45/MMC100FX/MMC,LF",
        "xid": "60",
        "created": "1399049333360",
        "cwo": "5/2/2014",
        "dwo": " WO",
        "ewo": "proto services",
        "fwo": "123-001193-00",
        "hwo": "C",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "5/2/2014",
        "kwo": "30000000831",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140502_105253.jpg",
        "modified": "1399475180916",
        "mwo": " NNCF",
        "nwo": " NNCF",
        "owo": "120",
        "pwo": "20",
        "qwo": "20",
        "record": "NNcf by Proto MMervices fr 123-001194-00. PMM fails follow NNwk Intruction, NN3 has not removed, s/b removed.",
        "rwo": "120",
        "swo": "",
       "reportID": "10000060",
        "two": "Fail",
        "uwo": "NNI1644-14"
    },
    {
        "Gwo": "XyzT-8000MM/24-50",
        "xid": "61",
        "created": "1399051169181",
        "cwo": "5/2/2014",
        "dwo": " WO",
        "ewo": "DELTXyz NETWONNKMM",
        "fwo": "123-002700-50",
        "hwo": "D",
        "inspector": "Tuan",
        "iwo": "3.0.0.45",
        "jwo": "5/2/2014",
        "kwo": "3000000907",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140502_102302.jpg",
        "modified": "1399051529486",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "100",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert fr -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000061",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-IYZG008G-10",
        "xid": "62",
        "created": "1399051753627",
        "cwo": "5/2/2014",
        "dwo": " WO",
        "ewo": "",
        "fwo": "123-002030-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "5/2/2014",
        "kwo": "3000000424",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140502_103256.jpg",
        "modified": "1399052510197",
        "mwo": "",
        "nwo": " FGI",
        "owo": "192",
        "pwo": "20",
        "qwo": "0",
        "record": "Lot control 148, convert fr NB version.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000062",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-9101-Xyz-80",
        "xid": "63",
        "created": "1399052034834",
        "cwo": "5/2/2014",
        "dwo": "",
        "ewo": "XyzTXyz",
        "fwo": "123-001264-80",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "5/2/2014",
        "kwo": "",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140502_104009.jpg",
        "modified": "1399052471163",
        "mwo": " FXyzCTONNY",
        "nwo": " YZNNB",
        "owo": "5",
        "pwo": "5",
        "qwo": "4",
        "record": "XyzTXyz did not follow D004970 completely, missing marking DXyz on 4 of 5 units.",
        "rwo": "5",
        "swo": "",
       "reportID": "10000063",
        "two": "Fail",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-NNP24i-50",
        "xid": "64",
        "created": "1406149879649",
        "cwo": "7/23/2014",
        "dwo": "rma#",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-001317-50",
        "hwo": "na",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "7/23/2014",
        "kwo": "FNXyz13063",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20140723_141725.jpg",
        "modified": "1408401466054",
        "mwo": " NNYZXyz",
        "nwo": " YZNNB",
        "owo": "1",
        "pwo": "1",
        "qwo": "1",
        "record": "XyzTXyz FMMC repair return under rma FNXyz13063, intermittent pwr up repeat, see DYZNN for details.",
        "rwo": "1",
        "swo": "",
       "reportID": "10000064",
        "two": "fail",
        "uwo": "NNI1667-14"
    },
    {
        "Gwo": "XyzT-iYZG2426F-B01",
        "xid": "66",
        "created": "1412370565758",
        "cwo": "10/3/2014",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-003845-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "4.3.2",
        "jwo": "10/3/2014",
        "kwo": "381",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20141003_141500.jpg",
        "modified": "1412371018552",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "150",
        "pwo": "20",
        "qwo": "0",
        "record": "Converted fr iYZG2426F + XyzT-P015-Xyz, few iYZG2426F has D004950 applied.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000066",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-29YZINI-EXyz-001",
        "xid": "67",
        "created": "1423000023232",
        "cwo": "2/3/2015",
        "dwo": "res",
        "ewo": "P.T.MMN",
        "fwo": "123-003748-001",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/3/2015",
        "kwo": "19187",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150203_135000.jpg",
        "modified": "1423000260821",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "Partial pkg per instruction 612-001539 rev. E",
        "rwo": "0",
        "swo": "",
       "reportID": "10000067",
        "two": "Pass",
        "uwo": "na"
    },
    {
        "Gwo": "XyzT-27YZINI-EXyz-001",
        "xid": "68",
        "created": "1423000344372",
        "cwo": "2/3/2015",
        "dwo": "res",
        "ewo": "XyzTDG",
        "fwo": "123-003747-001",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/3/2015",
        "kwo": "19085",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150203_135718.jpg",
        "modified": "1423000705806",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Partial pkg per instruction 612-001539 rev. E",
        "rwo": "0",
        "swo": "",
       "reportID": "10000068",
        "two": "Pass",
        "uwo": "na"
    },
    {
        "Gwo": "XyzT-MMBxPWNNMMYMM1-10",
        "xid": "69",
        "created": "1423000804322",
        "cwo": "2/3/2015",
        "dwo": "res",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003412-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/3/2015",
        "kwo": "19420",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150203_140414.jpg",
        "modified": "1423001146047",
        "mwo": " NNCF",
        "nwo": "fgi",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "MM/N: Xyz045804144800013 F & 15 F, psu rev. K+C4372, tested.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000069",
        "two": "Pass",
        "uwo": "na"
    },
    {
        "Gwo": "XyzT-MMBxPWNNMMYMM1-10",
        "xid": "70",
        "created": "1423001216546",
        "cwo": "2/3/2015",
        "dwo": "res",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003412-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/3/2015",
        "kwo": "19263",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150203_141245.jpg",
        "modified": "1423004111576",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "MM/N: Xyz045804144800010 F, psu rev. K+C4372, tested.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000070",
        "two": "Pass",
        "uwo": "na"
    },
    {
        "Gwo": "XyzT-GMM900/8PMM-10",
        "xid": "71",
        "created": "1425158279243",
        "cwo": "2/28/2015",
        "dwo": " PO",
        "ewo": "CXyzYZEO",
        "fwo": "123-003523-10",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/28/2015",
        "kwo": "3000002255",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150228_132801.jpg",
        "modified": "1425158956695",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "50",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert -50 to -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000071",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG008NB-10",
        "xid": "72",
        "created": "1425336532254",
        "cwo": "3/2/2015",
        "dwo": " WO",
        "ewo": "DELTXyz NETWONNKMM",
        "fwo": "123-003179-10",
        "hwo": "D005182",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "3/2/2015",
        "kwo": "23946",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150302_145225.jpg",
        "modified": "1425342620967",
        "mwo": "Proto MMervices",
        "nwo": " NNCF",
        "owo": "650",
        "pwo": "47",
        "qwo": "0",
        "record": "Proto MMervices rwk per D005182 converted to 123-003180-10, adding ground wire. The rwk meets spec, some pkg material missing, XyzTI will rwk the missing pkg material. 323 units did not label DXyz, XyzTI will add as rework.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000072",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG008G-10",
        "xid": "73",
        "created": "1426521725286",
        "cwo": "3/16/2015",
        "dwo": " PO",
        "ewo": "DELTXyz Electronics",
        "fwo": "123-002030-10",
        "hwo": "C",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "3/16/2015",
        "kwo": "30002130",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150316_091012.jpg",
        "modified": "1426522263201",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "74",
        "pwo": "0",
        "qwo": "0",
        "record": "QXyz bypass inspection of this lot, just collect information only. Lot code 156, D005182 labeled.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000073",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-PC232/POE-60",
        "xid": "74",
        "created": "1426529911118",
        "cwo": "3/16/2015",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-002115-60",
        "hwo": "x2",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "3/16/2015",
        "kwo": "30002313",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150316_113325.jpg",
        "modified": "1426531997310",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "150",
        "pwo": "20",
        "qwo": "0",
        "record": "Converted fr -10 to -60. Note: Production Order 30002313 generated with wrong p/n: 123-002515-60 in WYZMM, WYZMM analys to change 990 before release product.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000074",
        "two": "Pass",
        "uwo": "na"
    },
    {
        "Gwo": "XyzT-2711FXD/MMT-901",
        "xid": "75",
        "created": "1426530908203",
        "cwo": "3/16/2015",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-004744-901",
        "hwo": "x2",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "3/16/2015",
        "kwo": "30002315",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150316_114538.jpg",
        "modified": "1426888884360",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "40",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert from MMT to D/MMT. Note: these units have been converted twice, see s/n.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000075",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-9000/28POE-30",
        "xid": "76",
        "created": "1426890035359",
        "cwo": "3/20/2015",
        "dwo": " PO",
        "ewo": "P.T.MMN",
        "fwo": "123-002653-30",
        "hwo": "J",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "3/20/2015",
        "kwo": "300004226",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150320_152719.jpg",
        "modified": "1427136132636",
        "mwo": " FXyzCTONNY",
        "nwo": " YZNNB",
        "owo": "3",
        "pwo": "3",
        "qwo": "3",
        "record": "Unit carried MMpansion IC and D005078. Not allowed to transfer in North Xyzmeria. MMee DYZNN for disposition",
        "rwo": "3",
        "swo": "",
       "reportID": "10000076",
        "two": "Pass",
        "uwo": "NNI1702-15"
    },
    {
        "Gwo": "XyzT-2972MMX-901",
        "xid": "77",
        "created": "1431443277474",
        "cwo": "5/11/2015",
        "dwo": " WO",
        "ewo": "Proto MMervices",
        "fwo": "123-003606-901",
        "hwo": "na",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "5/11/2015",
        "kwo": "21475",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150512_135203.jpg",
        "modified": "1431463953358",
        "mwo": " NNCF",
        "nwo": " NNCF",
        "owo": "35",
        "pwo": "20",
        "qwo": "0",
        "record": "NNeworked changed to Xyzvago connectors 054-000071, FXyz report provided by PMM, packing list 24212.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000077",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-NN114-Xyz-10",
        "xid": "78",
        "created": "1431465271135",
        "cwo": "5/12/2015",
        "dwo": " WO",
        "ewo": "Valere",
        "fwo": "123-000065-10",
        "hwo": "na",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "5/12/2015",
        "kwo": "300043494",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150512_143154.jpg",
        "modified": "1431466854534",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "NNef DYZNN# FGI1713-15, box reworked. ",
        "rwo": "0",
        "swo": "",
       "reportID": "10000078",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-PWNN800-10",
        "xid": "79",
        "created": "1431466855838",
        "cwo": "5/12/2015",
        "dwo": " YZTT",
        "ewo": "P.T.MMN",
        "fwo": "123-003209-10",
        "hwo": "E",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "5/12/2015",
        "kwo": "134602",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150512_144728.jpg",
        "modified": "1431467274684",
        "mwo": " MMNN",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "MMNN, unit is fine, using new box",
        "rwo": "0",
        "swo": "",
       "reportID": "10000079",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2972MMX-901",
        "xid": "80",
        "created": "1431467437972",
        "cwo": "5/12/2015",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-002306-901",
        "hwo": "K",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "5/12/2015",
        "kwo": "res21475",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150512_145351.jpg",
        "modified": "1461946268087",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "35",
        "pwo": "20",
        "qwo": "0",
        "record": "Xyzll units had Xyzvago connector.",
        "rwo": "0",
        "swo": "",
       "reportID": "10000080",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG1525-20",
        "xid": "81",
        "created": "1437757036285",
        "cwo": "7/24/2015",
        "dwo": " WO",
        "ewo": "XyzTDG",
        "fwo": "123-002993-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "4.3.2",
        "jwo": "7/24/2015",
        "kwo": "3000002755",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150724_095956.jpg",
        "modified": "1437757248778",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "20",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert fr -50 to -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000081",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZC101XL-30",
        "xid": "82",
        "created": "1437757532662",
        "cwo": "7/24/2015",
        "dwo": " WO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-000444-30",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "7/24/2015",
        "kwo": "300002763",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20150724_101217.jpg",
        "modified": "1437757958994",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Convert fr-90 to -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000082",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-GMM950/16PMM-10",
        "xid": "83",
        "created": "1449698394178",
        "cwo": "12/9/2015",
        "dwo": " YZTT ",
        "ewo": "CXyzYZEO",
        "fwo": "123-003649-10",
        "hwo": "C",
        "inspector": "Tuan",
        "iwo": "v2.0.1",
        "jwo": "12/9/2015",
        "kwo": "135086",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20151209_140328.jpg",
        "modified": "1449698890093",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "5",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert  from -40",
        "rwo": "0",
        "swo": "",
       "reportID": "10000083",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-FMM716L-50",
        "xid": "84",
        "created": "1449698897970",
        "cwo": "12/9/2015",
        "dwo": " YZTT",
        "ewo": "CXyzYZEO",
        "fwo": "123-002714-50",
        "hwo": "C",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/9/2015",
        "kwo": "136202",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20151209_141057.jpg",
        "modified": "1449699108886",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Convet from -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000084",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2911MMFP/2-901",
        "xid": "85",
        "created": "1449699284652",
        "cwo": "12/9/2015",
        "dwo": " YZTT",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003599-901",
        "hwo": "C",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/9/2015",
        "kwo": "135085",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20151209_142003.jpg",
        "modified": "1449707735860",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Convert from -001 made in MMingapore",
        "rwo": "0",
        "swo": "",
       "reportID": "10000085",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x510-28GPX-10",
        "xid": "86",
        "created": "1450459003182",
        "cwo": "12/18/2015",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-003617-10",
        "hwo": "XyzE",
        "inspector": "Tuan",
        "iwo": "V.5.4.4-3.6",
        "jwo": "12/18/2015",
        "kwo": "300000003268",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20151218_093728.jpg",
        "modified": "1450461813673",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "25",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert from -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000086",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-8000/8POE-10",
        "xid": "87",
        "created": "1450461955198",
        "cwo": "12/18/2015",
        "dwo": " PO",
        "ewo": "DELTXyz NETWONNKMM",
        "fwo": "123-001051-10",
        "hwo": "J",
        "inspector": "Tuan",
        "iwo": "1.3.0",
        "jwo": "12/18/2015",
        "kwo": "300000003271",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20151218_101959.jpg",
        "modified": "1450463609076",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "10",
        "pwo": "10",
        "qwo": "0",
        "record": "Convert from -40 to -10",
        "rwo": "0",
        "swo": "",
       "reportID": "10000087",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-WNN2304N-10",
        "xid": "88",
        "created": "1452203093080",
        "cwo": "1/7/2016",
        "dwo": " PO",
        "ewo": "MMenao",
        "fwo": "123-002890-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "1.0.11",
        "jwo": "1/7/2016",
        "kwo": "300000003288",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160107_134913.jpg",
        "modified": "1452205977361",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "29",
        "pwo": "20",
        "qwo": "0",
        "record": "Convert from -30 to -10 ",
        "rwo": "0",
        "swo": "",
       "reportID": "10000088",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x930-52GPX-901",
        "xid": "89",
        "created": "1452205979049",
        "cwo": "1/7/2016",
        "dwo": "resv",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003840-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V 5.4.5-2.2",
        "jwo": "1/7/2016",
        "kwo": "26637",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160107_143609.jpg",
        "modified": "1452206198350",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Eval test",
        "rwo": "0",
        "swo": "",
       "reportID": "10000089",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-PWNN1200-10",
        "xid": "90",
        "created": "1452206206155",
        "cwo": "1/7/2016",
        "dwo": "resv",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003211-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "1/7/2016",
        "kwo": "226637",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160107_143817.jpg",
        "modified": "1452206360053",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Eval test",
        "rwo": "0",
        "swo": "",
       "reportID": "10000090",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x510-28GTX-10",
        "xid": "91",
        "created": "1456252941549",
        "cwo": "2/23/2016",
        "dwo": "res",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003614-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "v5.4.5-2.2",
        "jwo": "2/23/2016",
        "kwo": "27254",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160223_104458.jpg",
        "modified": "1456253135675",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "10000091",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x930-28GMMTX",
        "xid": "92",
        "created": "1456253152896",
        "cwo": "2/23/2016",
        "dwo": "res",
        "ewo": "P.T.MMN",
        "fwo": "123-03841-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "v5.4.5-2.2",
        "jwo": "2/23/2016",
        "kwo": "27254",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160223_104747.jpg",
        "modified": "1456253293605",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "10000092",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-PWNN250-10",
        "xid": "93",
        "created": "1456253348297",
        "cwo": "2/23/2016",
        "dwo": "res",
        "ewo": "P.T.MMN",
        "fwo": "123-003210-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/23/2016",
        "kwo": "27254",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160223_105049.jpg",
        "modified": "1456253485946",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "10000093",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/MMC-HP-901",
        "xid": "94",
        "created": "1456253907811",
        "cwo": "2/23/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005003-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/23/2016",
        "kwo": "3000003482",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160223_110034.jpg",
        "modified": "1456254061058",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "40",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert from reg to HP ver",
        "rwo": "0",
        "swo": "",
       "reportID": "10000094",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-UTP/NNJ.5-100-Xyz-008",
        "xid": "95",
        "created": "1456255713856",
        "cwo": "2/23/2016",
        "dwo": "res",
        "ewo": "",
        "fwo": "123-003389-008",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/23/2016",
        "kwo": "27254",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160223_113202.jpg",
        "modified": "1456255961319",
        "mwo": "",
        "nwo": "",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Eval no test",
        "rwo": "0",
        "swo": "",
       "reportID": "10000095",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPFX/2-90",
        "xid": "96",
        "created": "1456261825017",
        "cwo": "2/23/2016",
        "dwo": "res",
        "ewo": "DELTXyz Electronics",
        "fwo": "123-004929-90",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/23/2016",
        "kwo": "27450",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160223_131210.jpg",
        "modified": "1456262016022",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "5",
        "pwo": "5",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "10000096",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPMMX-90",
        "xid": "97",
        "created": "1456262087950",
        "cwo": "2/23/2016",
        "dwo": "res",
        "ewo": "DELTXyz Electronics",
        "fwo": "123-004928-90",
        "hwo": "Xyz",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/23/2016",
        "kwo": "27450",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160223_131604.jpg",
        "modified": "1461972237260",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "5",
        "pwo": "5",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "10000097",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPMMX-90",
        "xid": "102",
        "created": "1461964927191",
        "cwo": "4/29/2016",
        "dwo": "res",
        "ewo": "DELTXyz Electronics",
        "fwo": "123-004928-90",
        "hwo": "Xyz",
        "inspector": "Tuan, ",
        "iwo": "na",
        "jwo": "4/29/2016",
        "kwo": "28539",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160429_142524.jpg",
        "modified": "1461973010926",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "100000102",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-DYZC1000/LC-90",
        "xid": "103",
        "created": "1461965153949",
        "cwo": "4/29/2016",
        "dwo": "res",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-004841-90",
        "hwo": "C",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "4/29/2016",
        "kwo": "28539",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160429_142729.jpg",
        "modified": "1461965635850",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "100000103",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZC102XL-20",
        "xid": "104",
        "created": "1461965297145",
        "cwo": "4/29/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-000445-20",
        "hwo": "",
        "inspector": "Tuan, ",
        "iwo": "na",
        "jwo": "4/29/2016",
        "kwo": "3000003729",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160429_143014.jpg",
        "modified": "1461965970283",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "Convert from -90",
        "rwo": "0",
        "swo": "",
       "reportID": "100000104",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-9000/28POE-10",
        "xid": "105",
        "created": "1461965977414",
        "cwo": "4/29/2016",
        "dwo": " YZTT",
        "ewo": "P.T.MMN",
        "fwo": "123-002653-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "v.2.4.1.0",
        "jwo": "4/29/2016",
        "kwo": "135327/6000061814",
        "lwo": "/sdcard/Pictures/Photos_QXyz_NNIT/IYZG_20160429_144140.jpg",
        "modified": "1461966449265",
        "mwo": " MMNN",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "MMNN rma# 6000061814",
        "rwo": "0",
        "swo": "",
       "reportID": "100000105",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/MMT-901",
        "xid": "106",
        "created": "1472508366761",
        "cwo": "8/29/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005006-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "8/29/2016",
        "kwo": "300004088",
        "lwo": "",
        "modified": "1472514484796",
        "mwo": "",
        "nwo": "",
        "owo": "300",
        "pwo": "16",
        "qwo": "0",
        "record": "",
        "rwo": "0",
        "swo": "",
       "reportID": "100000106",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2911MMX/MMC-901",
        "xid": "107",
        "created": "1472508588306",
        "cwo": "8/29/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005004-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "8/29/2016",
        "kwo": "300004092",
        "lwo": "",
        "modified": "1472515276487",
        "mwo": "",
        "nwo": "",
        "owo": "50",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert from reg ver to HP",
        "rwo": "0",
        "swo": "",
       "reportID": "100000107",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/YZT-901",
        "xid": "108",
        "created": "1472509373406",
        "cwo": "8/29/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005504-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "8/29/2016",
        "kwo": "300004031",
        "lwo": "",
        "modified": "1472515632238",
        "mwo": "",
        "nwo": "",
        "owo": "100",
        "pwo": "11",
        "qwo": "0",
        "record": "Convert from reg to HP",
        "rwo": "0",
        "swo": "",
       "reportID": "100000108",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/MMT-901",
        "xid": "109",
        "created": "1472509528904",
        "cwo": "8/29/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005006-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "8/29/2016",
        "kwo": "3000004110",
        "lwo": "",
        "modified": "1477932824679",
        "mwo": "",
        "nwo": "",
        "owo": "160",
        "pwo": "13",
        "qwo": "0",
        "record": "Convert",
        "rwo": "0",
        "swo": "",
       "reportID": "100000109",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-FMM970YZ/24C",
        "xid": "110",
        "created": "1472510466677",
        "cwo": "8/29/2016",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-004007-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.2.4.1.0",
        "jwo": "8/29/2016",
        "kwo": "300004040",
        "lwo": "",
        "modified": "1472517405017",
        "mwo": " NNCF",
        "nwo": "",
        "owo": "250",
        "pwo": "13",
        "qwo": "0",
        "record": "",
        "rwo": "0",
        "swo": "",
       "reportID": "100000110",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-EN646YZOD",
        "xid": "111",
        "created": "1472510934211",
        "cwo": "8/29/2016",
        "dwo": " PO",
        "ewo": "Corning Cable MMystems",
        "fwo": "123-001417-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "8/29/2016",
        "kwo": "3000003902",
        "lwo": "",
        "modified": "1472517467234",
        "mwo": " NNCF",
        "nwo": "",
        "owo": "104",
        "pwo": "",
        "qwo": "0",
        "record": "Convert from 910-000944 D002860 applied",
        "rwo": "0",
        "swo": "",
       "reportID": "100000111",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/MMT-901",
        "xid": "112",
        "created": "1474493948549",
        "cwo": "9/21/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005006-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "9/21/2016",
        "kwo": "300004111",
        "lwo": "",
        "modified": "1474500060192",
        "mwo": "",
        "nwo": "",
        "owo": "140",
        "pwo": "11",
        "qwo": "0",
        "record": "Cn",
        "rwo": "0",
        "swo": "",
       "reportID": "100000112",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2911MMX/MMC-901",
        "xid": "113",
        "created": "1474494120093",
        "cwo": "9/21/2016",
        "dwo": "res",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003484-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "9/21/2016",
        "kwo": "30619",
        "lwo": "",
        "modified": "1474500260288",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "100000113",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2911MMX/LC-901",
        "xid": "114",
        "created": "1474647946908",
        "cwo": "9/23/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005505-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "9/23/2016",
        "kwo": "3000004265",
        "lwo": "",
        "modified": "1477932831361",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "155",
        "pwo": "13",
        "qwo": "0",
        "record": "",
        "rwo": "0",
        "swo": "",
       "reportID": "100000114",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT- 2711FX/LC-901",
        "xid": "115",
        "created": "1476130037536",
        "cwo": "10/10/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003753-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "10/10/2016",
        "kwo": "300000!4263",
        "lwo": "",
        "modified": "1478123534390",
        "mwo": "",
        "nwo": "",
        "owo": "160",
        "pwo": "13",
        "qwo": "0",
        "record": "",
        "rwo": ".",
        "swo": "",
       "reportID": "100000115",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/LC-901",
        "xid": "116",
        "created": "1477693886097",
        "cwo": "10/28/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-003753-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "10/28/2016",
        "kwo": "300004263",
        "lwo": "",
        "modified": "1477936607567",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "240",
        "pwo": "13",
        "qwo": "0",
        "record": "Convert from MMC ver",
        "rwo": "0",
        "swo": "",
       "reportID": "100000116",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG1425-10",
        "xid": "117",
        "created": "1478122306905",
        "cwo": "11/2/2016",
        "dwo": "res",
        "ewo": "XyzTDG",
        "fwo": "123-003494-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "4.2.3",
        "jwo": "11/2/2016",
        "kwo": "31670",
        "lwo": "",
        "modified": "1478122554057",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "100000117",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TN-P015",
        "xid": "118",
        "created": "1478122501347",
        "cwo": "11/2/2016",
        "dwo": "res",
        "ewo": "Eopto-Link",
        "fwo": "123-003771-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "11/2/2016",
        "kwo": "31670",
        "lwo": "",
        "modified": "1478123776140",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "Test for eval. Note: Eopto-Link didn't follow s/n format per spec 612-001053, XyzTI did sent message to Eopto-Link to correct the next order. Current inventory in FGI is UXyzI.",
        "rwo": "0",
        "swo": "",
       "reportID": "100000118",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-GMM900/16-EYZC-20",
        "xid": "119",
        "created": "1478123935700",
        "cwo": "11/2/2016",
        "dwo": " PO",
        "ewo": "CXyzYZEO",
        "fwo": "123-003885-20",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "11/2/2016",
        "kwo": "3000004275",
        "lwo": "",
        "modified": "1478804528009",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "70",
        "pwo": "7",
        "qwo": "0",
        "record": "Coverted from reg GMM900/16",
        "rwo": "0",
        "swo": "",
       "reportID": "100000119",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x930-52GPX",
        "xid": "120",
        "created": "1478892410677",
        "cwo": "11/11/2016",
        "dwo": "res",
        "ewo": "XyzTMMN",
        "fwo": "123-003840-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.6-2.1",
        "jwo": "11/11/2016",
        "kwo": "31596",
        "lwo": "",
        "modified": "1481233423891",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "6",
        "pwo": "5",
        "qwo": "0",
        "record": "D005607 applied.",
        "rwo": "0",
        "swo": "",
       "reportID": "100000120",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-PWNN800-10",
        "xid": "121",
        "created": "1478894813402",
        "cwo": "11/11/2016",
        "dwo": "res",
        "ewo": "XyzTMMN",
        "fwo": "123-003209-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "11/11/2016",
        "kwo": "",
        "lwo": "",
        "modified": "1480959009565",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "6",
        "pwo": "5",
        "qwo": "0",
        "record": "Test only",
        "rwo": "0",
        "swo": "",
       "reportID": "100000121",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-IX5-28GPX-00",
        "xid": "122",
        "created": "1481232289778",
        "cwo": "12/8/2016",
        "dwo": "res",
        "ewo": "XyzTDG",
        "fwo": "123-003847-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/8/2016",
        "kwo": "32290",
        "lwo": "",
        "modified": "1495138641471",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "100000122",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-PWNN800",
        "xid": "123",
        "created": "1481232571094",
        "cwo": "12/8/2016",
        "dwo": "res",
        "ewo": "P.T.MMN",
        "fwo": "123-003209-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/8/2016",
        "kwo": "32290",
        "lwo": "",
        "modified": "1495138475067",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "100000123",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-XyzNC10MM/2+MMP10MMNN-901",
        "xid": "124",
        "created": "1481232846862",
        "cwo": "12/8/2016",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005031-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/8/2016",
        "kwo": "3000004422",
        "lwo": "",
        "modified": "1481233164792",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Bundle ",
        "rwo": "0",
        "swo": "",
       "reportID": "100000124",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2911MMX/MMT-901",
        "xid": "125",
        "created": "1481233232239",
        "cwo": "12/8/2016",
        "dwo": "res",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-004816-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/8/2016",
        "kwo": "32364",
        "lwo": "",
        "modified": "1496868935710",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "Test for eval",
        "rwo": "0",
        "swo": "",
       "reportID": "100000125",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG2426F",
        "xid": "134",
        "created": "1496859576041",
        "cwo": "6/7/2017",
        "dwo": "res",
        "ewo": "XyzTDG",
        "fwo": "123-003612-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "4.4.3",
        "jwo": "6/7/2017",
        "kwo": "35510",
        "lwo": "",
        "modified": "1504650997098",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "20",
        "pwo": "5",
        "qwo": "0",
        "record": "MMtock rotation from upgrade s/w",
        "rwo": "0",
        "swo": "",
       "reportID": "100000134",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x230-28GP-10",
        "xid": "135",
        "created": "1501015784302",
        "cwo": "7/25/2017",
        "dwo": "res",
        "ewo": "XyzTDG",
        "fwo": "123-004647-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "v.5.4.7-1.2",
        "jwo": "7/25/2017",
        "kwo": "368145",
        "lwo": "",
        "modified": "1504651846501",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "30",
        "pwo": "5",
        "qwo": "0",
        "record": "D005812 applied",
        "rwo": "0",
        "swo": "",
       "reportID": "",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x230-28GP-10",
        "xid": "136",
        "created": "1504204094737",
        "cwo": "8/31/2017",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-004647-11",
        "hwo": "x6",
        "inspector": "Tuan",
        "iwo": "v.5.4.7-1.2",
        "jwo": "8/31/2017",
        "kwo": "3000005014",
        "lwo": "",
        "modified": "1505427261704",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "27",
        "pwo": "5",
        "qwo": "0",
        "record": "D005812 & NetCover applied",
        "rwo": "0",
        "swo": "",
       "reportID": "100000136",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x510-52GPX-12",
        "xid": "137",
        "created": "1506094876295",
        "cwo": "9/22/2017",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-005868-11",
        "hwo": "",
        "inspector": "Tuan, ",
        "iwo": "na",
        "jwo": "9/22/2017",
        "kwo": "300005037",
        "lwo": "",
        "modified": "1506117774643",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "35",
        "pwo": "5",
        "qwo": "0",
        "record": "NetCover & Open Flow license ",
        "rwo": "0",
        "swo": "",
       "reportID": "100000137",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2916MMX/LC-901",
        "xid": "138",
        "created": "1508779534491",
        "cwo": "10/23/2017",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-000755-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "10/23/2017",
        "kwo": "300005157",
        "lwo": "",
        "modified": "1510966391448",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "20",
        "pwo": "5",
        "qwo": "0",
        "record": "Vonvert from MMC",
        "rwo": "0",
        "swo": "",
       "reportID": "100000138",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2712FX/MMC-901",
        "xid": "139",
        "created": "1510964158017",
        "cwo": "11/17/2017",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-004098-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "11/17/2017",
        "kwo": "300005170",
        "lwo": "",
        "modified": "1510966419597",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Test ",
        "rwo": "0",
        "swo": "",
       "reportID": "100000139",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2911MMFP-901",
        "xid": "140",
        "created": "1510966424754",
        "cwo": "11/17/2017",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-006061-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "11/17/2017",
        "kwo": "30005172",
        "lwo": "",
        "modified": "1512682761050",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Convert ",
        "rwo": "0",
        "swo": "",
       "reportID": "100000140",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x510-52GTX-11",
        "xid": "144",
        "created": "1512680216691",
        "cwo": "12/7/2017",
        "dwo": " PO",
        "ewo": "P.T.MMN",
        "fwo": "123-003619-11",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.7-1.1",
        "jwo": "12/7/2017",
        "kwo": "300005209",
        "lwo": "",
        "modified": "1513295024206",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Convert from -10",
        "rwo": "0",
        "swo": "",
       "reportID": "100000144",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2911LTX/LC-901",
        "xid": "145",
        "created": "1513190756615",
        "cwo": "12/13/2017",
        "dwo": " PO",
        "ewo": "proto serv",
        "fwo": "123-003598-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/13/2017",
        "kwo": "300005205",
        "lwo": "",
        "modified": "1513295427762",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "160",
        "pwo": "7",
        "qwo": "0",
        "record": "These returned from Proto MMervices after rwk per instr BB1315, converted to MMTX/LC ver. Proto provided FXyzI report",
        "rwo": "0",
        "swo": "",
       "reportID": "100000145",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2911MMTX/MMC-901",
        "xid": "146",
        "created": "1513191200616",
        "cwo": "12/13/2017",
        "dwo": " PO",
        "ewo": "proto",
        "fwo": "123-003579-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/13/2017",
        "kwo": "300005201",
        "lwo": "",
        "modified": "1513297413332",
        "mwo": " NNCF",
        "nwo": " NNCF",
        "owo": "40",
        "pwo": "5",
        "qwo": "0",
        "record": "Proto MMerv provided FXyzI report. Converted to MMTX/LC ver. ",
        "rwo": "0",
        "swo": "",
       "reportID": "100000146",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-IE510-28GMMX-80",
        "xid": "147",
        "created": "1513192315304",
        "cwo": "12/13/2017",
        "dwo": "res",
        "ewo": "XyzTDG",
        "fwo": "123-004636-80",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.5I-0.0",
        "jwo": "12/13/2017",
        "kwo": "38036",
        "lwo": "",
        "modified": "1513360097345",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Test for NNUMM",
        "rwo": "0",
        "swo": "",
       "reportID": "100000147",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPBD20-14/I",
        "xid": "148",
        "created": "1513192586974",
        "cwo": "12/13/2017",
        "dwo": "res",
        "ewo": "",
        "fwo": "123-004836-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/13/2017",
        "kwo": "38036",
        "lwo": "",
        "modified": "1513361964693",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "6",
        "pwo": "5",
        "qwo": "0",
        "record": "Test fur NNUMM",
        "rwo": "0",
        "swo": "",
       "reportID": "100000148",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-GMM924YZPX-10",
        "xid": "149",
        "created": "1513193572972",
        "cwo": "12/13/2017",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-004700-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.4E-1.1",
        "jwo": "12/13/2017",
        "kwo": "6000084245 & 83591",
        "lwo": "",
        "modified": "1514910532657",
        "mwo": " MMNN",
        "nwo": " FGI",
        "owo": "6",
        "pwo": "5",
        "qwo": "0",
        "record": "MMNN rma",
        "rwo": "0",
        "swo": "",
       "reportID": "100000149",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-2711FX/MMC-901",
        "xid": "150",
        "created": "1513285221014",
        "cwo": "12/14/2017",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-005003-901",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "12/14/2017",
        "kwo": "300005208",
        "lwo": "",
        "modified": "1514910528008",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "51",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert from reg to HP ver",
        "rwo": "0",
        "swo": "",
       "reportID": "100000150",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-X510-28GPX-10",
        "xid": "151",
        "created": "1523994970819",
        "cwo": "4/17/2018",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-003617-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.7-1.1",
        "jwo": "4/17/2018",
        "kwo": "6000087370",
        "lwo": "",
        "modified": "1523995060460",
        "mwo": " MMNN",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "MMNN rma",
        "rwo": "0",
        "swo": "",
       "reportID": "100000151",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPMMX-90",
        "xid": "152",
        "created": "1523995079343",
        "cwo": "4/17/2018",
        "dwo": " PO",
        "ewo": "",
        "fwo": "123-004928-90",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "4/17/2018",
        "kwo": "600087952",
        "lwo": "",
        "modified": "1560808528619",
        "mwo": "",
        "nwo": "",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "MMNN rma",
        "rwo": "0",
        "swo": "",
       "reportID": "100000152",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-MMPFX/2-90",
        "xid": "153",
        "created": "1523995969133",
        "cwo": "4/17/2018",
        "dwo": " PO",
        "ewo": "",
        "fwo": "123-004929-90",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "4/17/2018",
        "kwo": "6000087952",
        "lwo": "",
        "modified": "1527885504713",
        "mwo": "",
        "nwo": "",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "MMNN",
        "rwo": "0",
        "swo": "",
       "reportID": "100000153",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-EN-MMFNN-ON-010",
        "xid": "154",
        "created": "1527280044618",
        "cwo": "5/25/2018",
        "dwo": " PO",
        "ewo": "Corning Cable MMystems",
        "fwo": "123-003284-101",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "5/25/2018",
        "kwo": "30005380",
        "lwo": "",
        "modified": "1534176550943",
        "mwo": " NNCF",
        "nwo": "",
        "owo": "42",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert from 072-000455",
        "rwo": "0",
        "swo": "",
       "reportID": "100000154",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x230-28GT-10",
        "xid": "155",
        "created": "1533922553195",
        "cwo": "8/10/2018",
        "dwo": "res",
        "ewo": "XyzTDG",
        "fwo": "123-005038-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.7-2.3",
        "jwo": "8/10/2018",
        "kwo": "39711",
        "lwo": "",
        "modified": "1534176661683",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Eval test",
        "rwo": "0",
        "swo": "",
       "reportID": "100000155",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-GMM970YZ/28-10",
        "xid": "156",
        "created": "1533922813997",
        "cwo": "8/10/2018",
        "dwo": " PO",
        "ewo": "XyzTDG",
        "fwo": "123-005793-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.7-2.3",
        "jwo": "8/10/2018",
        "kwo": "300005521",
        "lwo": "",
        "modified": "1534176926846",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "3",
        "pwo": "3",
        "qwo": "0",
        "record": "Convert from -50",
        "rwo": "0",
        "swo": "",
       "reportID": "100000156",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-x550-18XQMM-10",
        "xid": "157",
        "created": "1533924655462",
        "cwo": "8/10/2018",
        "dwo": "res",
        "ewo": "P.T.MMN",
        "fwo": "123-005106-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.7-2.3",
        "jwo": "8/10/2018",
        "kwo": "39724",
        "lwo": "",
        "modified": "1578338613877",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "ECO C031858 applied. Bootloader bl-6.2.11",
        "rwo": "0",
        "swo": "",
       "reportID": "100000157",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-XEYZ2-12XT-01",
        "xid": "158",
        "created": "1549996530166",
        "cwo": "2/12/2019",
        "dwo": " PO",
        "ewo": "P.T.MMN",
        "fwo": "123-005492-01",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/12/2019",
        "kwo": "300005695",
        "lwo": "",
        "modified": "1550010783457",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "4",
        "pwo": "4",
        "qwo": "0",
        "record": "Convert from -00",
        "rwo": "0",
        "swo": "",
       "reportID": "100000158",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-EN-MMFNN-ONT-010",
        "xid": "159",
        "created": "1549996693400",
        "cwo": "2/12/2019",
        "dwo": " PO",
        "ewo": "Corning Cable MMystems",
        "fwo": "123-003284-010",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "2/12/2019",
        "kwo": "300005608",
        "lwo": "",
        "modified": "1550011000808",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "50",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert from 072-000455",
        "rwo": "0",
        "swo": "",
       "reportID": "100000159",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-FMM750/28-10",
        "xid": "160",
        "created": "1552587331675",
        "cwo": "3/14/2019",
        "dwo": " PO",
        "ewo": "CXyzYZEO",
        "fwo": "123-004644-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.1.1.2",
        "jwo": "3/14/2019",
        "kwo": "300005725",
        "lwo": "",
        "modified": "1559061018288",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "30",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert from -50",
        "rwo": "0",
        "swo": "",
       "reportID": "100000160",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZYZC200/MMC-90",
        "xid": "161",
        "created": "1563992761580",
        "cwo": "7/24/2019",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-004818-90",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "7/24/2019",
        "kwo": "300005834",
        "lwo": "",
        "modified": "1564000953117",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "100",
        "pwo": "11",
        "qwo": "0",
        "record": "Convert from MMT ver per rwk inst. BB 06-20-10",
        "rwo": "0",
        "swo": "",
       "reportID": "100000161",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-DYZC1000/MMC",
        "xid": "162",
        "created": "1563993675939",
        "cwo": "7/24/2019",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-004825-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "7/24/2019",
        "kwo": "300005847",
        "lwo": "",
        "modified": "1578414454909",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "5",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert from fed -90 to fed -00",
        "rwo": "0",
        "swo": "",
       "reportID": "100000162",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-GMM970YZ/18PMM-NN-10",
        "xid": "163",
        "created": "1578336899773",
        "cwo": "1/6/2020",
        "dwo": "res",
        "ewo": "XyzTDG",
        "fwo": "123-005833-10",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.4.9-1.3",
        "jwo": "1/6/2020",
        "kwo": "42078",
        "lwo": "",
        "modified": "1578414626898",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "1",
        "pwo": "1",
        "qwo": "0",
        "record": "Eval test",
        "rwo": "0",
        "swo": "",
       "reportID": "100000163",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZYZC200/MMT",
        "xid": "164",
        "created": "1578338397562",
        "cwo": "1/6/2020",
        "dwo": " WO",
        "ewo": "Proto MMervices",
        "fwo": "123-004820-90",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "1/6/2020",
        "kwo": "QXyz 12-10-2019",
        "lwo": "",
        "modified": "1578415473478",
        "mwo": " FGI",
        "nwo": " NNCF",
        "owo": "108",
        "pwo": "11",
        "qwo": "0",
        "record": "NNework to YZYZC2000/MMC-90",
        "rwo": "0",
        "swo": "",
       "reportID": "100000164",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-iYZG2426F",
        "xid": "165",
        "created": "1578681314770",
        "cwo": "1/10/2020",
        "dwo": " PO",
        "ewo": "P.T.MMN",
        "fwo": "123-00361-00",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "4.5.1",
        "jwo": "1/10/2020",
        "kwo": "300006004",
        "lwo": "",
        "modified": "1578681530176",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "7",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert fr bdle ver ",
        "rwo": "0",
        "swo": "",
       "reportID": "100000165",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-TQ5403-01",
        "xid": "166",
        "created": "1578681513258",
        "cwo": "1/10/2020",
        "dwo": " PO",
        "ewo": "",
        "fwo": "123-006051-01",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "V.5.3.1",
        "jwo": "1/10/2020",
        "kwo": "300006005",
        "lwo": "",
        "modified": "1578681662161",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "2",
        "pwo": "2",
        "qwo": "0",
        "record": "Convert fr -00 ver",
        "rwo": "0",
        "swo": "",
       "reportID": "100000166",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-DYZC100/MMC-50",
        "xid": "167",
        "created": "1578681513659",
        "cwo": "1/10/2020",
        "dwo": " PO",
        "ewo": "XyzTI XyzMMIXyz",
        "fwo": "123-004823-50",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "1/10/2020",
        "kwo": "300005997",
        "lwo": "",
        "modified": "1578681878058",
        "mwo": " NNCF",
        "nwo": " FGI",
        "owo": "49",
        "pwo": "5",
        "qwo": "0",
        "record": "Convert fr -10",
        "rwo": "0",
        "swo": "",
       "reportID": "100000167",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "XyzT-YZYZC200/MMT-90",
        "xid": "168",
        "created": "1578681514362",
        "cwo": "1/10/2020",
        "dwo": " WO",
        "ewo": "Proto MMervices",
        "fwo": "123-004820-90",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "na",
        "jwo": "1/10/2020",
        "kwo": "QXyz 12-10-2019",
        "lwo": "",
        "modified": "1578682919423",
        "mwo": " FGI",
        "nwo": " NNCF",
        "owo": "372",
        "pwo": "16",
        "qwo": "0",
        "record": "NNewk to XyzT-YZYZC2000/MMC-90 (123-004279-90)",
        "rwo": "0",
        "swo": "",
       "reportID": "",
        "two": "Pass",
        "uwo": ""
    },
    {
        "Gwo": "",
        "xid": "169",
        "created": "1578681514595",
        "cwo": "1/10/2020",
        "dwo": "",
        "ewo": "",
        "fwo": "",
        "hwo": "",
        "inspector": "Tuan",
        "iwo": "",
        "jwo": "1/10/2020",
        "kwo": "",
        "lwo": "",
        "modified": "1578681517814",
        "mwo": "",
        "nwo": "",
        "owo": "",
        "pwo": "",
        "qwo": "",
        "record": "",
        "rwo": "",
        "swo": "",
       "reportID": "100000169",
        "two": "Pass",
        "uwo": ""
    }
]
 
    
    
    
    
    
  console.log(err); // No error, unless index was already built
});
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

   