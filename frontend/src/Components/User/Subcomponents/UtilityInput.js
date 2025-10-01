import { useEffect, useState } from "react";
import axios from "axios";

export default function UtilityInput({ selectedUtility, setSelectedUtility}){
    const [utilities, setUtilities] = useState([]);

    useEffect(()=> {
        async function fetchUtilities(){
            try{
                const res = await axios.get("/api/users/utilities/public");
                setUtilities(res.data);
            }catch(err){
                console.error("failed to fetch utilities:", err)
            };
        }

        fetchUtilities()
    }, []);
    return(
        <select value={selectedUtility} onChange={(e) => setSelectedUtility(e.target.value)}>
            <option value="">Select utility</option>
            {utilities.map((utility) => (
                <option key={utility.id} value={utility.name}>
                    <span>{utility.name}</span> <span>{utility.location}</span>
                </option>
            ))}
        </select>
    );
}