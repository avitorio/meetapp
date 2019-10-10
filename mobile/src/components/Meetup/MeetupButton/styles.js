import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 40px;
  background: ${props => (props.subscribed ? '#999' : '#f94d6a')};
  border-radius: 4px;
  margin-top: 10px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
