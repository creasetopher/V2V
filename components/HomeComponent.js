import React from 'react';
import PlayerComponent from './PlayerComponent';
import TrackPlayer from 'react-native-track-player';
import downloaderService from '../services/downloaderService';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from './Header';
Icon.loadFont()



import {View, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  // setup player at start
  componentDidMount(): void {
      console.log("home mounted");
    downloaderService.createLibraryFolders();

    // RNFetchBlob.fs.exists(
    //         `/Users/chrissims/Library/Developer/CoreSimulator/Devices/07A47CE7-672F-418D-8F21-8E8B02EB0215/data/Containers/Data/Application/D5FC2B7E-36E2-485F-8F77-60C18D09DBF6/Documents/MediaLibrary/RNFetchBlobTmp_27d4z08zhfdiq5u6qswd77e.mp3`).then(exists => console.log(exists));
//    after player is setup, nav to player component
}


  render() {
    return (
    <View style={{flex: 1}}>

        <View style={{flex: 1}}>
            <Header title={"this"} navigation={this.props.navigation}>

                    <Button
                        buttonStyle={{borderRadius: 10, backgroundColor: "purple", alignSelf:'flex-start'}}
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
