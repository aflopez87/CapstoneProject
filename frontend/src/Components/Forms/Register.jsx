import { useContext } from "react";
import { AuthContext } from "../../UseContext.jsx";
import { useNavigate } from "react-router";

export default function Registration() {
    const {register} = useContext(AuthContext)
    const navigate = useNavigate();
    const signIn = async (formData)=>{
        const newUser = {
            name: formData.get("name"),
            location:formData.get("location"),
            username:formData.get("username"),
            password:formData.get("password")
        }
        await register(newUser)
    };
    return (
    <>
    <section id = "register"> 
    <h1>New User Registration</h1>
    <form action = {signIn}>
        <label>Name:
            <input name = "name"/>
        </label>
        <label>Location:
            <input name = "location"/>
        </label>
        <label>Username:
            <input name = "username"/>
        </label>
        <label>Password:
            <input name = "password" type="password"/>
        </label>
        <input type="submit" value="Submit" className="submit"/>
    </form>
     <button onClick={()=>navigate("/login")}>Already have an account? Login!</button>
    </section>
    </>
    )
};