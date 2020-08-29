import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header} from './Header';
Icon.loadFont()
import auth from '@react-native-firebase/auth';

import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import {showMessage} from 'react-native-flash-message';

export default class LoginComponent extends React.Component {

    state = {
        username: null,
        name: null,
        email: null,
        password: null,
        confirmPassword: null
    }

    constructor(props) {
        super(props);
    }

    // setup player at start
    componentDidMount(): void {

    }

    handleRegister() {
        if(this.state.password === this.state.confirmPassword) {
            auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.props.navigation.navigate('Drawers');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    } else {
                        console.log("An error with auth: " + error);
                    }
                });
        }
        else {
            showMessage({
                message: "Passwords do not match 👀",
                type: "danger",
            });
        }
    }


    render(): React.ReactNode {
        return (

            <View style={styles.container}>
                <View
                    style={{ flex: 1, width: '100%' }}>

                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => {this.setState({username: text})}}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => {this.setState({email: text})}}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Name (optional)'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => {this.setState({name: text})}}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => {this.setState({password: text})}}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Confirm Password'
                        onChangeText={(text) => {this.setState({confirmPassword: text})}}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.handleRegister()}>
                        <Text style={styles.buttonTitle}>Create account</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Already got an account?
                            <Text style={styles.footerLink} onPress={() => this.props.navigation.navigate('Login')}> Log in</Text>
                        </Text>
                    </View>
                </View>
            </View>

        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})
