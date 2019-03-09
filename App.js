import {
  createStackNavigator,
} from 'react-navigation';

import SignUp from './SignUp';
import Login from './Login';
import Main from './Main';

export default createStackNavigator({
  Main:{ screen: Main },
  
  Login:{
    screen: Login
  },

  SignUp:{
    screen: SignUp
  }
}, {
  initialRouteName: 'Login',
  navigationOptions:{
    headerStyle:{
      backgroundColor: '#a80000',
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
      fontWeight: 'bold',
    },
  },
});
