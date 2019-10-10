import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword ? field.required('You need to enter a new password.') : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('You need to confirm your new password.')
          .oneOf(
            [Yup.ref('password')],
            'You need to confirm your new password.'
          )
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Your Name" />
        <Input name="email" type="email" placeholder="Your Email" />
        <hr />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Your Current Password"
        />
        <Input type="password" name="password" placeholder="New Password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#FFF" />
          Update Profile
        </button>
      </Form>
    </Container>
  );
}
