import React from 'react';
import
  TrackPlayer, {
  TrackPlayerEvents} from 'react-native-track-player';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes} from 'react-native';
import Player from './Player';

export default class PlayerComponent extends React.Component {


  constructor(props) {
    super(props);
    this.togglePlayback = this.togglePlayback.bind(this);
  }

  state = {
    playback: null,
    trackArtist: '',
    trackTitle: '',
    trackAlbum: '',

  }

  async getPlaybackState() {
   return await TrackPlayer.getState()
  }


  componentDidMount(): void {
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ]
    });

    this.getPlaybackState().then(playbackState => this.setState(
        {playback: playbackState}
    ));

    // let track = {
    //   id: "1234", // Must be a string, required
    //
    //
    //   url: 'file///Users/chrissims/Library/Developer/CoreSimulator/Devices/07A47CE7-672F-418D-8F21-8E8B02EB0215/data/Containers/Data/Application/146A7817-53D4-492C-9ECC-21DDB0360F16/Documents/MediaLibrary/RNFetchBlobTmp_x49ga6kblxqhtzgeml2dl.mp3',
    //   // url: `file://${localUrl}`, // Load media from the file system
    //
    //   title: "test",
    //   artist: "Test",
    //
    // };
    //
    // TrackPlayer.add([track]).then(() => console.log("track enqueued"));


    // TrackPlayer.addEventListener('playback-track-changed', async (data) => {
    //   console.log(data);
    //   // const track = await TrackPlayer.getTrack(data.nextTrack);
    //   // this.setState({trackTitle: track.title});
    // });

  }

  async togglePlayback() {
    console.log("pause pressed");
    console.log(this.getPlaybackState())
    TrackPlayer.getCurrentTrack().then(track => console.log(track));

    if (this.state.playback === TrackPlayer.STATE_PLAYING) {
      await TrackPlayer.pause()
    }

    else {
      await TrackPlayer.play()
    }

    this.getPlaybackState()
        .then(playbackState =>
            this.setState(
        {
                playback: playbackState
            }
        ))

  }

  render(): React.ReactNode {
    console.log(this.state);
    // TrackPlayer.setupPlayer().then(() => console.log('wut?'));
    return (
      <View style={styles.playerComponent}>
        <Text>hi</Text>
        <Player onNext={TrackPlayer.skipToNext}
                onTogglePlayback={this.togglePlayback}
                onPrevious={TrackPlayer.skipToPrevious}/>
      </View>
    );
  }

  // The player is ready to be used
}

const styles = StyleSheet.create({
  playerComponent: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 30,
  }
})
