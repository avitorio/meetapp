import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

export default styled(LinearGradient).attrs({
  colors: ['#22202C', '#402845'],
})`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' ? 100 : 55};
`;
