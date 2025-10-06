import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"; 

export const AuthContext = React.createContext()

export const AuthProvider = ({ children })=>{
    const [user, setUser] = useState(null)
    // saves token locally
    const [token, setToken] = useState(() =>{
        const stored = localStorage.getItem("token");
        return stored && stored.split(".").length === 3 ? stored : null;
    })
    const [apiMessage, setApiMessage] = useState("Success!")

    //  Decode token on mount if it exists
    useEffect(() => {
        if (token && token.split(".").length === 3) {
            try{
                const decoded = jwtDecode(token);
                setUser(decoded);
            }catch(err){
                console.error("Invalid token", err);
                localStorage.removeItem("token");
                setToken("");
            }
        }else{
            console.warn("Malformed token", token);
            localStorage.removeItem("token");
            setToken("");
        }
    }, [token]);

    // Post/Create need the URL, the resource to post/create, and the headers to set the content type
    const login = async (user)=>{
        try{
            const response = await axios.post('http://localhost:3000/api/users/login', user,{
                headers:{
                    "Content-Type":"application/json"
                }
            });

            console.log("Received token:", response.data.token)

            setToken(response.data.token)
            // saves token locally
            localStorage.setItem("token", response.data.token)
            // optional chaining used to avoid crashes
        }catch(err){
            alert(err.response?.data?.message || "Login failed")
        }
    };

    const register = async (newUser)=>{
        try{
            const response = await axios.post('http://localhost:3000/api/users/register', newUser,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            setToken(response.data.token)
            console.log(response.data)
            }catch(err){
                // optional chaining used to avoid crashes
                alert(err.response?.data?.message || "Registration failed")
            }
    };

    // Logout clears locally stored token and user state
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    }

    return(
    <AuthContext.Provider value = {{ user, token, setToken, login, register, logout, apiMessage, setUser }}>
        {children}
    </AuthContext.Provider>
    );
};

