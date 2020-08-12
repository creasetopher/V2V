

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
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import HomeComponent from './components/HomeComponent';
import TrackPlayer from 'react-native-track-player';
import PlaylistScreen from './screens/PlaylistScreen';
import PlayerComponent from './components/PlayerComponent';
import DownloaderComponent from './components/DownloaderComponent'
import {getBackgroundColor} from 'react-native/Libraries/LogBox/UI/LogBoxStyle';



// TrackPlayer.setupPlayer().then(async () => {
//   await TrackPlayer.add({
//     id: 'trackId',
//     url: require('./audio.mp3'),
//     title: 'Track Title',
//     artist: 'Track Artist',
//     artwork: require('./track.png'),
//   });
// });

export default class App extends React.Component {

  constructor() {
    super();
  }

  componentDidMount(){}


  render() {
    return (
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeComponent} />
            <Stack.Screen name="Player" component={PlayerComponent} />
            <Stack.Screen name="Download" component={DownloaderComponent} cardSt/>

          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

const Stack = createStackNavigator();


const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(77, 52, 102)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
  },
};

const styles = StyleSheet.create({


  scrollView: {
    backgroundColor: Colors.lighter,
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
