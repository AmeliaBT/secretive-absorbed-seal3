/* ****************************************
Sidebar component that displays a list of options, and receives a callback function as its props. The callback function will be called from the Sidebar component by clicking one of the buttons, and will allow to notify the containing component (the parent) of the click
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link
const {FormControlLabel, FormControl, FormGroup, Group, Radio, Col, Grid, Row, Button, Glyphicon, Form } = require('react-bootstrap');
const FormikRadioGroup =require('./FormikRadioGroup');
const style = require('../styles/SidebarA');
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
const { Formik,  Field, ErrorMessage } =require('formik');
class SidebarB extends React.Component {
    
  
 
  
  render() {
     alert("hi");
    
    
    
        return (
            <Formik
                initialValues={{
                    firstName: '',                    
                    role: ''
                }}                       
                //onSubmit={fields => {alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 2))}}
              
            onSubmit={() => { alert('SUCCESS!! ') }   }
            //  onSubmit={fields => { console.log('SUCCESS!! ') }   }
                render={({ errors, status, touched }) => (
                 <Form style={style1}>
                    <h5 style={style2}>Start</h5>
                        <div className="form-group">
                            <label htmlFor="firstName">Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                    
                    

                        <div className="form-group">
                            <label htmlFor="role">role</label>
                            <Field name="role" type="text"  placeholder="eg" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')} >
                            </Field>
                            <ErrorMessage name="role" component="div" className="invalid-feedback" />
                        </div>
                  
                    
                
                        <div className="form-group">
                            <Button variant="outline-primary" type="submit" style={style3}>submit</Button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}






module.exports = SidebarB;


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
     


