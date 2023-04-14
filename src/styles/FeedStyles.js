import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
`;

export const Card = styled.View`
  background-color: #f8f8f8;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px;
`;

export const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserInfoText = styled.Text`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  font-family: 'Lato-Regular';
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #333333;
  font-family: 'Lato-Regular';
`;

export const PostText = styled.Text`
  color: #333;
  margin-top: 10px;
  padding: 0 15px;
`;

export const PostImage = styled.Image`
  width: 100%;
  height: 250px;
  margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 5px;
  padding: 2px 6px 2px 2px;
  background-color: ${props => (props.active ? '#2e64e515' : 'transparent')};
`;

export const InteractionText = styled.Text`
  color: #333;
`;
