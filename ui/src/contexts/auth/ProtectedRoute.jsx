import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ element: Component }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? <Component /> : <Navigate to="/welcome/sign-in" replace />;
};

export default ProtectedRoute;
