import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React from 'react'
import InputBox from '../../components/Forms/InputBox'

import { useState,useContext } from 'react'
import { AuthContext } from '../../context/authContext'

import SubmitButton from '../../components/Forms/SubmitButton'

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios'

import LinearGradient from 'react-native-linear-gradient'


const Login = ({navigation}) => {

//Global State
const [state,setState] = useContext(AuthContext)

 //States
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [loading, setloading] = useState(true);

 //function
 //btn function

 const handleSubmit = async () => {
     try {
         setloading(true)
         if (!email || !password) {
             Alert.alert("please fill all feilds");
             setloading(false);
             return;
         }
         setloading(false);

         const {data} = await axios.post("https://future-gold-server.onrender.com/api/v1/auth/login",{email,password}); //in this line include ipv4 address for connecting mobile,
        setState(data)
         await AsyncStorage.setItem("@auth", JSON.stringify(data) );
         alert(data && data.message);

// Navigate to MainPage and then to Profile with user's name
navigation.navigate("MainPage");


navigation.navigate('MainPage', { userName: data.name }); // Use data.name to pass the user's name


         console.log("Login Data ==>", { email, password });

     } catch (error) {
        alert(error.response.data.message);
         setloading(false)
         console.log(error)

     }
 }

//temp function to check local storage data
const getLocalStorageData = async() =>{
    let data = await AsyncStorage.getItem('@auth')
    console.log('LOcal Storage ==> ',data);  
};
getLocalStorageData();


 return (


    <LinearGradient
    colors={['#734820', '#9B7049', '#C59975']} // Gradient colors without extra spaces
    style={styles.gradient}>



     <View style={styles.container}>
         <Text style={styles.pageTitle}>Login</Text>
         <View style={{ marginHorizontal: 10 }}>

             <InputBox inputTitle={'Email'}
                 keyboardType="email-address"
                 autoComplete="email"
                 value={email}
                 setValue={setEmail}
             />
             <InputBox inputTitle={'Password'}
                 secureTextEntry={true}
                 autoComplete="password"
                 value={password}
                 setValue={setPassword} />
         </View>
         {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
         <SubmitButton
             btnTitle="Login"
             loading={loading}
             handleSubmit={handleSubmit} />

         <Text style={styles.linkText}>Not a User Please <Text style={styles.link} onPress={()=> navigation.navigate("Register")}>REGISTER</Text>{" "}</Text>

     </View>

     </LinearGradient>


 );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // backgroundColor: "#f4a475"
        
    },

    gradient:{
        flex:1,
    },


    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
        marginBottom: 20,

    },

    inputBox: {
        height: 40,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,

    },

    linkText: {
        textAlign:"center",
        color: "black",


    },

    link:{
        color:"blue",
    }


})



export default Login;