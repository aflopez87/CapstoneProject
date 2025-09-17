// TODO: User homepage that list the user's devices, displays their utility and rates, takes their bill and calculates spending per device
// GET all user devices and add device button that takes user to devices page
// GET User Utility with Peak/Off-Peak Rates
// Show consumption calculation based on userdevices, device wattage, device usage, and utility rates

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserHome() {
  const { user, token } = useContext(AuthContext);
  const [userDevices, setUserDevices] = useState([]);
  const [utility, setUtility] = useState(null);

  const navigate = useNavigate();

  // GET all user devices
  useEffect(() => {
    async function fetchUserDevices() {
      try {
        const res = await axios.get(`/api/user_devices/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserDevices(res.data);
      } catch (err) {
        console.error("Error fetching user devices:", err);
      }
    }

    async function fetchUserUtility() {
      try {
        const res = await axios.get(`/api/utilities/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUtility(res.data);
      } catch (err) {
        console.error("Error fetching utility:", err);
      }
    }

    if (user?.id) {
      fetchUserDevices();
      fetchUserUtility();
    }
  }, [user, token]);

  // Calculate consumption and spending per device
  const calculateSpending = () => {
    // Return if no utility or bill are selected/
    if (!utility || !monthlyBill || isNaN(monthlyBill)) return;

    const totalConsumption = userDevices.reduce((sum, device) => {
      const hours = device.usage_hours || 0;
      const wattage = device.wattage || 0;
      return sum + (wattage * hours);
    }, 0); 

    const spending = userDevices.map((device) => {
      const hours = device.usage_hours || 0;
      const wattage = device.wattage || 0;
      const deviceConsumption = wattage * hours;
      const share = deviceConsumption / totalConsumption;
      const estimatedCost = share * parseFloat(monthlyBill);

      return {
        name: device.custom_device || device.name,
        cost: estimatedCost
      };
    });

    setSpendingData(spending);
  };

  const pieChartData = {
    labels: spendingData.map((d) => d.name),
    datasets: [
      {
        data: spendingData.map((d) => d.cost.toFixed(2)),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
        ]
      }
    ]
  };

  return (
    <div className="user-home">
      <h2>Welcome, {user?.name}</h2>

      {/* GET all user devices and add device button */}
      <section>
        <h3>Your Devices</h3>
        <ul>
          {userDevices.map((device) => (
            <li key={device.id}>
              {device.name}: {device.wattage}W {device.usage_hours}hrs 
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/devices")}>Add Device</button>
      </section>

      {/* GET User Utility with Peak/Off-Peak Rates */}
      <section>
        <h3>Your Utility Rates</h3>
        {utility ? (
          <p>
            Peak Rate: ${utility.peak_rate} / kWh<br />
            Off-Peak Rate: ${utility.off_peak_rate} / kWh
          </p>
        ) : (
          <p>Loading utility info...</p>
        )}
      </section>

      {/* Monthly bill input and spending calculation */}
      <section>
        <h3>Monthly Bill</h3>
        <input
          type="number"
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(e.target.value)}
          placeholder="Enter your bill in USD"
        />
        <button onClick={calculateSpending}>Calculate Spending</button>
      </section>

      {/* Pie chart visualization */}
      {spendingData.length > 0 && (
        <section>
          <h3>Spending Breakdown</h3>
          <Pie data={pieChartData} />
        </section>
      )}
    </div>
  );
}


