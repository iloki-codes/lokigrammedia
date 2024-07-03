import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'


export const signUp = (data) => async (dispatch) => {
    console.log(data);
    const {name, instaUserName, bio, email, password, country, image} = data;

    auth().createUserWithEmailAndPassword(email, password)       // 1st auth method will run
    
    .then((data) => {
        console.log(data);
        console.log("User creation was success");

        database()
            .ref('/users/' + data.user.uid)
            .set({
                name,
                instaUserName,
                country,
                image,
                bio,
                uid: data.user.uid
            })
    })
    .then( () => {
        console.log('Data set success')
        Snackbar.show({
            text: 'account created succesfully',
            textColor: 'white',
            backgroundColor: 'blue'
        })
    })
    .catch((error) => {
        console.log(error);
        Snackbar.show({
            text:"Signup Failed",
            textColor: 'white',
            backgroundColor: 'red'
        })
    })
}

export const signIn = (data) => async (dispatch) => {
    console.log(data);
    const {email, password} = data
    
    auth()
        .signInWithEmailAndPassword(email, password)
            .then( () => {
                console.log('Signin Success');
                Snackbar.show({
                    text: "Account signedin",
                    textColor: 'white',
                    backgroundColor: "blue"
                })
                
            })
            .catch((error) => {
                console.log(error);
                Snackbar.show({
                    text: "Signin Failed",
                    textColor: "white",
                    backgroundColor: "red"
                })
                
            })
    
}

export const signOut = () => async (dispatch) => {
    auth()
    .signOut()
    .then( () => {
        Snackbar.show({
            text: "Signout success",
            textColor: "white",
            backgroundColor: "ed"
        })
    })
    .catch((error) => {
        console.log(error);
        Snackbar.show({
            text: "SignOut Failed",
            textColor: "white",
            backgroundColor: "red"
        })
        
    })
}