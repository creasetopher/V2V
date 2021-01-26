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
        username: {
            rawString: null,

            asEmail : () => `${this.state.username.rawString}@v2v.io`
            },
        password: null,
    }

    constructor(props) {
        super(props);
        if (auth().currentUser) {
            console.log(auth().currentUser);
            this.props.navigation.navigate('Drawers')
        }

        // this.listener =  this.props.navigation.addListener('focus', () => {
        //     if(this.props.route.params && this.props.route.params.url != null) {
        //         this.setState({
        //             url: this.props.route.params.url
        //         })
        //     }
        //
        // })
    }

    // setup player at start
    componentDidMount(): void {

    }

    makeEmail() {

    }

    handleLogin() {

        console.log("in login handler")

        try {
            auth().signInWithEmailAndPassword(this.state.username.asEmail(), this.state.password)
                .then(() => {
                    this.props.navigation.navigate('Drawers', {
                        screen: "Home",
                        params: {user: auth().currentUser},

                    });
                })
                .catch(error => {
                    if (error.code === 'auth/wrong-password'
                        || error.code === 'auth/invalid-email'
                        || "auth/user-not-found") {
                        showMessage({
                            message: "Invalid email and/or password! 😬",
                            type: "danger",
                        });
                    } else {
                        console.log("An error with auth: " + error);
                    }
                });

        }

        catch (e) {
            console.error("Unable to connect to Firebase!")
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
                        onChangeText={(text) => {
                            this.setState( prevState => {
                                let s = {...prevState}
                                s.username.rawString = text
                                return s;
                            });

                        }}
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

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.handleLogin()}>
                        <Text style={styles.buttonTitle}>Sign in</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Forgot password?
                            <Text style={styles.footerLink}> Reset Password</Text>
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
