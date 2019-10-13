import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const InputError = styled.Text`
  color: #f64c75;
  font-weight: bold;
  height: ${({ formikProps, formikKey }) =>
    formikProps.touched[formikKey] && formikProps.errors[formikKey] ? 30 : 0};
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogOutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;
