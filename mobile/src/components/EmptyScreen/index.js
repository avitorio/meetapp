import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, EmptyText } from './styles';

export default function EmptyScreen({ children, name, ...rest }) {
  return (
    <Container {...rest}>
      <Icon name={name} size={80} color="#FFF" />
      <EmptyText>{children}</EmptyText>
    </Container>
  );
}
