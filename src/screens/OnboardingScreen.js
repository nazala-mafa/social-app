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
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#0f0',
          image: <Image source={onboardingImage2} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#00f',
          image: <Image source={onboardingImage3} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
}
