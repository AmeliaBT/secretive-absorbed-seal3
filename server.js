// init project
const express = require('express');
// for file upload
//const multer  = require('multer');
//react-html-table-to-excel
const app = express();

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

const mongoose = require('mongoose');
//to fix error: DeprecationWarning: Mongoose: mpromise 
mongoose.Promise = global.Promise;
// connection URL
const url = process.env.MONGOLAB_URI;   
// connection
const promise_connection = mongoose.connect(url, { 	useMongoClient: true });

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
  //store: store,
  resave: false,
  saveUninitialized: false
  //cookie: { secure: true }
}));
/***/
app.use(passport.initialize());
app.use(passport.session());
/***/
app.use(express.static('public'));

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
      dep: String,
securityLevel:Number
});
  
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
                                            
                                            
                          // create a user
                    let obj = {inspname: request.body["inspname"], email: request.body["email"], password: hash, dep: request.body["dep"], securityLevel: request.body["securityLevel"]}; 
                                              
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
//console.log("expected an email below when login: ");
  //console.log(request.body["email"]);
  
              userModel.find({ email: request.body["email"]}, function (err, document) {
              if(!err) {
                
                if(document.length == 0) {
                  response.json({"error": "error0"});
                }
                else if(document.length == 1) {
                bcrypt.compare(request.body["password"], document[0]["password"], function(err, res) {
                if(res === true) {
                let user_id = document[0]["id"];
                 let securityLevel = document[0]["securityLevel"];
                 // console.log("securityLevel: " + securityLevel);
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

 
app.post("/is-loged-in", function(request, response) {
 
  if(request.session.hasOwnProperty("passport")) {
   userModel.findById(request.session.passport.user, (err, document) => {
    if(!err) { response.json({isLogedIn: request.isAuthenticated(), inspname: document.inspname, dep: document.dep, securityLevel: document.securityLevel});  } 
    else { console.log("ERROR!: ", err);} 

   }
 
 );
  } 
         
  else {
        response.json({isLogedIn: request.isAuthenticated(), inspname: "0"}); 
    }
});


/***********************************/
/*
let nDocs; 
app.post("/add-report", function(request, response,  next) {
reportModel.find({}, (err, docs) => {
  if (err) throw err;        
 nDocs= docs.length +100000200 ;
console.log(" nDoc1= "  +nDocs) ;  
let obj =  {
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
lwo: request.body["lwo"], 
mwo: request.body["mwo"], 
nwo: request.body["nwo"], 
owo: request.body["owo"], 
pwo: request.body["pwo"], 
qwo: request.body["qwo"], 
rwo: request.body["rwo"], 
swo: request.body["swo"], 
two: request.body["two"], 
record: request.body["record"],
uwo: request.body["uwo"] 
}; 
    let report = new reportModel(obj);          
            report.save(function (err) {
             
              if (!err) console.log('Success!');
              response.json({"error": 0});              
            });
    });
});

*/
/* ********************************* */
//let nDocs=100000200; // starting number 
/*
 app.post("/add-report", function(req, res, next){ 
 
reportModel.find({}, (err, docs) => {
  console.log(docs.length);
   req.nd=  docs.length; 
   req.time = new Date().toString();
    next();       }); 

},
  function (req, res) {
      //res.send(req.time); 
  console.log("hi now ");
  console.log({'time': req.time})
   console.log({'time2': req.nd})
    res.json({'time': req.time});
  }
);
*/

app.post("/add-report", function(request, response, next) {
  
  reportModel.find({}, (err, docs) => {  
    request.nd =docs.length +100000200 ; 
    next();
 }); 
   
  userModel.findById(request.session.passport.user, (err, document) => {
    //if(!err) { response.json({isLogedIn: request.isAuthenticated(), inspname: document.inspname, dep: document.dep, securityLevel: document.securityLevel});  } 
    //else { console.log("ERROR!: ", err);} 
    request.sessuser =document.inspname; 
    next();
   }
 
 );
  
  
   
    },    
  // save with RI number *******************       
function(request, response) { 
  console.log(" got 2 items ");
  console.log(request.nd );
  console.log(request.sessuser);
    let obj =  {
reportID:   request.nd, 
daterec: request.body["daterec"], 
inspector: request.body["inspector"], 
Gwo: request.body["Gwo"], 

cwo: request.body["cwo"], 
dwo: request.body["dwo"], 
ewo: request.body["ewo"], 
fwo: request.body["fwo"], //PN
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
 
    let reportN = new reportModel(obj); 
  console.log(" reportN.reportID:  ");
  console.log(reportN.reportID);
     reportN.save(function (err) {
              //if (err) throw err;
              if (!err) console.log('Success!');    
              response.json({"error": 0});              
            });
  
} 
   );
  
app.post("/get-all-users-reports", function(request, response) {
       reportModel.find({}, (err, docs) => {
          if(err) throw err;
          let reports = []   ;
          for(let i = docs.length-1; i > -1; i--) {                 
            reports.push(docs[i]);          
            if(i == 0) response.json({reports: reports});
          }
       });
});
/*  ********************************
 
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
                    
            if(i == 0) response.json({reports: reports});

          }
       });
    
     });
});

app.post("/get-defect-reports", function(request, response) {
 // let regtwo = request.body.two; //pass-fail
//regtwo='^(?!Pass)(?!Fail).*$' ;
  //regtwo='^(Pass)' ;
 reportModel.find({ 
    two:"Fail"
  }, 
                   (err, doc) => {
      if (err) throw err;
           response.json(doc);
  
          }        
     );
           
});


/***********************************/
//create-filtered-table2
app.post("/create-filtered-table2", function(request, response) {
  let lot;
 let regreportID = request.body.reportID;  
let regGwo = request.body.Gwo; //Model
let regfwo = request.body.fwo; //PN
  
  let reg_record = request.body.record; //
  let regewo = request.body.ewo; //sup
  let regmwo = request.body.mwo; //sour
  let regnwo = request.body.nwo; //des
   let regtwo = request.body.two; //pass-fail
   let owo = request.body.owo; // lot size
 let reg_inspector= request.body.inspector; 
let cwo=request.body.cwo; // date inspected
 
   if(reg_inspector=== "Other"){reg_inspector='^(?!Tuan)(?!Jim).*$'  };
  
  if(regtwo=== "Other"){regtwo='^(?!Pass)(?!Fail).*$'  };
  
  if(owo ==="<100"){
   
//    console.log(owo);
    lot={ $lte: 99 };
  }else{
     lot={ $gte: 0 };
    //console.log("no: "+ owo) 
  }
  
  switch(owo) {
  case "<100":   
          lot={ $lte: 99 };
    break;
    case "100-1000":
     lot={ $gte: 100, $lte:1000  };
    break;
  case ">1000":
     lot={ $gte: 1001 };
    break;
      case "":
     lot={ $gte: 0 };
    break;
  default:
    // code block
      lot={ $gte: 0 };
}
  //last12 , all 
  const dateN = new Date();
dateN.setDate(dateN.getDate() -365);
  let dateSpan;
  if(cwo === "last12"){
   dateSpan= { $gte : new Date(dateN)} }   
  else{ dateSpan = { $gte : new Date("2000-01-16T20:15:31Z")} }  
   reportModel.find({ 
    reportID: new RegExp(regreportID, 'ig'), 
     Gwo: new RegExp(regGwo, 'ig'), 
     fwo: new RegExp(regfwo, 'ig'),     
    record: new RegExp(reg_record, 'ig'), 
    ewo: new RegExp(regewo, 'ig'), 
    mwo: new RegExp(regmwo, 'ig'), 
    nwo: new RegExp(regnwo, 'ig'), 
    two: new RegExp(regtwo, 'ig'), 
    owo: lot, 
    inspector: new RegExp(reg_inspector, 'ig'),
    cwo: dateSpan 
  }, 
                   (err, doc) => {
      if (err) throw err;
           response.json(doc);  
          }        
     );
           
});
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  app.post("/report-edit", function(request, response) {  
   reportModel.findOne({"reportID":request.body["reportID"]}, (err, doc) => {
 
      if (err) throw err;
            response.json(doc);
          }        
     );
});
/***********************************/

app.post("/set-report", function(request, response) {  
   reportModel.findOne({"_id":request.body["_id"]}, (err, doc) => {
  if (err) throw err; 

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
pwo: request.body["pwo"], 
qwo: request.body["qwo"], 
rwo: request.body["rwo"], 
swo: request.body["swo"], 
two: request.body["two"], 
record: request.body["record"],
uwo: request.body["uwo"] //photo file   
  });
    
     doc.save(function (err) {
              
         if (err) throw err;
           response.json({error: 0})               
            });
      
   });
});





/***********************************/
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



/***********************************/
//add-upload' not used does not work yet 

app.post("/add-upload", function(request, response) {
/*
reportModel.find({}, (err, docs) => {
  if (err) throw err;        
 nDocs= docs.length + 100000200 ; //6000;
 
let obj =  {
reportID:  nDocs, 
uwo: request.body["image"] //photo file
};

    let report = new reportModel(obj);          
            report.save(function (err) {
              //if (err) throw err;
              if (!err) console.log('Success!');
              response.json({"error": 0});              
            });
    });
*/
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
app.post("/set-password", 
function(request, response, next) {   
  let pw1= request.body["password"];    
  userModel.findById(request.session.passport.user, (err, user) => {
  if (err) throw err;    
     bcrypt.hash(pw1, saltRounds, function(err, hash) {
  // Store hash in DB. 
   user.password=hash;
   user.save();       
      });  
 });    
    next();},    
       
     function(request, response) {         
    request.logout();
          request.session.destroy(function(err) {
          response.status(200).clearCookie('connect.sid', {path: '/'}).json({error: 0});
     })
  
} );
  
  


/******************************/
// user sessions handlers:
/******************************/
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

/***********************************/
//using the middleware Multer to upload the photo on the server side.

//app.use(multer({ dest: "./uploads/",  rename: function (fieldname, filename) { return filename; },}));
//app.use(multer({dest:'./public/images/uploads'}).any());



// listen for requests
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

 