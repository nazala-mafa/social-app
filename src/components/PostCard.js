import {Text, View, TouchableOpacity} from 'react-native';
import {
  Card,
  UserImage,
  UserInfo,
  PostText,
  PostImage,
  InteractionWrapper,
  Interaction,
  InteractionText,
} from '../styles/FeedStyles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useContext, useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import moment from 'moment';

export default function PostCard({item, onDelete, onPress}) {
  const {user} = useContext(AuthContext);
  const {userData, setUserData} = useState(null);

  likeIcon = item.liked ? 'heart' : 'heart-outline';
  likeIconColor = item.liked ? '#2e64e5' : '#333';

  if (item.likes == 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

  const getUser = () => {
    firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          setUserData(docSnapshot.data());
        }
      })
      .catch(e => {
        console.log(`Get user error : ${e}`);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card key={item.uid}>
      <UserInfo>
        <UserImage
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#333', fontWeight: 'bold', fontSize: 14}}>
              {userData ? userData.fname || 'Test' : 'Test'}{' '}
              {userData ? userData.lname || 'User' : 'User'}
            </Text>
            <Text style={{color: '#333', fontSize: 12}}>
              {moment(item.postTime.toDate())?.fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      </UserInfo>
      <PostText>{item.post}</PostText>

      {item.postImg != null ? (
        <PostImage source={require('../../assets/posts/post-img-1.jpg')} />
      ) : (
        <Text>Divider</Text>
      )}

      <InteractionWrapper>
        <Interaction onPress={() => {}} active={item.liked}>
          <IonIcon name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction onPress={() => {}}>
          <IonIcon name="chatbox-ellipses-outline" size={25} color="#333" />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <IonIcon name="trash-bin-outline" size={25} color="#333" />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
}
