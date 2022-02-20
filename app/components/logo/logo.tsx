import * as React from "react"
import {Image, ImageStyle, StyleProp, View, ViewStyle} from "react-native"
import {observer} from "mobx-react-lite"
import {palette} from "../../theme/palette";

const saLogo = require("../../../assets/images/sa_logo.png")

const IMAGE: ImageStyle = {
    width: 200,
    height: 100,
}

const CONTAINER: ViewStyle = {
    backgroundColor: palette.black,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
}

export interface LogoProps {
    /**
     * An optional style override useful for padding & margin.
     */
    imageStyle?: StyleProp<ImageStyle>
    containerStyle?: StyleProp<ViewStyle>

}

/**
 * Describe your component here
 */
export const Logo = observer(function Logo(props: LogoProps) {
    const {imageStyle} = props
    const {containerStyle} = props

    const imageStyles = Object.assign({}, IMAGE, imageStyle)
    const containerStyles = Object.assign({}, CONTAINER, containerStyle)

    return (
        <View style={containerStyles}>
            <Image style={imageStyles} source={saLogo} resizeMode={"contain"}></Image>
        </View>
    )
})
