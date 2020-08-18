import React from 'react';
import { WebView } from 'react-native-webview';
import {Button, TouchableHighlight} from 'react-native';

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

    getWatchParam(url) {
        let newUrl = null;

        if(url.startsWith("https://youtube.com")
            || url.startsWith("https://m.youtube.com")) {

            if (url.indexOf("watch?") != -1) {

                newUrl = url;

                if (url.indexOf("&") != -1) {

                    newUrl = url.substring(
                        0,
                        url.indexOf("&")
                    )
                }
            }
        }

        return newUrl;

    }

    isYoutubeVideo(url) {

        url = this.getWatchParam(url);

        if(url !== null) {
            this.webview.stopLoading()
            // this.props.navigation.

             this.props.navigation.navigate('V2V', {
                 screen: "Download",
                 params: {url: url}
             })

            this.webview.goBack()

        }
    }



    render() {
        return (

            <WebView
                ref={(ref) => (this.webview = ref)}
                source={{ uri: 'https://youtube.com' }}
                style={{ marginTop: 20 }}
                onNavigationStateChange = { request => {
                    // console.log(navState);
                    // Keep track of going back navigation within component
                    // console.log(request)
                    this.isYoutubeVideo(request.url)
                }}
                mediaPlaybackRequiresUserAction={true}
            />
        );
    }
}
