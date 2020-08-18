

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import FlashMessage from "react-native-flash-message";
import HomeComponent from './components/HomeComponent';
import TrackPlayer from 'react-native-track-player';
import PlaylistScreen from './screens/PlaylistScreen';
import PlayerComponent from './components/PlayerComponent';
import DownloaderComponent from './components/DownloaderComponent'
import {getBackgroundColor} from 'react-native/Libraries/LogBox/UI/LogBoxStyle';
import WebviewDownloaderComponent from './components/WebviewDownloaderComponent';
import HomeTabBarIcon from './components/HomeTabBarIcon';
import PlaylistTabBarIcon from './components/PlaylistTabBarIcon';
import DownloadTabBarIcon from './components/DownloadTabBarIcon';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs(props) {
  // console.log("any props below");
  // console.log(props);

  const [url, setUrl] = React.useState("")


  if(props) {
    try {
      setUrl(
          props.route.params.url !== undefined ? props.route.params.url : null
      )
      props.navigation.jumpTo("Download", {url: url})
    }
    catch (e) {

    }
  }

  if(!url) {
    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            tabBarOptions={
              {
                activeBackgroundColor: '#C0DDF9',

                labelStyle: {fontSize: 14, marginBottom: 4},

                tabStyle: {flex:1, borderColor: "#20232a", borderWidth: 0, borderBottomColor: "transparent", backgroundColor: "transparent", borderBottomWidth: 0},

                style: {backgroundColor: "#transparent"},

                // allowFontScaling: false
              }
            }


        >
          <Tab.Screen name="Download"
                      component={DownloaderComponent}
                      {...props}

                      options={
                        {tabBarIcon:  (props) => <DownloadTabBarIcon {...props}/>}
                      }
          />

          <Tab.Screen name="Home"
                      component={HomeComponent}
                      options={
                        {tabBarIcon:  (props) => <HomeTabBarIcon {...props}/>}
                      }
          />

          <Tab.Screen name="Player" component={PlayerComponent}
                      options={
                        {tabBarIcon:  (props) => <PlaylistTabBarIcon {...props}/>}
                      }
          />


          {/*<Tab.Screen name="Web Download" component={WebviewDownloaderComponent}/>*/}
        </Tab.Navigator>
    );
  }
}

export default class App extends React.Component {

  constructor() {
    super();
  }

  componentDidMount(){}


  render() {

    return (

        <NavigationContainer>

          <Stack.Navigator>

            <Stack.Screen
                name="V2V"
                component={Tabs}
            />

            <Stack.Screen
                name="Web Download"
                component={WebviewDownloaderComponent}
                options={{ title: 'Download' }}
            />



          </Stack.Navigator>


        </NavigationContainer>

    );
  }
}


// const MyTheme = {
//   dark: false,
//   colors: {
//     primary: 'rgb(255, 45, 85)',
//     background: 'rgb(77, 52, 102)',
//     card: 'rgb(255, 255, 255)',
//     text: 'rgb(28, 28, 30)',
//     border: 'rgb(199, 199, 204)',
//   },
// };

const styles = StyleSheet.create({


  scrollView: {
    backgroundColor: Colors.lighter,
  },

  header: {



  },

  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    marginTop: 165,
    marginLeft: 165,

    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

// export default App;





//
// import React from "react";
// import { createStackNavigator, createAppContainer } from "react-navigation-stack";
//
// import LandingScreen from "./screens/LandingScreen";
// import PlaylistScreen from "./screens/PlaylistScreen";
//
// const AppNavigator = createStackNavigator(
//     {
//       Landing: {
//         screen: LandingScreen
//       },
//       Playlist: {
//         screen: PlaylistScreen
//       }
//     },
//     { initialRouteName: "Landing" }
// );
//
// const AppContainer = createAppContainer(AppNavigator);
//
// export default App = () => {
//   return <AppContainer />;
// }
