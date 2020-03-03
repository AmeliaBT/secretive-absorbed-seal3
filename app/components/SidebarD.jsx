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


   
const SidebarD= () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  //https://jaredpalmer.com/formik/docs/tutorial 
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      alert("formik.values.email:  " +formik.values.email);
      
    },
  });
  /*
  {
  "email": "person1@cms.com",
  "firstName": "test Bane"
}
  */
  
  
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

    
   
   
module.exports = SidebarD;
/* 
const SidebarD= () => {
 
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      alert("formik.values.email:  " +formik.values.email);
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

module.exports = SidebarD;

 // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  //https://jaredpalmer.com/formik/docs/tutorial 

  /*
  {
  "email": "person1@cms.com",
  "firstName": "test Bane"
}
  */
/*
=======================================
class SidebarD extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      success: false,
      isLoading: false
    };
  }


     delay() {
    const that = this;
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve();
      }, 5000)
    });
  }


     handleSubmit() {
    this.setState({
      isLoading: true
    });

    this.delay()
      .then(e => this.setState({ success: true, isLoading: false }))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div>
        {this.state.isLoading
          ? <p>submit...</p>
          : this.state.success
            ? <AlertDismissible />
            : <Form handleSubmit={this.handleSubmit} />
        }
      </div>
    );
  }
}
*/


