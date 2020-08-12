import React from 'react';
import PlayerComponent from './PlayerComponent';
import TrackPlayer from 'react-native-track-player';
import downloaderService from '../services/downloaderService';


import {View, Text, StyleSheet, Button} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export default class HomeComponent extends React.Component {
  constructor() {
    super();
  }
  // setup player at start
  componentDidMount(): void {
    TrackPlayer.setupPlayer().then(
      //
      // TrackPlayer.add({
    //     id: 'this.state.track', // Must be a string, required
    //
    //     url: `file:///Users/chrissims/Library/Developer/CoreSimulator/Devices/07A47CE7-672F-418D-8F21-8E8B02EB0215/data/Containers/Data/Application/D5FC2B7E-36E2-485F-8F77-60C18D09DBF6/Documents/MediaLibrary/RNFetchBlobTmp_27d4z08zhfdiq5qswd77e.mp3`, // Load media from the file system
    //     // url:"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
    //     title: 'this.state.track.title',
    //     artist: 'this.state.track.author',
    //
    //     artwork: 'this.state.track.thumbnailUrl', // Load artwork from the network
    // })
    //     .then(

      this.props.navigation.navigate('Player'));
    downloaderService.createLibraryFolder();

    RNFetchBlob.fs.exists(
            `/Users/chrissims/Library/Developer/CoreSimulator/Devices/07A47CE7-672F-418D-8F21-8E8B02EB0215/data/Containers/Data/Application/D5FC2B7E-36E2-485F-8F77-60C18D09DBF6/Documents/MediaLibrary/RNFetchBlobTmp_27d4z08zhfdiq5u6qswd77e.mp3`).then(exists => console.log(exists));
//    after player is setup, nav to player component
}


  render() {
    return (
        <View>
          <Text style = {styles.homeText}>V2V</Text>


        <Button onPress={() => this.props.navigation.navigate('Player')}
                title="Go to Player"
                color="#841584"/>


        <Button onPress={() => this.props.navigation.navigate('Download')}
                title="Go to Downloader"
                color="#871589"/>

        </View>

    )
    // return <Text>hi</Text>;
  }
  // The player is ready to be used
}

const styles = StyleSheet.create({
  homeText: {
    fontSize: 100,
    marginTop: 150,
    marginLeft: 100,
    marginBottom: 30,
}
})
