import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import logo from '../../assets/rn-social-logo.png';
import {useState, useContext} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <FormInput
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText="Email"
          iconType="person-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock-closed-outline"
          secureTextEntry={true}
        />

        <FormButton onPress={() => login(email, password)} title="Sign In" />

        <TouchableOpacity>
          <Text style={{color: '#294eb3', fontSize: 18, marginBottom: 20}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <FormButton
          iconType="logo-facebook"
          onPress={() => {}}
          title="Sign In With Facebook"
          buttonStyle={{backgroundColor: '#a0b6f2'}}
          titleStyle={{color: '#294eb3'}}
        />

        <FormButton
          iconType="logo-google"
          onPress={() => {}}
          title="Sign In With Google"
          buttonStyle={{backgroundColor: '#f0adad'}}
          titleStyle={{color: '#d12828'}}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: '#294eb3', fontSize: 18, marginBottom: 20}}>
            Don't have an account? Create here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  input_input: {},
});
