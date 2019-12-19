import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

//ClassNames
    //user-form - div
    //checkbox - checkbox
    //errors - validation errors
    //button - submit button

//What's Needed    
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

//Step 3.
//Create a handleSubmit axios post request

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

                <h2>Terms of Service</h2>
                <p>Man braid microdosing pour-over chia master cleanse four loko sriracha art party before they sold out salvia retro. Celiac literally pok pok venmo neutra salvia, williamsburg kogi vegan. Ugh sriracha dreamcatcher edison bulb tacos. Hashtag dreamcatcher taxidermy skateboard subway tile coloring book, man bun master cleanse DIY flexitarian chartreuse. Bitters cloud bread keffiyeh live-edge.<br/><br/>
                Bitters direct trade taxidermy seitan aesthetic chambray tumeric. Subway tile literally single-origin coffee, snackwave chambray adaptogen sustainable. Mumblecore tilde af, portland cardigan authentic jianbing twee pok pok pabst jean shorts locavore meditation hella keytar. Tattooed man bun celiac, truffaut VHS locavore butcher shaman tote bag. Cronut aesthetic poutine, kickstarter pickled hot chicken selvage truffaut heirloom. Skateboard dreamcatcher pabst snackwave. Bicycle rights ugh waistcoat iPhone af jianbing woke portland viral retro mustache drinking vinegar.</p>
                <h3>Accept Terms of Serive?</h3>
                <label className='checkbox' htmlFor='terms'>I accept
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
    }),

    //use handleSubmit property to send axios call once submit button is pushed
    //console.log EVERYTHING
    handleSubmit(values, { setStatus, resetForm }) {
        console.log('submitting', values);
        axios
            .post('https://reqres.in/api/users', values)
            .then(response => {
                console.log('success', response);
                setStatus(response.data);
                resetForm();
            })
            .catch(error => console.log('Error!', error.response))
    }
})(UserForm);

export default FormikUserForm;