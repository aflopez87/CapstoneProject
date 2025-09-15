// TODO: Utilities page for users to select their utility of choice


import { useState, useEffect } from "react"
import { AuthContext } from "../../UseContext";
import axios from "axios"


export default function UserUtility() {
  const { token } = useContext(AuthContext);
  const [utilities, setUtilities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/utilities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUtilities(response.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch utilities");
      }
    };

    if (token) fetchUtilities();
  }, [token]);

  return (
    <div>
      <h2>Select a Utility</h2>
      <ul>
        {utilities.map((utility) => (
          <li key={utility.id}>{utility.name}</li>
        ))}
      </ul>
    </div>
  );
}