import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function ChatsScreen({route}) {
  const [messages, setMessages] = useState([]);
  const [messagesRef, setMessagesRef] = useState([]);
  const [message, setMessage] = useState('');
  const {chatID, myID, myName, otherID, otherName} = route.params;

  useEffect(() => {
    const messagesRef = firestore()
      .collection('messages')
      .doc(chatID)
      .collection('messages');

    const unsubscribe = messagesRef.orderBy('createdAt').onSnapshot(query => {
      const updatedMessages = [];
      setMessagesRef(query);
      query.forEach(doc => {
        const message = doc.data();
        updatedMessages.push(message);
      });
      setMessages(updatedMessages);
    });

    return unsubscribe;
  }, []);

  const sendMessage = () => {
    if (message == '') return;

    firestore()
      .collection('messages')
      .doc(chatID)
      .collection('messages')
      .add({
        senderID: myID,
        senderName: myName,
        message: message,
        createdAt: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        setMessage('');
      });
  };

  const clearChat = () => {
    messagesRef.forEach(mRef => {
      mRef.ref.delete().then(() => {
        // console.log(mRef.data().message, ' deleted');
      });
    });
  };

  return (
    <View style={{flex: 1, margin: 5}}>
      <View style={{height: 40, flexDirection: 'row'}}>
        <Text style={styles.otherName}>{otherName}</Text>
        <TouchableOpacity onPress={clearChat}>
          <Text
            style={{
              color: '#fff',
              backgroundColor: '#933',
              padding: 5,
              paddingHorizontal: 10,
              fontSize: 18,
            }}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView>
          {messages.map(message => (
            <Chat
              title={message.senderID === myID ? 'You' : otherName}
              body={message.message}
              type={message.senderID === myID ? 'right' : 'left'}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={val => setMessage(val)}
          value={message}
          style={{
            backgroundColor: '#ddd',
            color: '#333',
            paddingHorizontal: 10,
            flex: 1,
          }}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{backgroundColor: '#0f8', padding: 10, paddingHorizontal: 15}}>
          <Text style={{color: '#333', fontSize: 18}}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Chat({type, title, body}) {
  return (
    <View style={{alignItems: type == 'right' ? 'flex-end' : 'flex-start'}}>
      <View
        style={{
          backgroundColor: type == 'right' ? '#0f6' : '#ddd',
          padding: 10,
          paddingHorizontal: 20,
          margin: 5,
          borderRadius: 5,
          maxWidth: '80%',
        }}>
        <Text style={{color: '#666', fontSize: 12, textAlign: type}}>
          {title}
        </Text>
        <Text style={{color: '#333', fontSize: 16, textAlign: type}}>
          {body}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otherName: {
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 5,
  },
  inputWrapper: {
    height: 45,
    flexDirection: 'row',
  },
});
