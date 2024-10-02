import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';


import LinearGradient from 'react-native-linear-gradient';

const Register = ({ navigation }) => {
    // States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Change initial state to false

    // Function
    const handleSubmit = async () => {

        try {
            setLoading(true);
            if (!name || !email || !password) {
                Alert.alert("Please fill all fields");
                setLoading(false);
                return;
            }


            if (!email.endsWith('@gmail.com')) {
                Alert.alert('Please use a Gmail address ending with @gmail.com');
                return;
              }
    
              if (!/^[A-Za-z\s]+$/.test(name)) {
                Alert.alert('Name should not contain numbers or unnecessary spaces');
                return;
              }
    
    
             if (!/[A-Za-z]{3,}/.test(name)){ // Check for at least 3 consecutive letters
                Alert.alert('Name must contain more than three consecutive characters. ');
                return;
              }



            const { data } = await axios.post("https://future-gold-server.onrender.com/api/v1/auth/register", { name, email, password });

            Alert.alert("Registration Successful", data.message); // Show success alert
            // Reset the fields
            setName('');
            setEmail('');
            setPassword('');

            // Navigate to login screen
            navigation.navigate("Login");

        } catch (error) {
            Alert.alert("Registration Failed", error.response?.data?.message || "An error occurred");
            setLoading(false);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <LinearGradient
        colors={['#734820', '#9B7049', '#C59975']} // Gradient colors without extra spaces
        style={styles.gradient}>
 

        <View style={styles.container}>
            <Text style={styles.pageTitle}>Register</Text>

            <View style={{ marginHorizontal: 10 }}>
                <InputBox
                    inputTitle={'Name'}
                    value={name}
                    setValue={setName}
                />
                <InputBox
                    inputTitle={'Email'}
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox
                    inputTitle={'Password'}
                    secureTextEntry={true}
                    autoComplete="password"
                    value={password}
                    setValue={setPassword}
                />
            </View>

            <SubmitButton
                btnTitle="Register"
                loading={loading}
                handleSubmit={handleSubmit}
            />

            <Text style={styles.linkText}>
                Already registered? Please <Text style={styles.link} onPress={() => navigation.navigate("Login")}>LOGIN</Text>
            </Text>
        </View>

        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        
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
    linkText: {
        textAlign: "center",
        color: "black",
    },
    link: {
        color: "blue",
    }
});

export default Register;
