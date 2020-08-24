import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

const Header = ({title, navigation}) => {

    return (
        <View style={styles.header}>
            <View></View>
            <Button
                onPress={() => navigation.openDrawer()
                }
                icon={<Icon
                    name="bars"
                    size={20}
                    color="black"
                />}

                type={'clear'}
            />

        </View>
    );
}


const styles = StyleSheet.create({
    linearGradient: {
        flex: 8,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },

    header: {
        alignItems: "flex-start",
        flexDirection: 'column',
        justifyContent: "space-between",
        backgroundColor: "white",
        flex: 2,
    },

})

export {
    Header
}
