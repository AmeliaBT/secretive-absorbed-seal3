//https://hackernoon.com/building-react-forms-with-formik-yup-and-react-bootstrap-with-a-minimal-amount-of-pain-and-suffering-1sfk3xv8

//https://formik-form.surge.sh
//https://github.com/Nicknyr/Formik_Example 
//===============================================
//import styled from 'styled-components';
//import { Form, Button } from 'react-bootstrap';
//import { Formik, ErrorMessage } from 'formik';
//import * as Yup from 'yup';

//import styled from 'styled-components';
const styled = require('styled-components');
const {Yup} =require('yup');
const { Formik,  Field, ErrorMessage } =require('formik');
const React = require('react');
const Link = require('react-router-dom').Link
const {FormControlLabel, FormControl, FormGroup, Group, Radio, Col, Grid, Row, Button, Glyphicon, Form } = require('react-bootstrap');
//const FormikRadioGroup =require('./FormikRadioGroup');
//styled
/*
const CONTAINER = styled(<div></div>)`
  background: #F7F9FA;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  @media(min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24B9B6;
    font-size: 1.2em;
    font-weight: 400;
  }
  .error {
    border: 2px solid #FF6565;
  }
  .error-message {
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }
  h1 {
    color: #24B9B6;
    padding-top: .5em;
  }
  .form-group {
    margin-bottom: 2.5em;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;
  @media(min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863AB;
  border: none;
  font-size: 1.2em;
  font-weight: 400;
  &:hover {
    background: #1D3461;
  }
`;
*/
// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Schema for yup
const validationSchema = {};
/*
Yup.object().shape({
  name: Yup.string()
  .min(2, "*Names must have at least 2 characters")
  .max(100, "*Names can't be longer than 100 characters")
  .required("*Name is required"),
  email: Yup.string()
  .email("*Must be a valid email address")
  .max(100, "*Email must be less than 100 characters")
  .required("*Email is required"),
  phone: Yup.string()
  .matches(phoneRegExp, "*Phone number is not valid")
  .required("*Phone number required"),
  blog: Yup.string()
  .url("*Must enter URL in http://www.example.com format")
  .required("*URL required")
});*/

const SidebarC = () => {
  return(
    <div>
    <h1>Example Formik Form</h1>
    <Formik
      initialValues={{ name:"", email:"", phone:"", blog:""}}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting, resetForm}) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);

          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
      }}
    >
      {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="mx-auto">
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className={touched.name && errors.name ? "has-error" : null}
              />
              {touched.name && errors.name ? (
                <div className="error-message">{errors.name}</div>
              ): null}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={touched.email && errors.email ? "has-error" : null}
               />
               {touched.email && errors.email ? (
                 <div className="error-message">{errors.email}</div>
               ): null}
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone :</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              className={touched.phone && errors.phone ? "has-error" : null}
               />
             {touched.phone && errors.phone ? (
                 <div className="error-message">{errors.phone}</div>
               ): null}
          </Form.Group>
          <Form.Group controlId="formBlog">
            <Form.Label>Blog :</Form.Label>
            <Form.Control
              type="text"
              name="blog"
              placeholder="Blog URL"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.blog}
              className={touched.blog && errors.blog ? "has-error" : null}
              />
            {touched.blog && errors.blog ? (
                <div className="error-message">{errors.blog}</div>
              ): null}
          </Form.Group>
          {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
          <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </BUTTON>
        </Form>
      )}
    </Formik>
    </div>
  );
}

  
  
  
  
module.exports = SidebarC;


/* 
render={({ errors, status, touched }) => (

                    <Form style={style1}>
                    <h5 style={style2}>xxx</h5>
                      
                        <div className="form-group">
                        <Field component="select" name="color">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</Field>
                            <Field name="consent" label="Policy"  type="checkbox" className={'form-control' + (errors.consent && touched.consent ? ' is-invalid' : '')} />
                            <ErrorMessage name="consent" component="div" className="invalid-feedback" />
                           <Field name="consent2" label="Policy2"  type="checkbox" className={'form-control' + (errors.consent && touched.consent ? ' is-invalid' : '')} />
                            <ErrorMessage name="consent2" component="div" className="invalid-feedback" />
                           <Field name="consent3" label="Policy3"  type="checkbox" className={'form-control' + (errors.consent && touched.consent ? ' is-invalid' : '')} />
                            <ErrorMessage name="consent3" component="div" className="invalid-feedback" />
                        
                
                </div>


                        <div className="form-group">
                            <Button variant="outline-primary" type="submit" style={style3}>Register</Button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}


<Form style={style1}>
                    <h5 style={style2}>xxx</h5>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" placeholder="Please use your work email address" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Which role best describes yours?</label>
                            <Field name="role" type="text"  placeholder="eg, academic, industry R&D, policy, funder" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')} >
                            </Field>
                            <ErrorMessage name="role" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                        <Field component="select" name="color">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</Field>
                            <Field name="consent" label="You must accept the  and Privacy Policy"  type="checkbox" className={'form-control' + (errors.consent && touched.consent ? ' is-invalid' : '')} />
                            <ErrorMessage name="consent" component="div" className="invalid-feedback" />
                        </div>


                        <div className="form-group">
                            <Button variant="outline-primary" type="submit" style={style3}>Register</Button>
                        </div>
                    </Form>





                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('First Name is required'),
                    lastName: Yup.string()
                        .required('Last Name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    role: Yup.string()
                        .required('It will help us get started if we know a little about your background'),    
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword:  Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}
*/ 
     


