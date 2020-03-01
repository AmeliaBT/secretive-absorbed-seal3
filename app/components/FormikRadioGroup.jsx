/* ****************************************
Sidebar component that displays a list of options, and receives a callback function as its props. The callback function will be called from the Sidebar component by clicking one of the buttons, and will allow to notify the containing component (the parent) of the click
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link
const {FormControlLabel, FormControl, FormGroup, Group, Radio, Col, Grid, Row, Button, Glyphicon, Form } = require('react-bootstrap');

const style = require('../styles/SidebarA');
//const options =require('./exampleData');

// Render Prop
const { Formik,  Field, ErrorMessage } =require('formik');


const FormikRadioGroup = ({
  field,
  form: { touched, errors },
  name,
  ...props
}) => {
  const fieldName = name || field.name;

  return (
    <React.Fragment>
      <RadioGroup {...field} {...props} />
      {touched[fieldName] && errors[fieldName] && (
        <React.Fragment>{errors[fieldName]} </React.Fragment>
      )}
    </React.Fragment>
  );
};

module.exports = FormikRadioGroup;


/* 

*/ 
     


