//ToDO: see React Parent -Child slides
/* ****************************************
Sidebar component that displays a list of options, and receives a callback function as its props. The callback function will be called from the Sidebar component by clicking one of the buttons, and will allow to notify the containing component (the parent) of the click
*************************************************** */
//https://stackblitz.com/edit/react-qwj7xv?file=index.js
const React = require('react');
const Link = require('react-router-dom').Link
const {Alert, FormControlLabel, FormControl, FormGroup, Group, Radio, Col, Grid, Row, Button, Glyphicon } = require('react-bootstrap');
//const FormikRadioGroup =require('./FormikRadioGroup');
//const style = require('../styles/SidebarA');
const { useFormik, Formik,  Field, ErrorMessage } =require('formik');

//const options =require('./exampleData');
//const {Yup} =require('yup');

//https://stackoverflow.com/questions/54685998/pass-values-to-the-state-from-formik 
  
let myProp ="start";
const SidebarDD= () => {  
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      alert("formik.values.email:  " +formik.values.email); 
      myProp=formik.values.email;
      this.props.handleData()
    },
  });
     
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

class SidebarE extends React.Component {
  constructor(props) {
       super();
    this.state = {
      inputData: {},
      myprop1: myProp
    }
  }

  render() {
    return (
      <div> <br/> <br/> <p> SidebarE- see this?  {this.state.myprop1}  </p> 
        
        <SidebarDD />
      </div>
  //=========================    
    );
  }
}
module.exports = SidebarE;
//<SidebarDD />
 /*
      <Formik
        initialValues={values}
        onSubmit={(values) => {
          // Set updated state here
        }}
        render={({
            submitForm
          }) => (
          <form onSubmit={submitForm}>
            <Field type="text" name="address" onChange={handleChange} />
            <button type="submit">Submit</button>
          </form>
        )}
      />
      */

