import {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

export default function CommentsScreen({route, navigation}) {
  const {user} = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const {post} = route.params;

  const sendComment = async () => {
    if (comment == '') return;

    console.log('post id: ', post.id);

    const myName = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(res => res.data());

    firestore()
      .collection('posts')
      .doc(post.id)
      .collection('comments')
      .add({
        senderID: user.uid,
        senderName: myName.fname + ' ' + myName.lname,
        comment,
        createdAt: firestore.Timestamp.fromDate(new Date()),
      });
  };

  useEffect(() => {
    const unsub = firestore()
      .collection('posts')
      .doc(post.id)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(commentsSS => {
        const _comments = commentsSS.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComments(_comments);
        setComment('');
      });

    navigation.setOptions({
      title: 'List of comments',
    });

    return unsub;
  }, []);

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <FlatList
        data={comments}
        renderItem={_comment => (
          <Comment
            title={_comment.item.senderName}
            body={_comment.item.comment}
          />
        )}
        keyExtractor={item => item.id}
        style={{margin: 10, flex: 1}}
      />

      <View
        style={{
          height: 45,
          flexDirection: 'row',
        }}>
        <TextInput
          onChangeText={val => setComment(val)}
          value={comment}
          style={{
            backgroundColor: '#ddd',
            color: '#333',
            paddingHorizontal: 10,
            flex: 1,
          }}
        />
        <TouchableOpacity
          onPress={sendComment}
          style={{backgroundColor: '#0f8', padding: 10, paddingHorizontal: 15}}>
          <Text style={{color: '#333', fontSize: 18}}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Comment({title, body}) {
  return (
    <View
      style={{
        backgroundColor: '#ddd',
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 8,
        borderRadius: 5,
        width: '100%',
      }}>
      <Text style={{color: '#666', fontSize: 12}}>{title}</Text>
      <Text style={{color: '#333', fontSize: 16}}>{body}</Text>
    </View>
  );
}
