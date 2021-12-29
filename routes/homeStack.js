import {
  NavigationContainer,
  createAppContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUnScreen from '../screens/SignUpScreen';
import FaceRecognitionRegister from '../screens/FaceRecognitionRegister';
const screens = {
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: SignInScreen,
  },
  FaceRegister: {
    screen: FaceRecognitionRegister,
  },
};

const HomeStack = createNativeStackNavigator(screens);

export default createAppContainer(HomeStack);
