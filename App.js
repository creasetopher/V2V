import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createStackNavigator } from '@react-navigation/stack';

import FlashMessage from "react-native-flash-message";

import HomeComponent from './components/HomeComponent';
import PlayerComponent from './components/PlayerComponent';
import DownloaderComponent from './components/DownloaderComponent'
import HomeTabBarIcon from './components/HomeTabBarIcon';
import PlaylistTabBarIcon from './components/PlaylistTabBarIcon';
import DownloadTabBarIcon from './components/DownloadTabBarIcon';
import {Text} from 'react-native-elements';
import SettingsComponent from './components/SettingsComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import auth from '@react-native-firebase/auth';
import {SignOut} from './components/SignOut';
import {NavDrawer} from './components/NavDrawer';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const getUser = () => auth().currentUser;

function Tabs(props) {
    let tryGetUser;
    try {
        tryGetUser = props.route.params.user
    }
    catch (e) {
        tryGetUser = getUser()
    }
    if (tryGetUser == null) {
        tryGetUser = {name: "New User"}
    }

    const user = tryGetUser;


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
                      initialParams = {{user: user}}

                      options={
                        {tabBarIcon:  (props) => <DownloadTabBarIcon {...props}/>}
                      }
          />

          <Tab.Screen name="Home"
                      component={HomeComponent}
                      initialParams = {{user: user}}
                      options={
                        {tabBarIcon:  (props) => <HomeTabBarIcon {...props}/>}
                      }
          />

          <Tab.Screen name="Player" component={PlayerComponent}
                      initialParams = {{user: user}}
                      options={
                        {tabBarIcon:  (props) => <PlaylistTabBarIcon {...props}/>}
                      }
          />


          {/*<Tab.Screen name="Web Download" component={WebviewDownloaderComponent}/>*/}
        </Tab.Navigator>
    );
  // }
}

function Drawers(props) {
    console.log("props from Dra");
    console.log(props.route);


    return(
        <>
                <Drawer.Navigator initialRouteName="Home"
                    drawerContent = {NavDrawer}>
                    <Drawer.Screen name="Home"
                                   component={Tabs}
                                   options = {

                                       {
                                           headerStyle: {
                                               height: 90,
                                               backgroundColor: '#f4511e'
                                           },
                                           title: "Home"
                                       }
                                   }
                    />

                    <Drawer.Screen name="Settings"
                                   component={SettingsComponent}
                                   options = {{
                                       title: "Settings"
                                   }}
                    />

                </Drawer.Navigator>

            <FlashMessage position="top" />

        </>

    );
}


export default class App extends React.Component {

    state = {
        user: getUser(),
        // unsubscribe: null,
        // isInitializing: true
    }

    constructor() {
        super();
        // this.setState({user: auth().currentUser})
    }



  componentDidMount(){
        // const unsubscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
        // this.setState({unsubscribe: unsubscriber})

  }

    // onAuthStateChanged = (user) => {
    //
    //     if(user) {
    //         this.setState({
    //             user: user,
    //             isInitializing: false
    //         })
    //
    //     }
    //
    // }


    componentWillUnmount(): void {
  }


    render() {

            return (
                    <>

                    <NavigationContainer>
                            <Stack.Navigator initialRouteName={this.state.user ? 'Drawers' : 'Register'}>


                                <Stack.Screen name="Register"
                                              component={RegisterComponent}
                                              options={
                                                  {
                                                      title: "Sign Up"
                                                  }}
                                />

                                <Stack.Screen name="Login"
                                              component={LoginComponent}
                                              options={
                                                  {
                                                      title: "Login"
                                                  }}
                                />


                                <Stack.Screen name="Drawers"
                                              component={Drawers}
                                              options={{
                                                  headerShown: false
                                              }}

                                />

                            </Stack.Navigator>

                        </NavigationContainer>
                        <FlashMessage position="top"/>

                    </>
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
