import HomeImage from "../../images/HomepageImage.svg"
import "./Home.css"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


export default function UserHome() {
  
  return (
    <>
    <main className="homepage" id="loggedin">
      <div className="hometext">
        <h1>Curious about your appliance's energy usage?</h1>
        <p><strong>My Electrical Energy Calculator</strong> estimates your appliance's energy use and cost based on your usage and utility rates, including peak and off-peak pricing.</p>
      </div>
      <img alt="image" src={HomeImage}/>
    </main>
    </>
  );
}


