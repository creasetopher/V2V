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
  ViewPropTypes, SafeAreaView, FlatList, StatusBar, Button, Dimensions,
} from 'react-native';
import Player from './Player';
import Track from '../models/Track';

import playerService from '../services/playerService';
import LinearGradient from "react-native-linear-gradient";
import {showMessage} from 'react-native-flash-message';


export default class PlayerComponent extends React.Component {


  state = {
    trackTitles: null,
    playbackState: null,
    currentTrack: null,
    selectedTrack: null
  }

  constructor(props) {
    super(props);
    this.togglePlayback = this.togglePlayback.bind(this);

    this.listener =  this.props.navigation.addListener('focus', () => {
      playerService.getTracksFromLibrary()
          .then( (tracks) => {
            this.setState(
                {trackTitles: tracks}
            )
          })

    })

  }

  playNow(fileObj) {


    //dont reset because this clears the queue -- after track plays,
    // queue is empty, nothing plays next

    TrackPlayer.reset().then(
      TrackPlayer.add({
        id: (fileObj.id).toString(),
        url: "file://" + fileObj.path,
        title: trimTrackName(fileObj.name),
        artist: "",
        artwork: fileObj.image
      })
          .then(() => {
            TrackPlayer.skip((fileObj.id).toString())
                .then(() => TrackPlayer.play())
          })
    )
  }


  async getPlaybackState() {
   return await TrackPlayer.getState()
  }

  renderItem = ({ item }) => {

    if(item) {
      // console.log(item.name)
      // const backgroundColor = item.id === this.state.selectedTrack.id ? "#6e3b6e" : "#f9c2ff";
      const backgroundColor = "#BAB1B8"

      // console.log(item.path);
      return (

          <Item
              item={item}
              onPress={() => {
                console.log(item);
                this.playNow(item)
              }}
              style={{backgroundColor}}
          />
      );
    }
  };


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
        {playbackState: playbackState}
    ));


    playerService.getTracksFromLibrary()
        .then( (tracks) => {
          this.setState(
              {trackTitles: tracks}, () => {
                this.state.trackTitles.forEach( track =>
                TrackPlayer.add({
                  id: (track.id).toString(),
                  url: "file://" + track.path,
                  title: trimTrackName(track.name),
                  artist: "",
                  artwork: track.image
                }))}
          )
        })



    TrackPlayer.addEventListener('playback-state',(playbackState) => {

      this.setState({playbackState: playbackState.state})
    });

  }

  async togglePlayback() {

    console.log(this.state.playbackState  === TrackPlayer.STATE_PLAYING)
    // TrackPlayer.getCurrentTrack().then(track => console.log(track));

    if (this.state.playbackState === TrackPlayer.STATE_PLAYING ||
        this.state.playbackState === TrackPlayer.STATE_BUFFERING ) {
      await TrackPlayer.pause()
    }
    else if(
        this.state.playbackState === TrackPlayer.STATE_PAUSED ||
        this.state.playbackState === TrackPlayer.STATE_STOPPED ||
        this.state.playbackState === TrackPlayer.STATE_READY
    ){

      await TrackPlayer.play()
    }

    this.getPlaybackState()
        .then(playbackState => {
          console.log(playbackState);

          this.setState(
        {
          playbackState: playbackState
            }
        )})

  }

  render(): React.ReactNode {


    return (

        <LinearGradient colors={['#A491B5', '#3b5998', '#91B5A6']} style={styles.linearGradient}>

          <View style={styles.playerComponent}>
            <Player onNext={() => TrackPlayer.skipToNext()}
                    onTogglePlayback={this.togglePlayback}
                    onPrevious={() => TrackPlayer.skipToPrevious()}/>

            {this.state.trackTitles &&
            <SafeAreaView style={styles.container}>
              <FlatList
                  data={this.state.trackTitles}
                  renderItem={this.renderItem}

                  keyExtractor={item => {
                    if(item){
                      return (item.id).toString()
                    }
                  }}

                  extraData={this.state.selectedTrack}
              />
          </SafeAreaView>
          }

          {/*<Button onPress={() => console.log(this.state.trackTitles)}*/}
          {/*        title="log tracks"*/}
          {/*        color="#871589"/>*/}

          </View>
        </LinearGradient>
    );
  }
}

const trimTrackName = (trackName)  => {
  trackName = trackName.replace(".mp3", "")

  if(trackName.length > 50) {
    trackName = trackName.substring(0, 40)
  }

  return trackName;
}


const Item = ({item, onPress, style}) => {

  let itemName = item.name.substring(0, item.name.indexOf("_Track"));
  return(

    <TouchableOpacity
        onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title} numberOfLines={1}>{itemName}</Text>
    </TouchableOpacity>
  );
}




const styles = StyleSheet.create({

  linearGradient: {
    flex: 1,
    borderRadius: 5,
    marginBottom: 0,
    paddingBottom: 0

  },

  container: {
    marginTop: 10,
    flex: 1
  },

  playerComponent: {
    flex: 1,
    marginLeft: 50,
    marginTop: 40,
    marginRight: 50,
    marginBottom: 30,
    alignItems: "center",
  },

  item: {
    backgroundColor: '#cbe5d7',
    padding: 9,
    height: 35,
    marginVertical: 3,
    borderWidth: 1,
    borderRadius: 10,

    elevation: 1,
    shadowRadius: 2,
    shadowOpacity: .8,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 }

  },
  title: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 13,
    fontFamily: "MalayalamSangamMN",
    fontWeight: "bold"
  },
})
