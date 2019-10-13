import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Banner = styled.Image`
  width: 30px;
  height: 30px;
  align-self: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const DateScroller = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  margin: 20px auto 0;
`;

export const CurrentDate = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 30px;
`;
