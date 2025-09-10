import { useContext } from "react";
import { AuthContext } from "../UseContext";
import { useNavigate } from "react-router";

export default function Login() {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const signIn = async (formData)=>{
        const user = {
            email:formData.get("email"),
            password:formData.get("password")
        }
        await login(user)
        navigate("/")
    }
    return (
    <>
    <section>
         <h1>Login Form</h1>
    <form action = {signIn}>
        <label>Email:
            <input name = "email"/>
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