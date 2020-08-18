import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


import {View, Text, StyleSheet} from 'react-native';


//
// const HomeTabBarIcon = (props) => {
//     console.log("u,,,dcfqwefvw")
// }



export default class HomeTabBarIcon extends React.Component{


    constructor(props) {
        super(props);

    }

    render(): React.ReactNode {
        return(
            <Icon
                name="map-pin"
                size={17}
                color="black"
            />
        )
    }


}

// export default {HomeTabBarIcon}
