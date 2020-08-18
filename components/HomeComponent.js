import React from 'react';
import PlayerComponent from './PlayerComponent';
import TrackPlayer from 'react-native-track-player';
import downloaderService from '../services/downloaderService';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()


import {View, Text, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  // setup player at start
  componentDidMount(): void {
      console.log("home mounted");
    downloaderService.createLibraryFolder();

    // RNFetchBlob.fs.exists(
    //         `/Users/chrissims/Library/Developer/CoreSimulator/Devices/07A47CE7-672F-418D-8F21-8E8B02EB0215/data/Containers/Data/Application/D5FC2B7E-36E2-485F-8F77-60C18D09DBF6/Documents/MediaLibrary/RNFetchBlobTmp_27d4z08zhfdiq5u6qswd77e.mp3`).then(exists => console.log(exists));
//    after player is setup, nav to player component
}


  render() {
    return (
        <LinearGradient colors={['#C0DDF9', '#3b5998', '#361B69']} style={styles.linearGradient}>

            <View>
              <Text style = {styles.homeText}>V2V</Text>


            {/*<Button onPress={() => this.props.navigation.navigate('Player')}*/}
            {/*        type={'clear'}*/}
            {/*        icon={*/}
            {/*            <Icon*/}
            {/*                name="list-alt"*/}
            {/*                size={15}*/}
            {/*                color="white"*/}
            {/*            />}*/}
            {/*        title={" playlist"}*/}
            {/*        titleStyle={{color: 'white'}}*/}
            {/*/>*/}


            {/*<Button onPress={() => this.props.navigation.navigate('Download')}*/}
            {/*        type={'clear'}*/}
            {/*        icon={*/}
            {/*            <Icon*/}
            {/*                name="chain"*/}
            {/*                size={15}*/}
            {/*                color="white"*/}
            {/*            />}*/}
            {/*        title={"download with url"}*/}
            {/*        titleStyle={{color: 'white', marginStart: 2}}*/}
            {/*/>*/}

            {/*<Button onPress={() => this.props.navigation.navigate('Web Download')}*/}
            {/*        type={'clear'}*/}
            {/*        icon={*/}
            {/*            <Icon*/}
            {/*                name="television"*/}
            {/*                size={15}*/}
            {/*                color="white"*/}
            {/*            />}*/}
            {/*        title={"download with url"}*/}
            {/*        titleStyle={{color: 'white'}}*/}
            {/*/>*/}

            </View>
        </LinearGradient>

    )
    // return <Text>hi</Text>;
  }
  // The player is ready to be used
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    homeText: {
        fontSize: 100,
        marginTop: 110,
        marginLeft: 100,
        marginBottom: 30,
    }
})
