import MEECLogo from "./images/MEEC_Logo.svg"
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
// Admin components
// import AdminHome from "./Components/Admin/Home";
// import AdminDevices from "./Components/Admin/Devices";
// import AdminUtility from "./Components/Admin/Utility";
// User components
import UserHome from "./Components/User/Home";
import UserDevices from "./Components/User/Devices";
import UserUtility from "./Components/User/Utility";
// Forms components
import Login from "./Components/Forms/Login";
import Registration from "./Components/Forms/Register";

export default function App() {
  return (
    <>
      <header>
      <img alt="logo" src={MEECLogo} className="logo"/>
      <nav>
        <Link to ="/home" id="homeLink">Home</Link>
        {/* <Link to ="/users/devices">Devices</Link>
        <Link to ="/users/utilities">Utilities</Link> */}
        <Link to ="/login" id="loginlink">Login</Link>
        <div className = "headerspace"></div>
        <Link to ="/register" id="registerlink">Register </Link>
      </nav>
      </header>
      <main>
        <Routes>
          {/* Admin routes */}
          {/* <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/devices" element={<AdminDevices />} />
          <Route path="/admin/utilities" element ={<AdminUtility />}/> */}
          
          {/* User routes */}
          <Route path="/home" element={<UserHome/>} />
          {/* <Route path="/devices" element={<UserDevices />} />
          <Route path="/utilities" element ={<UserUtility/>}/> */}
          
          {/* Auth routes */}
          <Route path="/login" element ={<Login/>}/>
          <Route path="/register" element ={<Registration/>}/>
        </Routes>
      </main>
    </>
  );
}
