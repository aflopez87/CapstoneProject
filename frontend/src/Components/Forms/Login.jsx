import { useContext } from "react";
import { AuthContext } from "../../UseContext.jsx";
import { useNavigate } from "react-router";
import './Forms.css'


export default function Login() {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const signIn = async (formData)=>{
        const user = {
            username:formData.get("username"),
            password:formData.get("password")
        }
        console.log(user);
        await login(user)
        navigate("/home")
    }
    return (
    <>
    <section id = "login">
         <h1>Welcome back!</h1>
    <form action = {signIn}>
        <div className="login">
            <label htmlFor="username">Username</label>
            <input name = "username" type="text"/>
        </div>
        
        <div className="login">
            <label htmlFor="password">Password</label>
            <input name = "password" type="password"/>
        </div>
        
        <input type="submit" value="Submit" className="submit"/>
    </form>
    <p className="linkto">Not registered?<a onClick={()=>navigate("/register")}> Register here.</a></p>
    </section>
    </>
    )
};