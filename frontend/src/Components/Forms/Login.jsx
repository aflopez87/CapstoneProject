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
        <label>Username:
            <input name = "username"/>
        </label>
        <label>Password:
            <input name = "password" type="password"/>
        </label>
        <input type="submit" value="Submit" className="submit"/>
    </form>
    <button onClick={()=>navigate("/register")}>Create a new Account</button>
    </section>
    </>
    )
};