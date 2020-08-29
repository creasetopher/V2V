import React, { useState } from "react";



import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import {SignOut} from './SignOut';


function NavDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Sign Out"
                onPress={() => SignOut(props.navigation)}
            />
        </DrawerContentScrollView>
    );
}

export {
    NavDrawer
}
