import React from "react";
import { StyleSheet, Container, Spinner } from "react-native";
// import {  } from "native-base";

const EmptyContainer = () => {
    return(
        <Container>
            <Spinner></Spinner>
        </Container>
    )
}

export default EmptyContainer

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        backgroundColor: "violet",
        justifyContent: "center",
        alignItems: "center"
    }
})