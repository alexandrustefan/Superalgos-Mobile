import React, {FC} from "react"
import {observer} from "mobx-react-lite"
import {TextStyle, View, ViewStyle} from "react-native"
import {StackScreenProps} from "@react-navigation/stack"
import {NavigatorParamList} from "../../navigators"
import {Header, Logo, Screen, Text} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import {color, spacing} from "../../theme"
import {palette} from "../../theme/palette";
import {Button, Input} from "react-native-elements";

const ROOT: ViewStyle = {
    backgroundColor: color.palette.black,
    flex: 1,
}

const HEADER_ROW: ViewStyle = {
    flexDirection: "row"
}

const HEADER_CONTENT: ViewStyle = {
    flex: 1
}

const FORM_CONTAINER: ViewStyle = {
    flex: 6,
}

const FORM: ViewStyle = {
    marginTop: spacing[8]
}

const TITLE: TextStyle = {
    fontWeight: "bold",
    fontSize: 28,
    lineHeight: 38,
    textAlign: "left",
    marginLeft: spacing[3],
    marginBottom: spacing[5],
}

const LOGO: ViewStyle = {
    backgroundColor: palette.black,
    flex: 0,
    justifyContent: "flex-start",
    alignItems: "center",
}

const CREATE_ACC_BTN_STYLE: ViewStyle = {
    backgroundColor: palette.red,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
}

const CREATE_ACC_BTN_CONTAINER_STYLE: ViewStyle = {
    width: 200,
    marginHorizontal: 100,
    marginVertical: 10,
}

const CREATE_ACC_BTN_TEXT_STYLE: TextStyle = {
    fontWeight: '700'
}

export const SignUpScreen: FC<StackScreenProps<NavigatorParamList, "signUp">> = observer(
    ({navigation}) => {
        // Pull in one of our MST stores
        // const { someStore, anotherStore } = useStores()

        const [username, onChangeTextUsername] = React.useState("");
        const [githubToken, onChangeTextToken] = React.useState("");

        const goBack = () => navigation.goBack()

        return (
            <Screen style={ROOT} preset="scroll">
                <View style={HEADER_CONTENT}>
                    <View style={HEADER_ROW}>
                        <Header
                            leftIcon="back"
                            onLeftPress={goBack}
                        />
                        <Logo containerStyle={LOGO}></Logo>
                    </View>
                </View>
                <View style={FORM_CONTAINER}>
                    <Text style={TITLE} preset="header" text={"Create your account"}/>
                    <View style={FORM}>
                        <Input value={username}
                               onChangeText={onChangeTextUsername}
                               placeholder={"Github Username"}></Input>
                        <Input autoCompleteType placeholder={"Github Token"}
                               onChangeText={onChangeTextToken}
                               value={githubToken}></Input>
                        <Button
                            onPress={() => {
                                console.log(username)
                            }}
                            title="Create Account"
                            titleStyle={CREATE_ACC_BTN_TEXT_STYLE}
                            buttonStyle={CREATE_ACC_BTN_STYLE}
                            containerStyle={CREATE_ACC_BTN_CONTAINER_STYLE}
                        />
                    </View>
                </View>

            </Screen>
        )
    })
