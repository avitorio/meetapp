import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  margin-bottom: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
`;

export const Info = styled.View`
  margin-left: 15px;
  padding: 20px;
  width: 100%;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  text-align: left;
  align-items: center;
  flex: 1;
  margin-bottom: 10px;
`;

export const Organizer = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: #f94d6a;
  text-align: left;
  align-items: center;
  flex: 1;
  margin-bottom: 10px;
`;

export const MeetupDetail = styled.View`
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
`;

export const DetailIcon = styled(Icon)`
  font-size: 14px;
  color: #999;
`;

export const DetailText = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 5px;
`;
