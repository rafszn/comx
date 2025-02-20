import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PublicRoute = ({ element: Component }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? <Navigate to="/" replace /> : <Component />;
};

export default PublicRoute;
