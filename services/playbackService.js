// you created this!!!

import TrackPlayer, {STATE_BUFFERING, STATE_READY} from 'react-native-track-player';

module.exports = async function() {


  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());


  TrackPlayer.addEventListener('playback-error', async () => {
    var a = await TrackPlayer.getState();
    console.log(a + "playback error");
  });

  // TrackPlayer.addEventListener('playback-state', async (state) => {
  //   if(state === STATE_READY) {
  //     // await TrackPlayer.play()
  //     console.log("playback ready from service");
  //
  //
  //   }
  //
  //   if(state === STATE_BUFFERING) {
  //     console.log("playback service 33: playback is buffering ");
  //
  //   }
  //
  // });

  // TrackPlayer.addEventListener()

  // This service needs to be registered for the module to work
  // but it will be used later in the "Receiving Events" section
};

