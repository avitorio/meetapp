import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insert a valid email.')
    .required('A valid email is required.'),
  password: Yup.string().required('Please, insert your password.'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    const appUser = false;

    dispatch(signInRequest(email, password, appUser));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your Email" />
        <Input name="password" type="password" placeholder="Your Password" />
        <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
        <Link to="/register">Create Account</Link>
      </Form>
    </>
  );
}
