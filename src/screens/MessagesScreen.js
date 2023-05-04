import {useEffect, useState, useContext} from 'react';
import {FlatList} from 'react-native';
import {
  Card,
  Container,
  MessageText,
  PostTime,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName,
} from '../styles/MessagesStyle';
import avatar1 from '../../assets/users/user-1.jpg';
import avatar2 from '../../assets/users/user-2.jpg';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

const datas = [
  {
    id: '1',
    userName: 'Anna',
    userImg: avatar1,
    messageTime: '2 days ago',
    messageText: 'this test post from SocialApp',
  },
  {
    id: '2',
    userName: 'Anna 2',
    userImg: avatar2,
    messageTime: '3 days ago',
    messageText: 'this test post from SocialApp 2',
  },
];

const fetchUsers = async () => {
  try {
    return await firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        const list = [];

        snapshot.forEach(doc => {
          const {fname, lname, userImg} = doc.data();

          list.push({
            id: doc.id,
            fname,
            lname,
            userImg,
          });
        });

        return {
          data: list,
          error: null,
        };
      });
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
};

export default function MessagesScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    let list = [];

    fetchUsers().then(res => {
      if (res.data) {
        const myData = res.data.filter(data => data.id === user.uid)[0];
        res.data.forEach(data => {
          if (data.id != myData.id) {
            // chatID is id for conversation
            let chatID = [data.id, myData.id];
            chatID = chatID.sort().join('-');

            list.push({
              id: chatID,
              otherID: data.id,
              userName: data.fname + ' ' + data.lname,
              userImg: data.userImg,
              messageTime: '3 days ago',
              messageText: 'this test post from SocialApp 2',
            });
          } else {
            setMe(myData);
          }
        });

        setUsers(list);
      } else if (res.error) {
        console.log(res.error);
      }
    });
  }, []);

  return (
    <Container>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card
            onPress={() => {
              navigation.navigate('Chat', {
                chatID: item.id,
                myID: user.uid,
                myName: me.fname + ' ' + me.lname,
                otherID: item.otherID,
                otherName: item.userName,
              });
            }}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={{uri: item.userImg}} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
}
