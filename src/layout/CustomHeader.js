import React from "react";
import { StyleSheet } from "react-native";
import {
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text
} from "react-native";

import { connect } from "react-redux";
import propTypes from "prop-types";         // 100% surability that props are available to me
import { signOut } from "../action/auth";
import auth from "../reducer/auth";

const CustomHeader = ({signOut, authState, navigation}) => {
    return(
     <>
        <Header>
            androidStatusBarColor="#0f4c75"
            style={{backgroundColor: "#0f4c75"}}
        </Header>
        <Body>
            <Title>Lokigram Media</Title>
        </Body>
        <Right>
            {
                authState.isAuthenticated && (
                    <>
                    <Button transparent iconLeft onPress={() => navigation.navigate("AddPost")}>
                        <Text Style={{color: "#fdcb9e"}}>Add Post</Text>
                    </Button>
                    <Button transparent onPress={() => signOut()}>
                        <Icon name="log-out-outline" style={{color:"red"}} />
                    </Button>
                    </>
                )
            }
        </Right>
     </>
    )
}

const mapStateToProps = (state) => ({
    authState: state.auth
})

const mapDispatchToProps = (state) => ({
    signOut
})

CustomHeader.propTypes = {
    signOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);