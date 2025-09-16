
//------------------Import/Function------------------
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import { AuthContext } from "../../UseContext";

export default function AllDevices() {
    const { token } = useContext(AuthContext);
    const [devices, setDevices]=useState([]);
    const [formDataMap, setFormDataMap] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDevices = async ()=>{
            try {
            const response= await axios.get("https://@localhost:3000/meec_db/users/devices", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDevices(response.data);
        }catch (err) {
            console.error("Failed to fetch devices:", err);
        }
    };
        if (token) fetchDevices();
    }, [token]);

    //-----------Form-----------------
    const handleInputChange = (deviceId, field, value) =>{
        setFormDataMap(prev => ({
            ...prev,
            [deviceId]: {
                ...prev[deviceId],
                [field]: value,
            }
        }));
    };
    const handleSubmit = async (deviceId) => {
        const usageData = formDataMap[deviceId];
        try{
            await axios.post(`http://localhost:3000/meec_db/devices/${deviceId}/usage`,usageData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Usage Submitted!");
        } catch (err) {
            console.error("Failed to submit usage:", err);
        }
    };
    

    return (
    <>

    <div className="alldevices">
        <h2>Your Devices</h2>
        <ul>
            {devices.map(device=>(
                <div className="device"  key={device.id}>
                    <li onClick={()=> navigate(`/user/devices/${device.id}`)}>
                        <p>{device.name}, {device.wattage}</p>
                    </li>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(device.id); }}>
                        <input 
                            type = "number"
                            placeholder="Usage in hours"
                            value={formDataMap[device.id]?.hours || ""}
                            onChange={(e) => handleInputChange(device.id, "frequency", e.target.value)}
                            />
                        <button type="submit">Submit Usage</button>
                    </form>
                </div>
            ))}
        </ul>
    </div> 
    </>       
    )};