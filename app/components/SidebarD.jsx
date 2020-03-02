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
const {Yup} =require('yup');



const SidebarD= () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
      <button type="submit">Submit</button>
    </form>
  );
};

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


