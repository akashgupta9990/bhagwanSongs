import AuthWrapper from '../components/AuthWrapper';
import HomeScreen from './screens/HomeScreen';

export default function Index() {
  return (
    <AuthWrapper>
      <HomeScreen />
    </AuthWrapper>
  );
}
