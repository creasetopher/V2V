import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class PlaylistTabBarIcon extends React.Component{


    constructor(props) {
        super(props);

    }

    render(): React.ReactNode {
        return(
            <Icon
                name="play"
                size={16}
                color="black"
            />
        )
    }


}

