// TODO: Directs to User page to select verified devices
// GET (Verified Devices) retrieves all verified devices and lists them in a list
// GET (User Devices) retrieves all user devices added to the user
// POST post a form per devices when selected to update the usage in hours and freqency in text. Add a submit button.
// (Stretch Goal) Add Custom device form with the following fields: Name, wattage, type, and a submit button

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export default function AllDevices() {
    const [devices, setDevices]=useState([])
    const select = async (formdata)=>{
        const newDevice = {
            name:formdata.get("name"),
            wattage:formdata.get("wattage")
        }
        await select(newDevice)
        navigate("/")
    }
    const navigate = useNavigate()
    useEffect(()=>{
        const getDevices = async ()=>{
            const response= await axios("https://@localhost:3000/meec_db/users/devices")
            console.log(response.data)
            setDevices(response.data)
        }
        getDevices()
    }, [])

    return (
    <>

    <div className="alldevices">
        <ul>
            {devices.map(device=><div className="device"  key={device.id} onClick={()=>navigate(`/user/devices/${devices.id}`)}>
                <li>
                <p>{device.name},{device.wattage}</p>
                
                </li>
            </div>)}
        </ul>
    </div>
    </>
    )
};