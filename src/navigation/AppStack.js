import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileSreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerShown: false}}
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
