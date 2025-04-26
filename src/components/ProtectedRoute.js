import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  return children;
}
