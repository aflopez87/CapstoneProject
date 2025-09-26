import HomeImage from "../../images/HomepageImage.svg"
import "./Home.css"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


export default function UserHome() {
  const { token } = useContext(AuthContext)
  return (
    <>
      {!token ? (  
        // Logged out view
        <main className="loggedout">
          <div className="hometext">
            <h1>Curious about your appliance's energy usage?</h1>
            <p><strong>My Electrical Energy Calculator</strong> estimates your appliance's energy use and cost based on your usage and utility rates, including peak and off-peak pricing.</p>
          </div>
          <img alt="image" src={HomeImage}/>
        </main>
        ) : ( 
        // Logged in view  
        <main className="loggedin">
          <section className="input-side">
            <h1>How it works:</h1>
            <h2>STEP 1:</h2>
            <p>Add the device and usage amount in the dropdown below then click the plus sign to add your device to the device list or the minus button to remove a selected device.</p>
              <div className="deviceinput">
                <label htmlFor="DeviceInput"></label>
                <DeviceInput></DeviceInput>
                <label htmlFor="DeviceUsage">Usage</label>
                <DeviceUsage></DeviceUsage>
                <button type="button" onClick={addDevice} className="device-list-button">+</button>
                <button type="button" onClick={removeDevice} className="device-list-button">-</button>
              </div>
            <label htmlFor="DeviceList"></label>
              <DeviceList></DeviceList>
            <h2>STEP 2:</h2>
            <p>Select your energy provider from the dropdown.</p>
            <label htmlFor="UtilityInput"></label>
            <UtilityInput></UtilityInput>
            <h2>STEP 3:</h2>
            <p>Click Calculate to see your totel energy use in the pie chart.</p>
            <button type="button" onClick={calculateEnergyUse}>Calculate</button>
          </section>
          <section className="output-side">
            <div class="pie"></div>
          </section>
        </main>
        )}
    </>
  );
}


