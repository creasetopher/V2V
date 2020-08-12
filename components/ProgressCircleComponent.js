import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import * as Progress from 'react-native-progress';


export default class ProgressBarCircle extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Progress.Circle size={70} indeterminate={true} />
        )
    }


}
