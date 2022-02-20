import React, {FC} from "react"
import {View,   Image,  ViewStyle, ImageStyle, TextStyle} from "react-native"
import {StackScreenProps} from "@react-navigation/stack"
import {observer} from "mobx-react-lite"
import {
    Logo,

    Text,
} from "../../components"

import {NavigatorParamList} from "../../navigators"
import {Button} from "react-native-elements";
import {palette} from "../../theme/palette";

const CONTAINER: ViewStyle = {
    flex: 1,
    backgroundColor: palette.black
}


const CENTER_CONTENT_CONTAINER: ViewStyle = {
    backgroundColor: palette.black,
    flex: 1
}


const BOTTOM_CONTENT: ViewStyle = {
    backgroundColor: palette.red,
    flex: 1
}


const MAIN_TEXT: TextStyle = {
    height: 153,
    color: palette.white,
    fontSize: 34,
    fontWeight: "bold",
    lineHeight: 50,
    textAlign: "left"
}

const MAIN_TEXT_CONTAINER: ViewStyle = {
    marginTop: 17,
    marginLeft: 31,
    marginRight: 31
}

const CREATE_ACC_BTN_STYLE: ViewStyle = {
    backgroundColor: palette.black,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
}

const CREATE_ACC_BTN_CONTAINER_STYLE: ViewStyle = {
    width: 200,
    marginHorizontal: 100,
    marginVertical: 100,
}

const CREATE_ACC_BTN_TEXT_STYLE: TextStyle = {
    fontWeight: '700'
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
    ({navigation}) => {
        const navigateToAccCreation = () => navigation.navigate("signUp")
        return (
            <View style={CONTAINER}>
                <Logo></Logo>
                <View style={CENTER_CONTENT_CONTAINER}>
                    <View style={MAIN_TEXT_CONTAINER}>
                        <Text style={MAIN_TEXT}>
                            Join the largest decentralized social trading network
                        </Text>
                    </View>
                </View>
                <View style={BOTTOM_CONTENT}>
                    <Button
                        onPress={navigateToAccCreation}
                        title="Create Account"
                        titleStyle={CREATE_ACC_BTN_TEXT_STYLE}
                        buttonStyle={CREATE_ACC_BTN_STYLE}
                        containerStyle={CREATE_ACC_BTN_CONTAINER_STYLE}
                    />
                </View>
            </View>
        )
    },
)
