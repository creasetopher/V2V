import React from 'react';
import downloaderService from '../services/downloaderService';
import {StyleSheet, TextInput, View, TouchableOpacity, Image, Alert, Dimensions} from 'react-native';
import {VALIDATE_ENDPOINT, API_URL, DOWNLOAD_ENDPOINT, isWhitelistedURL} from '../common/constants';
import {queryString} from '../common/utils';
import ProgressBarCircle from './ProgressCircleComponent';
import ProgressBarComponent from './ProgressBarComponent';
import TrackPlayer from 'react-native-track-player';
import Track from '../models/Track';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage, hideMessage } from "react-native-flash-message";
import LinearGradient from "react-native-linear-gradient";
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()


const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;


export default class DownloaderComponent extends React.Component {

    downloadProgress: null;
    listener: null;

    state = {
        url: '',
        track: null,
        isFetching: false,
        isDownloading: false,
    }


    constructor(props) {
        super(props);
        this.onNetworkFail = this.onNetworkFail.bind(this);
        this.downloadProgressCallBack = this.downloadProgressCallBack.bind(this);
        this.updateDownloadProgress = this.updateDownloadProgress.bind(this);
        this.listener =  this.props.navigation.addListener('focus', () => {
            if(this.props.route.params && this.props.route.params.url != null) {
                this.setState({
                    url: this.props.route.params.url
                }, () => this.validate())
            }

        })

    }


    componentDidMount() {
        console.log("mounted downloader");

        if(this.props.route.params && this.props.route.params.url != null) {
            this.setState({
                url: this.props.route.params.url
            }, () => this.validate())
        }



        let dummyTrack = new Track({
                track: {
                    title: "Title - Title Dudes",
                    author: "author",
                    views: 100000,
                    length: 200,
                    thumbnail: "https://g.foolcdn.com/editorial/images/553815/line-on-chart-falling-stock-down.jpg"
                }
            })
        // this.setState({track: dummyTrack})


    }

    updateDownloadProgress() {
        this.forceUpdate()
    }


    getAllTracks() {
        downloaderService.getTracksFromLibrary().then( tracks =>  {
            // console.log("getlibtracks resolved?")
            // console.log(tracks)

            this.enqueueTracks(tracks)
        })
        // console.log("getalltracks called")
    }



    enqueueTracks(tracks) {
        tracks.forEach(trackObj => {
            TrackPlayer.add({
                id: trackObj.id,
                title: trackObj.name,
                url: 'file://' + trackObj.path,
                artist: ''
            }).then( () => {
                console.log("track enqueued: " + trackObj.name)
            });

        })



    }



    enqueueTrack(localUrl) {

        // let filePath = `${dirs.DocumentDir}/${this.state.track.title}`
        // let fp = `${RNFetchBlob.fs.dirs.DocumentDir}/MediaLibrary/${this.state.track.title}`
        // console.log("this is fp from enqueue " + fp)
        // console.log("the path given to enqueue " + localUrl);
        let track = {
            id: this.state.track.title, // Must be a string, required

            url: `file://${localUrl}`, // Load media from the file system

            title: this.state.track.title,
            artist: this.state.track.author,

            artwork: this.state.track.thumbnailUrl, // Load artwork from the network
        };

        TrackPlayer.add([track]).then( () => console.log("track enqueued"));

    }

    onValidateSuccess() {
        {
            Alert.alert(
                "Success",
                "Found Video File!",
                [
                    {
                        text: "Ok",
                        onPress: () => {},
                        style: "default"
                    },
                ],
                { cancelable: true }
            );

        }
    }

    onBadInput() {
        Alert.alert(
            "Error",
            "Please enter a valid URL. A legit, reputable video hosting site.",
            [
                {
                    text: "Ok",
                    onPress: () => {},
                    style: "default"
                },
            ],
            { cancelable: true }
        );
    }

    onNetworkFail() {


        {
            Alert.alert(
                "Error",
                "Unable to fetch Video File. Please check network connectivity and try again.",
                [
                    {
                        text: "Ok",
                        onPress: () => {},
                        style: "default"
                    },
                ],
                { cancelable: true }
            );

        }

        this.setState(
            {
                isFetching: false
            }
        )

    }



    async validate() {

        if(!isWhitelistedURL(this.state.url)) {
            this.onBadInput()
            return
        }

        this.setState(
            {
                isFetching: true
            }
        )



        const track = await downloaderService.getInfo(
            `${API_URL}${VALIDATE_ENDPOINT}${queryString('url', this.state.url)}`,
            this.onNetworkFail)

        // this.state.track = new Track(track)

        if (Boolean(track)) {

            this.setState(
                {
                    track: new Track(track),
                    isFetching: false
                }
            )

            this.onValidateSuccess();

        }

    }


    downloadProgressCallBack(received, total) {
        this.downloadProgress =  {received, total}
        // console.log(received + " " + total)
    }



