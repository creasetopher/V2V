import React, { useState } from "react";
import PropTypes from "prop-types";
import TrackPlayer, {
    useTrackPlayerProgress,
    usePlaybackState,
    useTrackPlayerEvents
} from "react-native-track-player";
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    ViewPropTypes
} from "react-native";

const PROGRESS_MAX_X = 173;

const seek = async (pressLocation) => {
    let totalLength = await TrackPlayer.getDuration();
    return (pressLocation/PROGRESS_MAX_X) * totalLength;

}

function ProgressBar() {
    const progress = useTrackPlayerProgress();

    return (
        <TouchableWithoutFeedback onPress={ async (press) => {
            console.log(press);
            let secondToSeekTo = await seek(press.nativeEvent.locationX);
            await TrackPlayer.seekTo(secondToSeekTo)
        }}>

        <View style={styles.progress}>
            <View style={{ flex: progress.position, backgroundColor: "red" }} />
            <View
                style={{
                    flex: progress.duration - progress.position,
                    backgroundColor: "grey"
                }}
            />
        </View>
        </TouchableWithoutFeedback>
    );
}

function ControlButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Text style={styles.controlButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

ControlButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default function Player(props) {

    const playbackState = usePlaybackState();
    const [trackTitle, setTrackTitle] = useState("");
    const [trackArtwork, setTrackArtwork] = useState();
    const [trackArtist, setTrackArtist] = useState("");
    const [middleButtonText, setMiddleButtonText] = useState("►")


    useTrackPlayerEvents(["playback-track-changed", "playback-state"], async event => {

        if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const { title, artist, artwork } = track || {};
            let itemName = title.substring(0, title.indexOf("_Track"));

            setTrackTitle(itemName);
            setTrackArtist(artist);
            setTrackArtwork(artwork);
        }


        if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_STATE) {

            let currentPlayback = playbackState

            if (
                event.state === TrackPlayer.STATE_PLAYING ||
                event.state === TrackPlayer.STATE_BUFFERING
            ) {

                setMiddleButtonText("||");
            }

            else if (
                event.state === TrackPlayer.STATE_PAUSED ||
                event.state === TrackPlayer.STATE_STOPPED ||
                event.state === TrackPlayer.STATE_READY
            ) {
                console.log("in the event2" + event.state + " " + currentPlayback);

                setMiddleButtonText("►");
            }
        }
    });

    const { style, onNext, onPrevious, onTogglePlayback } = props;



    return (
        <View style={[styles.card, style]}>
            <Image style={styles.cover} source={{ uri: trackArtwork }} />
            <ProgressBar />
            <Text style={styles.title}>{trackTitle}</Text>
            <Text style={styles.artist}>{trackArtist}</Text>
            <View style={styles.controls}>
                <ControlButton title={"<<"} onPress={onPrevious} />
                <ControlButton title={middleButtonText} onPress={async () => {
                    await onTogglePlayback()
                }} />
                <ControlButton title={">>"} onPress={onNext} />
            </View>
        </View>
    );
}

Player.propTypes = {
    style: ViewPropTypes.style,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
    style: {}
};

const styles = StyleSheet.create({
    card: {
        width: "80%",
        elevation: 1,
        borderRadius: 10,
        marginTop: 30,
        shadowRadius: 2,
        shadowOpacity: 0.1,
        alignItems: "center",
        shadowColor: "black",
        backgroundColor: "#DBD7DF",
        shadowOffset: { width: 0, height: 1 }
    },
    cover: {
        width: 140,
        height: 140,
        marginTop: 20,
        backgroundColor: "grey"
    },
    progress: {
        height: 5,
        width: "90%",
        marginTop: 10,
        flexDirection: "row"
    },
    title: {
        textAlign: "center",
        marginTop: 10
    },
    artist: {
        fontWeight: "bold"
    },
    controls: {
        marginVertical: 20,
        flexDirection: "row"
    },
    controlButtonContainer: {
        flex: 1
    },
    controlButtonText: {
        fontSize: 18,
        textAlign: "center"
    }
});
