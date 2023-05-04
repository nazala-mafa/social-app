import {View, Text, Image, StyleSheet, Pressable, Platform} from 'react-native';
import logo from '../../assets/rn-social-logo.png';
import {useState, useContext} from 'react';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {register} = useContext(AuthContext);

  return (
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

      <FormButton onPress={() => register(email, password)} title="Sign Up" />

      <Pressable>
        <Text style={{color: '#294eb3', fontSize: 18, marginBottom: 20}}>
          Forgot Password?
        </Text>
      </Pressable>

      {Platform.OS == 'android' ? (
        <View style={{width: '100%'}}>
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
        </View>
      ) : null}

      <Pressable
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={{color: '#294eb3', fontSize: 18, marginBottom: 20}}>
          have an account? Sign In
        </Text>
      </Pressable>
    </View>
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
});
