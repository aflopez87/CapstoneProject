
//------------------Import/Function------------------
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import { AuthContext } from "../../UseContext";
import "./Devices.css"
export default function AllDevices() {
    const { token } = useContext(AuthContext);
    const [devices, setDevices]=useState([]);
    const [formDataMap, setFormDataMap] = useState({});
    const navigate = useNavigate()

    // useEffect(() => {
    //     const fetchDevices = async ()=>{
    //         try {
    //         const response= await axios.get("https://@localhost:3000/meec_db/users/devices", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         setDevices(response.data);
    //     }catch (err) {
    //         console.error("Failed to fetch devices:", err);
    //     }
    // };
    //     if (token) fetchDevices();
    // }, [token]);

    // //-----------Form-----------------
    // const handleInputChange = (deviceId, field, value) =>{
    //     setFormDataMap(prev => ({
    //         ...prev,
    //         [deviceId]: {
    //             ...prev[deviceId],
    //             [field]: value,
    //         }
    //     }));
    // };
    // const handleSubmit = async (deviceId) => {
    //     const usageData = formDataMap[deviceId];
    //     try{
    //         await axios.post(`http://localhost:3000/meec_db/devices/${deviceId}/usage`,usageData,{
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         alert("Usage Submitted!");
    //     } catch (err) {
    //         console.error("Failed to submit usage:", err);
    //     }
    // };
    

    return (
    <>
<main className="devicepage">
    <div className="userdevices">
        <h2>Your Devices</h2>
        <ul>
            <li >
                <p>Air Conditioner, 900 Watts</p>
            </li>
         
           
            <li >
                <p>Light Bulb, 50 Watts</p>
            </li>
            <li >
                <p>Refrigerator, 500 Watts</p>
            </li>       
               
            
        </ul>
    </div> 
    <div>
        <form action="submit}">
            <label>Usage hrs:
                <input type="number" />
            </label>
            <label>Frequency:
                <input type="text" />
            </label>
        </form>
    </div>
    <div className="alldevices">
        <h2> Verified Devices</h2>
        <ul>
            <li >
                <p>Air Conditioner, 900 Watts</p>
            </li>
            <li >
                <p>Clothing Iron, 1100 Watts</p>
            </li>
            <li >
                <p>Vacuum Cleaner, 1000 Watts</p>
            </li>
            <li >
                <p>Light Bulb, 50 Watts</p>
            </li>
            <li >
                <p>Refrigerator, 500 Watts</p>
            </li>       
               
            
        </ul>
    </div> 
</main>
    </>       
    )};