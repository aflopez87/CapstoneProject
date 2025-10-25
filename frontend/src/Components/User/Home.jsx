import HomeImage from "../../images/HomepageImage.svg"
import "./Home.css"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeviceInput from "./Subcomponents/DeviceInput.jsx"
import DeviceList from "./Subcomponents/DeviceList.jsx"
import DeviceUsage from "./Subcomponents/DeviceUsage.jsx"
import UtilityInput from "./Subcomponents/UtilityInput.jsx"

export default function UserHome() {
  const { token, user } = useContext(AuthContext)
  // useEffect(() => {
  //   console.log("Device list updated:", deviceList);
  // }, [deviceList]);

  // set state for each function
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [usageHours, setUsageHours] = useState("");
  const [deviceList, setDeviceList] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState("");
  const [costBreakdown, setCostBreakdown] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

// adds device to list
function addDevice(){
  if (!selectedDevice || !usageHours) return;
  
  // Convert usageHours to a number
  const hours = parseFloat(usageHours);

  // Randomize rateType based on usage:
  // - Higher useage hours increase chance of "peak"
  // - Lower usage hours increase chance of "offpeak"
  // - Example: 18 hours/day is approximately 75% chance of "peak"
  const rateType = Math.random() < (hours / 24) ? "peak" : "offPeak"
  
  const newDevice = {
    device: selectedDevice, 
    hours,
    rateType
  };

  // Add device to list
  setDeviceList([...deviceList, newDevice]);
  }

// removes device from list
function removeDevice(index){
  setDeviceList([...deviceList.slice(0, index), ...deviceList.slice(index + 1)]);
  }
  
// calculate energy use(placeholder)
function calculateEnergyUse(){
  // Formula used
  // costPerYear = device.kw * hours * 365 * rate
  if (!selectedUtility || deviceList.length === 0) return;

  const rateMap = {
    peak: selectedUtility.peakRate,
    offPeak: selectedUtility.offPeakRate
  }

  let totalCost = 0;
  let breakdown = [];

  for (const { device, hours, rateType } of deviceList) {
    const rate = rateMap[rateType];
    const cost = device.kw * hours * 365 * rate;
    totalCost += cost;
    breakdown.push({ name: device.name, cost, rateType })
  }

  setTotalCost(totalCost);
  setCostBreakdown(breakdown);
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
            <h1>Welcome {user?.name}!</h1>
            <h1>How it works:</h1>
            
            <h2>STEP 1:</h2>
            <p>Add the device and usage amount in the dropdown below then click the plus sign to add your device to the device list or the minus button to remove a selected device.</p>
              <div className="deviceinput">
                <div>
                  <label htmlFor="DeviceInput">Device</label><br/>
                  <DeviceInput setSelectedDevice = {setSelectedDevice} token={token} />
                </div>
                <div>
                  <label htmlFor="DeviceUsage">Usage</label><br/>
                  <DeviceUsage setUsageHours={setUsageHours} />
                </div>
                <button type="button" onClick={addDevice} className="device-list-button">+</button>
              </div>
            <label htmlFor="DeviceList">Your Devices</label>
              <DeviceList deviceList={deviceList} setDeviceList={setDeviceList} removeDevice={removeDevice} />
            
            <h2>STEP 2:</h2>
            <div>
              <p>Select your energy provider from the dropdown.</p>
              <label htmlFor="UtilityInput">Energy Provider - Service Area - Peak rate and Off-Peak rate</label><br/>
              <UtilityInput selectedUtility={selectedUtility} setSelectedUtility={setSelectedUtility} />
            </div>
            
            <h2>STEP 3:</h2>
            <div>
              <p>Click Calculate to see your total energy use in the pie chart.</p>
              <button type="button" onClick={calculateEnergyUse} className="calculate">Calculate</button>
            </div>
          </section>
          
          <section className="output-side">
            
            {/* Pie Chart */}
            <h3 className="pie-title">Energy Used</h3>
            <div className="pie" style={{
              background: `conic-gradient(
              ${costBreakdown.map((d, i) => {
                const start = costBreakdown.slice(0, i).reduce((sum, b) => sum + b.cost, 0);
                const end = start + d.cost;
                const startDeg = (start / totalCost) * 360;
                const endDeg = (end / totalCost) * 360;
                const color = ["lightblue", "grey", "blue", "orange", "green"][i % 5];
                return `${color} ${startDeg}deg ${endDeg}deg`;
              }).join(",")}
            )`
            }}></div>
            
            <h3>Cost Per Year:</h3>
            <h3 className="result">${totalCost.toFixed(2)}</h3>
            
            {/* Breakdown List */}
            <ul>
              {costBreakdown.map((d, i) => (
                <li key={i}>
                  {d.name} ({d.rateType}): ${d.cost.toFixed(2)}
                </li>
              ))}
            </ul>

          </section>
        </main>
        )}
    </>
  );
}


