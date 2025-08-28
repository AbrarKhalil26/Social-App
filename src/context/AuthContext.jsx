import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function CounterContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) getProfileData();
    else setUserData(null);
  }, [token]);

  async function getProfileData() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.message === "success") {
        setUserData(data.user);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
