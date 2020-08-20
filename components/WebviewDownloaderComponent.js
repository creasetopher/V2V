import React from 'react';
import { WebView } from 'react-native-webview';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import {getValidYoutubeVideo} from '../common/utils'
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// ITS UNDEF
const jsInjection = `
    let video = document.getElementsByTagName("VIDEO")[0];

    if(video !== null){
       alert(video)

       alert("?!")
    }        
    true;`;




export default class WebviewDownloaderComponent extends React.Component {


    webview = null;

    constructor(props) {
        super(props);
    }


    onValidRequest(validUrl) {
        this.webview.stopLoading()
        // this.props.navigation.

        this.props.onValidRequest(validUrl)

        this.webview.goBack()

    }



    render() {
        return (

        <View style={{flex: 1}}>
            <WebView
                ref={(ref) => (this.webview = ref)}
                source={{ uri: 'https://youtube.com' }}
                style={{ flex: 1 }}
                onNavigationStateChange = { request => {
                    // console.log(navState);
                    // Keep track of going back navigation within component
                    // console.log(request)
                    let validUrl = getValidYoutubeVideo(request.url)
                    if (validUrl != null) {
                        this.onValidRequest(validUrl)
                    }
                }}
                mediaPlaybackRequiresUserAction={true}
            />



            <View style={styles.floatingBackButtonView}>
                <Button
                    buttonStyle={{borderRadius: 30, backgroundColor: "purple"}}
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

            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({

    floatingBackButtonView: {
        position:'absolute',
        right: 0,
        bottom: 0,
        marginBottom:75,
        marginRight: 35,
        zIndex:1,
    },


})
