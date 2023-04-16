import {View, Text, Pressable} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

export default function ProfileScreen() {
  const {logout} = useContext(AuthContext);

  return (
    <View>
      <Text style={{color: '#333'}}>Profile Screen</Text>
      <Pressable onPress={logout}>
        <Text style={{color: '#333', borderWidth: 1, padding: 10}}>Logout</Text>
      </Pressable>
    </View>
  );
}
