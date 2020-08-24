import React from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import { Button, Text } from 'react-native-elements';
import {Header} from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from "react-native-linear-gradient";


export default class SettingsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {

        return (
            <LinearGradient colors={['#C0DDF9', '#3b5998', '#361B69']} style={styles.linearGradient}>
                <View style={{flex: 1}}>

                    <Header title={"this"} navigation={this.props.navigation}>

                    </Header>
                </View>

                <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 25, fontFamily:"HelveticaNeue-Medium", textAlignVertical: 'center'}}>
                        Settings Component
                    </Text>

                </View>


            </LinearGradient>
        );
    }

}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        borderRadius: 5
    },

})
