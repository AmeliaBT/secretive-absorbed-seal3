//ToDO: see React Parent -Child slides
/* ****************************************
Sidebar component that displays a list of options, and receives a callback function as its props. The callback function will be called from the Sidebar component by clicking one of the buttons, and will allow to notify the containing component (the parent) of the click
*************************************************** */
//https://stackblitz.com/edit/react-qwj7xv?file=index.js
const React = require('react');
const Link = require('react-router-dom').Link
const {Alert, FormControlLabel, FormControl, FormGroup, Group, Radio, Col, Grid, Row, Button, Glyphicon } = require('react-bootstrap');
//const FormikRadioGroup =require('./FormikRadioGroup');
const style = require('../styles/SidebarA');
const { useFormik, Formik,  Field, ErrorMessage } =require('formik');
//const options =require('./exampleData');
//const {Yup} =require('yup');


   
class SidebarE extends React.Component {
  constructor(props) {
    this.state = {
      inputData: {}
    }
  }

  render() {
    return(
      <Formik
        initialValues={{ email: "", password: "" }}

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
    )
  }
}
module.exports = SidebarE;

