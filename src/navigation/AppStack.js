import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Pressable, View} from 'react-native';
import AddPostScreen from '../screens/AddPostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RN Social"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#2e64e5', fontSize: 18},
          headerStyle: {shadowColor: '#fff', elevation: 0},
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Pressable onPress={() => navigation.navigate('AddPost')}>
                <Icon name="add-outline" size={22} color="#2e64e5" />
              </Pressable>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerStyle: {
            backgroundColor: '#2e64e515',
            shadowColor: '#2e64e515',
            elevation: 0,
          },
          title: '',
        }}
      />
      <Stack.Screen
        name="HomeProfile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

const MessageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default function AppStack() {
  const getTabBarVisibility = route => {
    return true;
  };

  const tabBarIcon =
    name =>
    ({color, size}) =>
      <Icon color={color} size={size} name={name} />;

  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#2e64e5'}}>
      <Tab.Screen
        name="HomeTab"
        component={FeedStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: tabBarIcon('home-outline'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MessageTab"
        component={MessageStack}
        options={{
          tabBarIcon: tabBarIcon('chatbox-ellipses-outline'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarIcon: tabBarIcon('person-circle-outline'),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
