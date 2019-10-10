import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function MeetupButton({ children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

MeetupButton.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

MeetupButton.defaultProps = {
  loading: false,
};
