import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


// CONTEXT
const AuthContext = createContext()


//PROVIDER
const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: "",
    });

    //INITIAL local storage data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)



            // Safely update state only if loginData exists
            // if (loginData) {
            //     setState({ user: loginData.user || null, token: loginData.token || "" });
            // }

            // use 26 to 28 line  OR  34th line code, need any one only



            setState({ ...state, user: loginData?.user, token: loginData?.token });
        };
        loadLocalStorageData()
    }, []);


    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )

};

export { AuthContext, AuthProvider }