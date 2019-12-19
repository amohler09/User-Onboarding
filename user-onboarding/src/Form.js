import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

//ClassNames
    //user-form - div
    //checkbox - checkbox
    //errors - validation errors
    //button - submit button

// Name
// Email
// Password
// Terms of Service (checkbox)
// A Submit button to send our form data to the server.

//Step 1.
//Create Form
//Add labels -- don't forget htmlFor
//Nest fields in labels, add id, type, name, placeholder

//Step 2.
//mapPropstoValues
//validationSchema

const UserForm = ({values, touched, errors}) => {


    return(
        <div className='user-form'>
            <Form>
                <label htmlFor='name'>Name:</label>
                    <Field 
                        id='name'
                        type='text'
                        name='name'
                        placeholder='Name'
                    />
                    {touched.name && errors.name && (<p className='errors'>{errors.name}</p>)}

                <label htmlFor='email'>Email:</label>
                    <Field 
                        id='email'
                        type='text'
                        name='email'
                        placeholder='Email Address'
                    />
                    {touched.email && errors.email && (<p className='errors'>{errors.email}</p>)}
                
                <label htmlFor='password'>Password:</label>
                    <Field
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Password' 
                    />
                    {touched.password && errors.password && (<p className='errors'>{errors.password}</p>)}

                <label className='checkbox' htmlFor='terms'>Terms of Service
                    <Field 
                        id='terms'
                        type='checkbox'
                        name='terms'
                        check={values.terms}
                    />
                </label>
                {touched.terms && errors.terms && (<p className='errors'>{errors.terms}</p>)}

                <button className='button' type='submit'>Submit</button>
            </Form>

            
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        //javascript land when passing parameters
        return {
           name: name || '',
           email: email || '',
           password: password || '',
           terms: terms || false 
        };
    },
        //set up a validationSchema to catch errors when filling out form
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Wait! This is required!'),
        email: Yup.string().required('Wait! This is required!'),
        password: Yup.string().required('Wait! This is required!'),
        //templates for string validation
        terms: Yup.boolean().oneOf([true], 'Must Accept Terms & Conditions First!')
        //template for checkbox validation
    })


})(UserForm);

export default FormikUserForm;