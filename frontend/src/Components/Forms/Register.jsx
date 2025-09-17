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
        <div className="register">
            <label htmlFor="name">Name:</label>
            <input name = "name" type = "text"/>
        </div>
        
        <div className="register">
            <label htmlFor="location">Location:</label>
            <input name = "location"/>
        </div>
       
        <div className="register">
            <label htmlFor="username">Username:</label>
            <input name = "username"/>
        </div>
        
        <div className="register">
            <label>Password:</label>
            <input name = "password" type="password"/>
        </div>
        
        <input type="submit" value="Submit" className="submit"/>
    </form>
     <button onClick={()=>navigate("/login")}>Already have an account? Login!</button>
    </section>
    </>
    )
};