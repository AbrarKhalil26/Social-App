import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext(null);

export default function CounterContextProvider({ children }) {
  const [token, setToken] = useState(null);
  // const [updateUserData, setUpdateUserData] = useState(false);
  const { data: userData } = useFetch(["user-data"], "/users/profile-data", {
    select: (data) => data.data.user,
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
}