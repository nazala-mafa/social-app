import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FormButton({
  onPress,
  title,
  iconType,
  buttonStyle,
  titleStyle,
}) {
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle]}>
      {iconType && <Icon name={iconType} style={[styles.icon, titleStyle]} />}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#25f',
    width: '100%',
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  icon: {
    fontSize: 26,
    position: 'absolute',
    left: 12,
  },
});
