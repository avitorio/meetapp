import styled from 'styled-components/native';

import logo from '~/assets/logo.png';

export const Wrapper = styled.SafeAreaView`
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
`;

export const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  padding: 15px;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: white;

  background: black;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  height: 24px;
  width: 24px;
  margin: 0 auto;
`;
