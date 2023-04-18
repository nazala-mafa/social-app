import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function App() {
  // Animate Layout
  const styleVal = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(styleVal.value, {duration: 500}),
    };
  });
  React.useEffect(() => {
    styleVal.value = 1;

    const getUser = () => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data());
          }
        });
    };

    getUser();
  }, []);

  // BottomSheet
  const bottomSheetRef = React.useRef(null);
  const bottomSheetSnap = React.useMemo(() => [1, '50%'], []);

  // Profile Image
  const {user} = React.useContext(AuthContext);
  const [image, setImage] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  // Form
  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({...userData, userImg: imgUrl})
      .then(() => {
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };

  // Botto Sheet
  const takePhotoFromCamera = () => {
    ImageCropPicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      bottomSheetRef.current.close();
    });
  };

  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        bottomSheetRef.current.close();
      })
      .catch(e => {
        console.log(`Error : ${e}`);
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={() => bottomSheetRef.current.expand()}>
        <ProfileImage image={image} userData={userData} />
      </TouchableOpacity>
      <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
        {userData ? userData.fname : ''} {userData ? userData.lname : ''}
      </Text>

      {/* Input */}
      <View style={{margin: 20, width: '85%'}}>
        <View style={styles.action}>
          <Icon name="person-outline" color="#333333" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.fname : ''}
            onChangeText={txt => setUserData({...userData, fname: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="person-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.lname : ''}
            onChangeText={txt => setUserData({...userData, lname: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="person-outline" color="#333333" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="About Me"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.about : ''}
            onChangeText={txt => setUserData({...userData, about: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="call-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="phone-pad"
            autoCorrect={false}
            value={userData ? userData.phone : ''}
            onChangeText={txt => setUserData({...userData, phone: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="person-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.country : ''}
            onChangeText={txt => setUserData({...userData, country: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="person-outline" color="#333333" size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.city : ''}
            onChangeText={txt => setUserData({...userData, city: txt})}
            style={styles.textInput}
          />
        </View>
        <FormButton title={'Update'} onPress={handleUpdate} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={bottomSheetSnap}
        detached
        enablePanDownToClose>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>
              Choose Your Profile Picture
            </Text>
          </View>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={takePhotoFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bottomSheetRef.current.close()}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    marginLeft: 10,
    color: '#333333',
  },
  // Bottom Sheet
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

function ProfileImage({image, userData}) {
  return (
    <View
      style={{
        height: 100,
        width: 100,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground
        source={{
          uri: image
            ? image
            : userData
            ? userData.userImg ||
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
            : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
        }}
        style={{height: 100, width: 100}}
        imageStyle={{borderRadius: 15}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="camera"
            size={20}
            color="#fff"
            style={{
              opacity: 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 10,
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
