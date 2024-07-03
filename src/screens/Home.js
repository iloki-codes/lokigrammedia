import React, {useEffect, useState} from "react";
import { StyleSheet, SafeAreaView, FlatList, Container, H1 } from "react-native";
// import {Container, H1} from 'native-base';

// redux

import {connect} from 'react-redux';
import {getPosts} from "../action/post";
import propTypes from 'prop-types';

import EmptyContainer from "../components/EmptyContainer.js";
import Post from "../components/Post.js";
import post from "../reducer/post.js";

import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Home = ({getPosts, postState, userDetails}) => {

    useEffect(() => {
        getPosts()
    }, [])

    if (postState.loading) {

    }

    return(
        
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={postState.posts}
                keyExtractor={(item) => item.id}
                renderItem={({item, index, separators}) => (
                    <Post item={item} userDetails={userDetails} key={item.id} />  
                )}
                ListEmptyComponent={() => (
                    <Container style={styles.emptyContainer}>
                        <H1>No Post Found</H1>
                    </Container>
                )}>
            </FlatList>
        </SafeAreaView>
    
    )
}

const mapStateToProps = (state) => {
    postState: state.post;
    userDetails: state.auth.user;
}

const mapDispatchToProps = {
    getPosts
}

Home.propTypes = {
    getPosts: propTypes.func.isRequired,
    postState: propTypes.object.isRequired,
    userDetails: propTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      justifyContent: 'flex-start',
      padding: 4,
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      backgroundColor: '#1b262c',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });