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
      <h1 className="heading">MEEC</h1>
      <nav>
        <Link to ="/home">Welcome</Link>
        <Link to ="/users/devices">Select Your Devices</Link>
        <Link to ="/users/utilities">View Utilities</Link>
        <Link to ="/login">Login</Link>
        <Link to ="/register">Create a new Account</Link>
      </nav>
      <main>
        <Routes>
          {/* Admin routes */}
          {/* <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/devices" element={<AdminDevices />} />
          <Route path="/admin/utilities" element ={<AdminUtility />}/> */}
          {/* User routes */}
          <Route path="/users/home" element={<UserHome />} />
          <Route path="/users/devices" element={<UserDevices />} />
          <Route path="/users/utilities" element ={<UserUtility/>}/>
          {/* Auth routes */}
          <Route path="/login" element ={<Login/>}/>
          <Route path="/register" element ={<Registration/>}/>
        </Routes>
      </main>
    </>
  );
}
