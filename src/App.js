// this will act as a central point for whole react navigation

import React, {useEffect} from "react";
import { Text } from "react-native";
import "react-native-gesture-handler";

import auth from "@react-native-firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {useDispatch, connect } from "react-redux";

import AddPost from "./screens/AddPost.js";
import SignIn from "./screens/SignIn.js";
import SignUp from "./screens/SignUp.js";
import Home from "./screens/Home.js";
import CustomHeader from "./layout/CustomHeader.js";

import { SET_USER, IS_AUTHENTICATED } from "./action/action.types";

import database from "@react-native-firebase/database";
import EmptyContainer from "./components/EmptyContainer";
import { requestPermission } from "./utils/AskPermission";

const Stack = createStackNavigator();

const App = ({authState}) => {

    const dispatch = useDispatch();

    const onAuthStateChanged = (user) => {
        if(user) {
            dispatch({
                type: IS_AUTHENTICATED,
                payload: true
            })

            console.log(user._user.uid);

            database()
                .ref(`/users/${user._user.uid}`)
                .on("value", (snapshot) => {
                    console.log('USER DETAILS', snapshot.val());
                    dispatch({
                        type: SET_USER,
                        payload: snapshot.val(),
                    })
                    
                })
        } else {
            dispatch({
                type:IS_AUTHENTICATED,
                payload: false
            })
        }
    }

    useEffect(() => {
        requestPermission()
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])

    if (authState.loading) {
        return <EmptyContainer/>
    }
    
    return(
        <>
        <NavigationContainer>
            
            <Stack.Navigator screenOptions={{header: (props) => <CustomHeader {...props} />}} >

                {authState.isAuthenticated ? (
                    <>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="AddPost" component={AddPost} />
                    </>
                ) : (
                    <>
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer></>        
    )
}

const mapStateToProps = (state) => ({
    authState : state.auth
})

export default connect(mapStateToProps)(App);