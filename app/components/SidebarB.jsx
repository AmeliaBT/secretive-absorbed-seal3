/* ****************************************
Sidebar component that displays a list of options, and receives a callback function as its props. The callback function will be called from the Sidebar component by clicking one of the buttons, and will allow to notify the containing component (the parent) of the click
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link


const {FormControl, FormGroup, Group, Radio, Col, Grid, Row, Button, Glyphicon, Form } = require('react-bootstrap');

const style = require('../styles/SidebarA');
const options =require('./exampleData');

// Render Prop


const { Formik,  Field, ErrorMessage } =require('formik');

import * as Yup from 'yup';

const style1 = {
    width: '60%',
    margin: 'auto'
}

const style2 = {
    paddingTop: '2em',
}

const style3 = {
    marginRight: '2em'
}

class SideB extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: '',
                    password: '',
                    confirmPassword: '',
                    consent: false
                }}
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

                onSubmit={fields => {
                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                }}
                render={({ errors, status, touched }) => (

                    <Form style={style1}>
                    <h1 style={style2}>Get Started</h1>
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
                )}
            />
        )
    }
}
















module.exports = SidebarB;

