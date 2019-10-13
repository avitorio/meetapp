import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
`;

export const EmptyText = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin-top: 30px;
  max-width: 250px;
`;
