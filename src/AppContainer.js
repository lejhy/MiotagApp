import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
  },
  SignIn: {
    screen: SignIn,
  },
});

export default createAppContainer(AppNavigator);
