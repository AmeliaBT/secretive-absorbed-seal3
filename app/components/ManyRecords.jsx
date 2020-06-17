//Admin 
const React = require('react');

const style = require('../styles/HomePage');
const Header = require('./Header');
const { Form, FormGroup, Col,  Button, Row, ControlLabel} = require('react-bootstrap');
//const Person = mongoose.model('Person', personSchema);


class ManyRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   
 record: "", // comment -note
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    
    };   
   handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value  });
  };   
  
handleSubmit(event) { let that = this; 
   // console.log(that)
      const xhr = new XMLHttpRequest();      
      xhr.open('POST', '/up-many-records', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    let body =  'record='   + encodeURIComponent(this.state.record) ;
                     alert("record: ");
                     alert(body);
      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
        if(response.error == 0) {
           window.location.href = "/reports";
           that.setState({
          ["record"]: "Succsess"      
           });
        }
        else {
          that.setState({
          ["record"]: "Error "
           });
         }
        }
      event.preventDefault();
     }  
  
  
  
  
     
  render() {
    return (
      <div >  
          <Header/> 
    
   
        

<Form className="Form" horizontal method="post" action="/up-many-records" name="many-records" onSubmit={this.handleSubmit}> 
  <Row>  
    <Col  smOffset={2} sm={8} >	 
      <p> This is WIP<br/>
        1. Export Android tablet data from the sqlite.db as .json file (recordsT.json) <br/>
        2.Open recordsT.json as .txt file. In MS Word. Replace  "title" with "reportID", "_id" with "xid" ;  verifiy that the format matches the sample and  enter json objects</p>
     
        <p>  Sample format  </p>    
  <code>{`         
 [
{
        "Gwo": "XyzT-iYZG2524Â ",
        "xid": "44",
        "created": "1377273226699",
        "cwo": "8/23/2013",
        "dwo": " WO",
        "ewo": "XyzTUUG",
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
        "record": "UU004650 applied.",
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
    }

]
  `}</code>           
      
   </Col>
       </Row> 
  <br/><br/>
 <Row><Col smOffset={6} sm={2} >	
<FormGroup > 
     <Button className="btn btn-primary btn-block" type="submit"><i className="fa fa-paper-plane"></i> Submit</Button>
      </FormGroup>
   </Col>
   </Row>     
<Row>  
    <Col smOffset={2} sm={8} >	 
 <FormGroup className="input-row"><ControlLabel > Enter json  objects  </ControlLabel> 
  <textarea rows="50" type="textarea"  className="input-rowC" name="record"   value={this.state.record	} placeholder={this.state.record	} onChange={this.handleChangeValue}  /> 
  </FormGroup>       
   </Col>
       </Row>   </Form>

  </div>
    );
  }
};

module.exports = ManyRecords;
