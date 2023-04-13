import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen() {
  return (
    <View>
      <Icon name="mail" size={30} color="#900" />
      <Text style={{color: '#000'}}>Halaman Login</Text>
    </View>
  );
}
