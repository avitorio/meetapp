import React, { useRef, useState, useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';

import { Formik } from 'formik';

import Background from '~/components/Background';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  InputError,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  LogOutButton,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is a required field.'),
  email: Yup.string()
    .email('Email needs to be valid.')
    .required('Email is a required field'),
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

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setPassword('');
    setOldPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit(values) {
    const { name, email, password, oldPassword, confirmPassword } = values;

    setName(name);
    setEmail(email);

    dispatch(
      updateProfileRequest({
        name,
        email,
        password,
        oldPassword,
        confirmPassword,
      })
    );

    setUpdateLoading(false);
  }

  function handleSignOut() {
    dispatch(signOut());

    if (Platform.OS !== 'ios') {
      StatusBar.setBackgroundColor('#22202C');
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <Formik
            initialValues={{
              name,
              email,
              oldPassword,
              password,
              confirmPassword,
            }}
            onSubmit={(values, actions) => {
              handleSubmit(values);
              actions.setSubmitting(false);
            }}
            validationSchema={schema}
          >
            {formikProps => (
              <>
                <FormInput
                  icon="person-outline"
                  autoCorrect={false}
                  placeholder="Your Name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current.focus()}
                  value={formikProps.values.name}
                  onChangeText={formikProps.handleChange('name')}
                />
                <InputError formikProps={formikProps} formikKey="name">
                  {formikProps.errors.name}
                </InputError>

                <FormInput
                  icon="mail-outline"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Your Email"
                  ref={emailRef}
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange('email')}
                />
                <InputError formikProps={formikProps} formikKey="email">
                  {formikProps.errors.email}
                </InputError>

                <Separator />

                <FormInput
                  icon="lock-outline"
                  secureTextEntry
                  placeholder="Your Old Password"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current.focus()}
                  value={formikProps.values.oldPassword}
                  onChangeText={formikProps.handleChange('oldPassword')}
                />
                <InputError formikProps={formikProps} formikKey="oldPassword">
                  {formikProps.errors.oldPassword}
                </InputError>

                <FormInput
                  icon="lock-outline"
                  secureTextEntry
                  placeholder="Your New Password"
                  ref={passwordRef}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current.focus()}
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange('password')}
                />
                <InputError formikProps={formikProps} formikKey="password">
                  {formikProps.errors.password}
                </InputError>

                <FormInput
                  icon="lock-outline"
                  secureTextEntry
                  placeholder="Confirm Password"
                  ref={confirmPasswordRef}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                  value={formikProps.values.confirmPassword}
                  onChangeText={formikProps.handleChange('confirmPassword')}
                />

                <InputError
                  formikProps={formikProps}
                  formikKey="confirmPassword"
                >
                  {formikProps.errors.confirmPassword}
                </InputError>

                {formikProps.isSubmitting
                  ? setUpdateLoading(true)
                  : setUpdateLoading(false)}
                <SubmitButton
                  loading={updateLoading}
                  onPress={formikProps.handleSubmit}
                >
                  Update
                </SubmitButton>
                <LogOutButton loading={false} onPress={handleSignOut}>
                  Sign Out
                </LogOutButton>
              </>
            )}
          </Formik>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
