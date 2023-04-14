import {ScrollView} from 'react-native';
import {Container} from '../styles/FeedStyles';

import PostCard from '../components/PostCard';

export default function HomeScreen() {
  return (
    <ScrollView>
      <Container>
        <PostCard />
      </Container>
    </ScrollView>
  );
}
