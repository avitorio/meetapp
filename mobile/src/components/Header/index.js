import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Wrapper, Container, Logo } from './styles';

Icon.loadFont();

export default function Header({ navigation }) {
  return (
    <Wrapper>
      <Container>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Logo />
        </TouchableOpacity>
      </Container>
    </Wrapper>
  );
}
