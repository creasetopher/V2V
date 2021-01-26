import React, { useState } from "react";

import {
    Alert,
    View,
} from 'react-native';

import auth from '@react-native-firebase/auth';


const SignOut = (nav) => {
    Alert.alert(
        "Sing Out",
        "Are you sure you want to sign out?",
        [
            {
                text: "Ok",
                onPress: () => {
                    nav.navigate("Login")
                    auth().signOut()

                },
                style: "default"
            },
        ],
        { cancelable: true }
    );

}

export {
    SignOut
}
