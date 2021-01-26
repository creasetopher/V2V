import React from 'react';
import PlayerComponent from './PlayerComponent';
import TrackPlayer from 'react-native-track-player';
import downloaderService from '../services/downloaderService';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from './Header';
Icon.loadFont()
import auth from '@react-native-firebase/auth';



import {View, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default class HomeComponent extends React.Component {

    state = {
        user: null
    }
  constructor(props) {
    super(props);
    // this.setState({user: auth().currentUser})
  }
  // setup player at start
  componentDidMount(): void {
      console.log("home mounted");
      console.log(this.props)
    downloaderService.createLibraryFolders();

}

  render() {
    return (
    <View style={{flex: 1}}>

        <View style={{flex: 1}}>
            <Header title={"this"} navigation={this.props.navigation}>

                {/*not currently shown */}
                    <Button
                        buttonStyle={{borderRadius: 10, backgroundColor: "purple", alignSelf:'flex-start', marginTop: 40}}
                        type='solid'
                        onPress={()=>{this.props.onBackPressed()}}
                        icon = {
                            <Icon
                                name="arrow-left"
                                size={35}
                                color="black"
                            />
                        }
                    />



            </Header>
        </View>

        <LinearGradient colors={['#C0DDF9', '#3b5998', '#361B69']} style={styles.linearGradient}>


            <View style={styles.homeContainer}>

                <View style={{flex:1}}></View>
                <View style={{flex:4, alignItems: "center"}}>

                    <Icon
                        name={'circle-o-notch'}
                        size={22}
                        color="black"
                    />
                    <Icon
                        name="child"
                        size={50}
                        color="black"
                    />
                    <Text style = {styles.homeText}>V2V</Text>
                </View>

            </View>
        </LinearGradient>
    </View>
    )
    // return <Text>hi</Text>;
  }
  // The player is ready to be used
}

// const Header = ({title, navigation}) => {
//
//     return (
//         <View style={styles.header}>
//             <View></View>
//             <Button
//                 onPress={() => navigation.openDrawer()
//                 }
//                 icon={<Icon
//                     name="bars"
//                     size={20}
//                     color="black"
//                 />}
//
//                 type={'clear'}
//             />
//
//         </View>
//     );
//
// }

const styles = StyleSheet.create({
    linearGradient: {
        flex: 8,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },

    header: {
        marginLeft: 15,
        alignItems: "flex-start",
        flexDirection: 'column',
        justifyContent: "space-between",
        backgroundColor: "white",
        flex: 2,
    },

    homeContainer: {
        flex: 6,
        alignItems: 'center'
    },

    homeText: {
        fontSize: 65,
    },

    hamburger: {
        position:'absolute',
        left: 0,
        top: 0,
        marginTop:10,
        marginRight: 35,
        zIndex: 1
    },

})
