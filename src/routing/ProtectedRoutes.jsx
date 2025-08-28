import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
