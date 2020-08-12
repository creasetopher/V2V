// you created this!!!

import TrackPlayer from 'react-native-track-player';

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('playback-state', async () =>  {
    TrackPlayer.getState().then(async state => {
      if(state === TrackPlayer.STATE_READY) {
        await TrackPlayer.play()
        console.log("ready")
      }
      if(state === TrackPlayer.STATE_BUFFERING) {
        await TrackPlayer.play()
        console.log("buffering")
      }
    })
  });

  TrackPlayer.addEventListener('playback-error', async () => {
    var a = await TrackPlayer.getState();
    console.log(a);
  });

  TrackPlayer.addEventListener('playback-track-changed', async () => await TrackPlayer.play());

  // TrackPlayer.addEventListener()

  // This service needs to be registered for the module to work
  // but it will be used later in the "Receiving Events" section
};

