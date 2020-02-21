const React = require('react');
const Link = require('react-router-dom').Link
//const style = require('../styles/FormRI');
const style = require('../styles/HomePage');
const Header = require('./Header');

const { option, Form, FormGroup, Col, FormControl, Button, Grid, Row, ControlLabel} = require('react-bootstrap');
//const Person = mongoose.model('Person', personSchema);

const  arrayOfPeople=[{name:'Eva', age: 5, favoriteFoods: ["apple", "milk"]}, 
                   {name:'Eva2', age: 6, favoriteFoods: ["apple2", "milk2"]},
                  {name:'Eva3', age: 7, favoriteFoods: ["apple3", "milk3"]}] ;

class ManyRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   
 record: "", // comment -note
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    };   
   handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value  });
  };   
    
     
  render() {
    return (
      <div >  
        
            
         <p>  sample1:  </p>
<code>{`
[
{name:'Eva', age: 5, favoriteFoods: ["apple", "milk"]}, 
{name:'Eva2', age: 6, favoriteFoods: ["apple2", "milk2"]},
{name:'Eva3', age: 7, favoriteFoods: ["apple3", "milk3"]}
] 
`}</code>
        
    <p>  sample2:  </p>    
   <code>{`  
[
{reportID : "8028" , daterec : "" , inspector : "RI-person2" , Gwo : "AT-2914SP" , cwo : 2020-02-13T16:05:57.000+00:00 , dwo : "WO" , ewo : "Supplier:" , fwo : "9901" , hwo : "" , iwo : "gg" , jwo : 2020-02-13T16:05:57.000+00:00 , kwo : "" , lwo : "" , mwo : "OOBA" , nwo : "FAS" , owo : 15 , pwo : 10 , qwo : 1 , rwo : 1 , swo : "gg" , two : "Fail" , record : "fail " },

{reportID : "8029" , daterec : "" , inspector : "RI-person2" , Gwo : "AT-2914SP" , cwo : 2020-02-13T16:05:57.000+00:00 , dwo : "WO" , ewo : "Supplier:" , fwo : "9901" , hwo : "" , iwo : "gg" , jwo : 2020-02-13T16:05:57.000+00:00 , kwo : "" , lwo : "" , mwo : "OOBA" , nwo : "FAS" , owo : 15 , pwo : 10 , qwo : 1 , rwo : 1 , swo : "gg" , two : "Fail" , record : "fail " }
]

`}</code>   
        
        

<Form className="Form" horizontal method="post" action="/up-many-records" name="many-records" onSubmit={this.handleSubmit}>   
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
/* 


<FormGroup className="input-row"><ControlLabel> 	Photo 	</ControlLabel>
    
    <FormControl type="file"  name="uwo"  ref="imageInput" accept="image/png, image/jpeg" value={this.state.uwo }  onChange={ this.uploadFile }   />   </FormGroup>  
*/