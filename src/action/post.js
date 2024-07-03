import database from '@react-native-firebase/database'
import {SET_POST, ERROR_POST} from './action.types.js'

export const getPosts = () => async (dispatch) => {
    try {
        database()
        .ref('/posts/')
        .on('value', (snapshot) => {         // if any value changes youll get that, it keeps listening
            console.log('USER Data: ', snapshot.val());             // big object
            if (snapshot.val()) {
                dispatch({
                    type: SET_POST,
                    payload: Object.values(snapshot.val())
                })
            } else{
                dispatch({
                    type: SET_POST,
                    payload: []
                })
            }
        })                          
    } catch (error) {
        dispatch({
            type: ERROR_POST
        })
    }

}