import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, setNestedObjectValues } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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

const UserForm = ({values}) => {


    return(
        <div className='user-form'>
            <Form>
                <label htmlFor='name'>Name:</label>
                    <Field 
                        id='name'
                        type='text'
                        name='species'
                        placeholder='Name'
                    />

                <label htmlFor='email'>Email:</label>
                    <Field 
                        id='email'
                        type='text'
                        name='email'
                        placeholder='Email Address'
                    />
                
                <label htmlFor='password'>Password:</label>
                    <Field
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Password' 
                    />
                <label className='checkbox' htmlFor='terms'>Terms of Service
                    <Field 
                        id='terms'
                        type='checkbox'
                        name='terms'
                        check={values.terms}
                    />
                </label>
                <button type='submit'>Submit</button>
            </Form>

            
        </div>
    )
}

const FormikUserForm = withFormik({})(UserForm);

export default FormikUserForm;