import {useEffect, useState} from 'react';
import axios from 'axios';


export default function DeviceInput({ selectedDevice, setSelectedDevice, token }) {
    const [deviceOptions, setDeviceOptions] = useState([]);

    useEffect(() => {
        async function fetchDevices() {
            try{
                const res = await axios.get("/api/users/deviecs/all", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDeviceOptions(res.data);
            }catch(err){
                console.error("Error fetching devices:", err);
            }
        }
    if (token) fetchDevices();
    }, [token])
    return  (
    <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
        <option value="">Select a device</option>
        {deviceOptions.map((device) => (
            <option key = {device.id} value={device.name}>
                {device.name} ({device.wattage}W)
            </option>
            ))
        }
    </select>
    )
}