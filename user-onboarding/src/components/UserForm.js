import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, errors, touched, isSubmitting }) => {
  return (
    <div className='form-container'>
      <h2>Create your account today</h2>
      <Form>
        <div className='form-field'>
          <label>Full name:</label>
          <Field name='name' placeholder='Enter name...'></Field>
          {touched.name && errors.name && <p className='form-error'>{errors.name}</p>}
        </div>
        <div className='form-field'>
          <label>Email:</label>
          <Field name='email' placeholder='Enter email...'></Field>
          {touched.email && errors.email && <p className='form-error'>{errors.email}</p>}
        </div>
        <div className='form-field'>
          <label>Password:</label>
          <Field type='password' name='password' placeholder='Enter password...'></Field>
          {touched.password && errors.password && <p className='form-error'>{errors.password}</p>}
        </div>
        <div className='form-field'>
          <label>Confirm password:</label>
          <Field type='password' name='passwordConfirmation' placeholder='Confirm password...'></Field>
          {touched.passwordConfirmation && errors.passwordConfirmation && <p className='form-error'>{errors.passwordConfirmation}</p>}
        </div>
        <div className='form-dropdown'>
          <label>Role: </label>
          <Field component="select" name="role">
            <option value="" disabled>Select a role</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="other">Other</option>
          </Field>
          {touched.role && errors.role && <p className='form-error'>{errors.role}</p>}
        </div>
        <div className='form-terms'>
          <label>
            <Field type='checkbox' name='terms' checked={values.terms}></Field>
            Agree to Terms and Conditions
          </label>
          {touched.terms && errors.terms && <p className='form-error'>{errors.terms}</p>} 
        </div>
        <button disabled={isSubmitting}>SUBMIT</button>
      </Form>
    </div>
  )
}

export default withFormik({
  mapPropsToValues: ({ name, email, password, passwordConfirmation, terms, role }) => {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      passwordConfirmation: passwordConfirmation || '',
      terms: terms || false,
      role: role || ''
    }
  },
  
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Not a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must contain at least 6 characters').required('Password is required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords are not the same!')
    .required('Password confirm is required!'), 
    terms: Yup.bool().test('terms', 'You have to agree to our Terms and Conditions!', value => value === true),
    role: Yup.string().required('Please select an option')
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
          resetForm()
          console.log(response);
          setSubmitting(false);
          alert(`Registration success! Name: ${values.name} Email: ${values.email} Role: ${values.role}`)
        })
        .catch(error => {
          console.log(error);
          setSubmitting(false);
        })
    }
  }

})(UserForm);

