import React from "react";
import {

} from "react-native";

export default function useLogin() {
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    return {
        phone: phone,
        password: password,
        setPhone: setPhone,
        setPassword: setPassword,
        
    }
}