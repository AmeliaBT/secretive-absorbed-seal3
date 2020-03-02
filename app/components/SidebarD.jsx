/* ****************************************
Sidebar component that displays a list of options, and receives a callback function as its props. The callback function will be called from the Sidebar component by clicking one of the buttons, and will allow to notify the containing component (the parent) of the click
*************************************************** */
//https://stackblitz.com/edit/react-qwj7xv?file=index.js
const React = require('react');
const Link = require('react-router-dom').Link
const {Alert, FormControlLabel, FormControl, FormGroup, Group, Radio, Col, Grid, Row, Button, Glyphicon } = require('react-bootstrap');
//const FormikRadioGroup =require('./FormikRadioGroup');
const style = require('../styles/SidebarA');
const { Formik,  Field, ErrorMessage } =require('formik');
//const options =require('./exampleData');
const {Yup} =require('yup');
const style1 = {
    width: '100%',
    margin: 'auto'}
const style2 = {
    paddingTop: '1em',}
const style3 = {
    marginRight: '1em'}

// Render Prop
//https://stackoverflow.com/questions/55910688/formik-with-react-bootstrap-styling
//<AlertDismissible />
class AlertDismissible extends React.Component {
   
  constructor(props) {
     alert("hi2 from AlertDismissible ");
    super(props);

    this.state = { show: true };
    
     alert("hi3 from AlertDismissible ");
  }

  render() {

    return (
      <div>
        <Alert variant='light'>
          <p>
            We'll be in touch with login details shortly.
            </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-success">
              Close
              </Button>
          </div>
        </Alert>
      </div>
    );
  }
}

const Form = (props) => {
  return (<div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={props.handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
          </form>
        )}
    </Formik>
  </div>
  )
}


class SidebarD extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      success: false,
      isLoading: false
    };
  }


    

     handleSubmit() {
    this.setState({
      isLoading: false ,
      success: true
    });

    //this.delay()
     // .then(e => this.setState({ success: true, isLoading: false }))
      //.catch(e => console.log(e))
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
  
  
  

module.exports = SidebarD;
/* 

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


