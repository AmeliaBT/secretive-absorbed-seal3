import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

// Styled-components styles
const CONTAINER = styled.div`
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

const BasicForm = () => {
  return (
    <CONTAINER>
      <MYFORM className="mx-auto">
        <Form.Group controlId="formName">
          <Form.Label>Name :</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Full Name"
            />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email :</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Phone :</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Phone"
            />
        </Form.Group>
        <Form.Group controlId="formBlog">
          <Form.Label>Blog :</Form.Label>
          <Form.Control
            type="text"
            name="blog"
            placeholder="Blog URL"
            />
        </Form.Group>
        <BUTTON variant="primary" type="submit">
          Submit
        </BUTTON>
      </MYFORM>
    </CONTAINER>
  );
}

//Sets initial values for form inputs


 const SidebarC = () => {
  return (
    <CONTAINER>
      //Sets initial values for form inputs
      <Formik initialValues={{ name:"", email:"", phone:"", blog:""}}>
        {/* Callback function containing Formik state and helpers that handle common form actions */}
      {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <MYFORM className="mx-auto">
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
/* Now that our values are initialized and our callback function contains the proper parameters let's update the field forms and connect them to Formik by adding onChange, onBlur, and value to our form properties:
              */
/* Set onChange to handleChange */
              onChange={handleChange}
              /* Set onBlur to handleBlur */
              onBlur={handleBlur}
              /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
              value={values.name}              
              
              
              />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone :</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone"
              />
          </Form.Group>
          <Form.Group controlId="formBlog">
            <Form.Label>Blog :</Form.Label>
            <Form.Control
              type="text"
              name="blog"
              placeholder="Blog URL"
              />
          </Form.Group>
          <BUTTON variant="primary" type="submit">
            Submit
          </BUTTON>
        </MYFORM>
      )}
      </Formik>
    </CONTAINER>
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
     