    async download() {

        if(this.state.url) {
            this.setState({isDownloading: true})

            await downloaderService.download(
                `${API_URL}${DOWNLOAD_ENDPOINT}${queryString('url', this.state.url)}`,
                this.state.track.title,
                this.onNetworkFail,
                this.downloadProgressCallBack
            ).then(downloadPath => {
                // console.log("??   " + downloadPath)
                // this.enqueueTrack(downloadPath)

            });

            this.setState({isDownloading: false})
            showMessage({
                message: "Download added to Library!",
                type: "success",
            });
        }

    }



    render() {
        return (
            <LinearGradient colors={['#E3FDF6', '#624E86', '#2C1D47']} style={styles.linearGradient}>

                {!this.state.track &&

                <>
                    <View style={styles.inputContainer}>


                        <TextInput
                            style={styles.urlInput}
                            onChangeText={text =>
                                this.setState({
                                    url: text
                                })
                            }
                            value={this.state.url}
                            placeholder="URL"

                        />

                        <Button onPress={

                            async () => {
                                await this.validate()

                            }
                        }
                                buttonStyle={styles.buttonStyle}
                                title={"fetch vid"}
                                titleStyle={styles.buttonText}
                        >


                        </Button>


                    </View>



                    <View style={{marginTop: 50}}>

                        <Text h3={true} h3Style={{color: "white", alignSelf: "center"}}>
                        Browser
                        </Text>

                        <Button onPress={() => this.props.navigation.navigate('Web Download')}
                            type={'clear'}
                            icon={
                                <Icon
                                    name="grav"
                                    size={75}
                                    color="black"
                                />
                            }
                        >


                        </Button>

                    </View>
                </>
                }




                <View style = {styles.trackInfoContainer}>


                    {
                        this.state.isFetching &&
                        <ProgressBarCircle/>
                    }

                    {
                        this.state.track &&

                        <View style={{justifyContent: 'center'}}>

                            <Text style = {styles.trackInfoText}>
                                {this.state.track.author + "\n"}
                                {this.state.track.title + "\n"}
                                {this.state.track.views.toString() + " views\n"}

                                {Math.floor(this.state.track.length / 60)}:{this.state.track.length % 60}

                            </Text>


                            <View style={{
                                borderTopLeftRadius: 50,
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                borderBottomRightRadius: 50,
                                overflow: 'hidden',
                                alignSelf: 'center'}}>
                                <Image
                                    source={{uri: this.state.track.thumbnailUrl}}
                                    style={{width: imageWidth, height: 255, alignSelf: 'center'}}

                                />
                            </View>

                            {!this.state.isDownloading &&



                                <Button
                                    onPress={
                                        async () => {
                                            await this.download();
                                        }
                                    }

                                    containerStyle={{marginLeft: 100, marginRight: 100}}

                                    title={"Download"}

                                    titleStyle={{color: "#D2FFF0", marginLeft: 5}}

                                    buttonStyle={styles.downloadButtonStyle}

                                    type={'outline'}

                                    icon={

                                        <Icon
                                            name="cloud-download"
                                            size={50}
                                            color="black"
                                        />
                                    }
                                />

                            }


                            {this.state.isDownloading &&
                                <View style={{alignSelf: "center", marginTop: 10}}>
                                    <ProgressBarComponent
                                        downloadProgress = {this.downloadProgress != null ? this.downloadProgress : {received: 0, total: 1}}
                                        downloadProgressCallback = {this.updateDownloadProgress}
                                    />
                                </View>

                            }



                        </View>

                    }


                </View>
            </LinearGradient>

        )
    }

}


const styles = StyleSheet.create({

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },

    inputContainer: {
        marginTop: 20,
        flex: 2,
        justifyContent: 'center',

    },


    trackInfoContainer: {
        marginTop: 50,
        alignSelf: "center",
        alignContent: 'center',
        alignItems: 'center',
        flex: 4,
    },

    buttonText: {
        textAlign: 'center',
        color: 'white'


    },

    buttonStyle: {
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 2,
        height: 40,
        justifyContent: 'center',
        borderRadius:10,
        backgroundColor: 'transparent'


    },

    downloadButtonStyle:{
        borderColor: "black",
        borderWidth: 2,
        marginTop: 25,
        marginBottom: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },

    urlInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius:10,
        backgroundColor: 'white'
        // flex: 2,
        // marginTop: 150,
        // marginLeft: 100,
        // marginBottom: 30,
    },

    trackInfoText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: "Futura",
        color: 'white'

    }


})
// TrackPlayer.add({
//     id: 'trackId',
//     // url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
//     url: 'file:///Users/chrissims/Library/Developer/CoreSimulator/Devices/07A47CE7-672F-418D-8F21-8E8B02EB0215/data/Containers/Data/Application/2F2A1779-30F1-4AD1-936E-2A5E638B16F8/Documents/RNFetchBlob_tmp/RNFetchBlobTmp_rf7pshxcbwf2f3h4pp4x4.mp3',
//     title: 'Track Title',
//     artist: 'Track Artist',
//     artwork: ''
// }).then(this.props.navigation.navigate('Player'))
