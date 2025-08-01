import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AudioScreen from './screens/AudioScreen';
import HomeScreen from './screens/HomeScreen';
import ScriptureScreen from './screens/ScriptureScreen';
import StoryScreen from './screens/StoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Audio" component={AudioScreen} />
        <Stack.Screen name="Scripture" component={ScriptureScreen} />
        <Stack.Screen name="Stories" component={StoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}