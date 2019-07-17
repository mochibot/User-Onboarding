import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, errors, touched, isSubmitting }) => {
  return (
    <div>
      <h2>Create your account now</h2>
      <Form>
        <div>
          <p>Full name:</p>
          <Field name='name' placeholder='Enter name...'></Field>
          {touched.name && errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <p>Email:</p>
          <Field name='email' placeholder='Enter email...'></Field>
          {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <p>Password:</p>
          <Field name='password' placeholder='Enter password...'></Field>
          {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <p>Confirm password:</p>
          <Field name='passwordConfirmation' placeholder='Confirm password...'></Field>
          {touched.passwordConfirmation && errors.passwordConfirmation && <p>{errors.passwordConfirmation}</p>}
        </div>
        <div>
          <label>
            <Field type='checkbox' name='terms' checked={values.terms}></Field>
            Agree to Terms and Services
          </label>
          {touched.terms && errors.terms && <p>{errors.terms}</p>} 
        </div>
        <button disabled={isSubmitting}>Submit</button>
      </Form>
    </div>
  )
}

export default withFormik({
  mapPropsToValues: ({ name, email, password, passwordConfirmation, terms }) => {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      passwordConfirmation: passwordConfirmation || '',
      terms: terms || false
    }
  },
  
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Not a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must contain at least 6 characters').required('Password is required'),
    /*passwordConfirmation: Yup.string().oneOf([values.password], 'Passwords are not the same!')
    .required('Password confirmation is required!'),*/
    terms: Yup.bool().test('terms', 'You have to agree with our Terms and Conditions!', value => value === true)
  }),
  
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log(values);
    if (values.email === 'waffle@syrup.com') {
      setErrors({
        email: 'Email is already registered'
      })
    } else {
      setSubmitting(true);
      axios.post('https://reqres.in/api/users', values)
        .then(response => {
          console.log(response);
          resetForm()
          setSubmitting(false);
          alert(`Registration success! Name: ${values.name} Email: ${values.email}`)
        })
        .catch(error => {
          console.log(error);
          setSubmitting(false);
        })
    }
  }

})(UserForm);

