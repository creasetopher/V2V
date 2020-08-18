import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import * as Progress from 'react-native-progress';


export default class ProgressBarCircle extends React.Component {

    constructor(props) {
        super(props)
    }

    progress = 0;

    stopProgress() {
        clearInterval(this.interval)
    }

    interval = setInterval(() => {
        if(this.progress > 1) {
            this.stopProgress()
        }
        // if(this.progress %  ) {
        //     this.stopProgress()
        // }
        this.progress += .145268
        this.props.downloadProgressCallback()
        console.log(this.progress);

    }, 2300 )

    render() {

        return (
            <Progress.Pie borderWidth={2} progress={this.progress} size={60}/>
        );

        // let progress = this.props.downloadProgress.received / this.props.downloadProgress.total;
        // console.log(progress);

    }


}
