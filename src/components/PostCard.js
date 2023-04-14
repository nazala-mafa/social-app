import {Text, View} from 'react-native';
import {
  Card,
  UserImage,
  UserInfo,
  UserInfoText,
  PostTime,
  UserName,
  PostText,
  PostImage,
  InteractionWrapper,
  Interaction,
  InteractionText,
} from '../styles/FeedStyles';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function PostCard() {
  return (
    <>
      <Card>
        <UserInfo>
          <UserImage source={require('../../assets/users/user-1.jpg')} />
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={{color: '#333', fontWeight: 'bold', fontSize: 14}}>
              Naruto Uzumaski
            </Text>
            <Text style={{color: '#333', fontSize: 12}}>13/4/2023</Text>
          </View>
        </UserInfo>
        <PostText>Hello this is post text</PostText>
        <PostImage source={require('../../assets/posts/post-img-1.jpg')} />
        <InteractionWrapper>
          <Interaction active>
            <IonIcon name="heart-outline" size={25} />
            <InteractionText>Like</InteractionText>
          </Interaction>
          <Interaction>
            <IonIcon name="md-chatbubble-outline" size={25} />
            <InteractionText>Comment</InteractionText>
          </Interaction>
        </InteractionWrapper>
      </Card>
      <Card>
        <UserInfo>
          <UserImage source={require('../../assets/users/user-1.jpg')} />
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={{color: '#333', fontWeight: 'bold', fontSize: 14}}>
              Naruto Uzumaski
            </Text>
            <Text style={{color: '#333', fontSize: 12}}>13/4/2023</Text>
          </View>
        </UserInfo>
        <PostText>Hello this is post text</PostText>
        <InteractionWrapper>
          <Interaction active>
            <IonIcon name="heart-outline" size={25} />
            <InteractionText>Like</InteractionText>
          </Interaction>
          <Interaction>
            <IonIcon name="md-chatbubble-outline" size={25} />
            <InteractionText>Comment</InteractionText>
          </Interaction>
        </InteractionWrapper>
      </Card>
    </>
  );
}
