// TODO: User homepage that list the user's devices, displays their utility and rates, takes their bill and calculates spending per device
// GET all user devices and add device button that takes user to devices page
// GET User Utility with Peak/Off-Peak Rates
// Show consumption calculation based on userdevices, device wattage, device usage, and utility rates

import { useState, useEffect } from "react";
import { AuthContext } from "../UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// export default function UserHome {
//     const { user, setUser, token } = useContext(AuthContext);
//     const { userDevices, setUserDevices } = useState{[]};
//     const navigate = useNavigate();
//     })
//     return(
//         <>
//         </>
//     )
// };

