import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class DownloadTabBarIcon extends React.Component{


    constructor(props) {
        super(props);

    }

    render(): React.ReactNode {
        return(
            <Icon
                name="download"
                size={16}
                color="black"
            />
        )
    }


}

