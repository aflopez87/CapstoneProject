import HomeImage from "../../images/HomepageImage.svg"
import "./Home.css"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeviceInput from "../SubComponents/DeviceInput.js"
import DeviceList from "../SubComponents/DeviceList.js"
import DeviceUsage from "../SubComponents/DeviceUsage.js"
import UtilityInput from "../SubComponents/UtilityInput.js"

export default function UserHome() {
  const { token } = useContext(AuthContext)

  // set state for each function
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [usageHours, setUsageHours] = useState("");
  const [deviceList, setDeviceList] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState("");

// adds device to list
function addDevice(){
  if (!selectedDevice || !usageHours) return;
  const newDevice = {device: selectedDevice, hours: usageHours}
  setDeviceList([...deviceList, newDevice]);
  }

// removes device from list
function removeDevice(){
  setDeviceList(deviceList.filter(d => d.device != selectedDevice.id));
  }
  
// calculate energy use(placeholder)
function calculateEnergyUse(){
  console.log("Calculating energy use for:", deviceList, selectedUtility)
}


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
                <DeviceInput setSelectedDevice = {setSelectedDevice} token={token} />
                <label htmlFor="DeviceUsage">Usage</label>
                <DeviceUsage setUsageHours={setUsageHours} />
                <button type="button" onClick={addDevice} className="device-list-button">+</button>
                <button type="button" onClick={removeDevice} className="device-list-button">-</button>
              </div>
            <label htmlFor="DeviceList"></label>
              <DeviceList deviceList={deviceList} setDeviceList={setDeviceList} />
            <h2>STEP 2:</h2>
            <p>Select your energy provider from the dropdown.</p>
            <label htmlFor="UtilityInput"></label>
            <UtilityInput selectedUtility={selectedUtility} setSelectedUtility={setSelectedUtility} />
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


