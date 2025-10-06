import MEECLogo from "./images/MEEC_Logo.svg"
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./UseContext";
import { useContext } from "react";

// User components
import UserHome from "./Components/User/Home";
import UserDevices from "./Components/User/Devices";
import UserUtility from "./Components/User/Utility";
// Forms components
import Login from "./Components/Forms/Login";
import Registration from "./Components/Forms/Register";

// Stretch Goal - Admin components
// import AdminHome from "./Components/Admin/Home";
// import AdminDevices from "./Components/Admin/Devices";
// import AdminUtility from "./Components/Admin/Utility";

export default function App() {
  // Logs user out by deleting webtoken
  const { token, setToken} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log("Logout clicked")
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };
  

  return (
    <>
      <header>
      <img alt="logo" src={MEECLogo} className="logo"/>
      <nav>
        <Link to ="/home" id="homeLink">Home</Link>
        {!token ? (
          <Link to ="/login" id="loginlink">Login</Link>
        ):( 
          <button onClick={handleLogout} className="logout-link">Logout</button>
        )}
        <div className = "headerspace"></div>
        <Link to ="/register" id="registerlink">Register </Link>
      </nav>
      </header>
      <main>
        <Routes>         
          {/* User routes */}
          <Route path="/" element={<UserHome/>} />
          <Route path="/home" element={<UserHome/>} />
          
          {/* Auth routes */}
          <Route path="/login" element ={<Login/>}/>
          <Route path="/register" element ={<Registration/>}/>

          {/* Stretch Goal - Admin routes */}
          {/* <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/devices" element={<AdminDevices />} />
          <Route path="/admin/utilities" element ={<AdminUtility />}/> */}
        </Routes>
      </main>
    </>
  );
}
