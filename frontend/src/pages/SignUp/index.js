import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Please, insert your name.'),
  email: Yup.string()
    .email('Insert a valid email.')
    .required('A valid email is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long.')
    .required('Please, insert your password.'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Your Name" />
        <Input name="email" type="email" placeholder="Your Email" />
        <Input name="password" type="password" placeholder="Your Password" />
        <button type="submit">Create Account</button>
        <Link to="/">Already registered?</Link>
      </Form>
    </>
  );
}
