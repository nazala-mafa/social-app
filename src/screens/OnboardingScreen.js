import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import onboardingImage1 from '../../assets/onboarding-img1.png';
import onboardingImage2 from '../../assets/onboarding-img2.png';
import onboardingImage3 from '../../assets/onboarding-img3.png';

export default function OnboardingScreen({navigation}) {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#f00',
          image: <Image source={onboardingImage1} />,
          title: 'Connect to the World',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#0f0',
          image: <Image source={onboardingImage2} />,
          title: 'Share Your Favorites',
          subtitle: 'Share Your Thoughts With Similar Kind of People',
        },
        {
          backgroundColor: '#00f',
          image: <Image source={onboardingImage3} />,
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
      ]}
    />
  );
}
