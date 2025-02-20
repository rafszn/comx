import { Outlet, useLocation } from "react-router-dom";
import DefaultHeader from "../components/DefaultHeader";
import { useAuth } from "../contexts/auth/AuthProvider";

const DefaultLayout = () => {
  const { loading } = useAuth();
  const { pathname } = useLocation();
  const isRoot = pathname === "/";

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="default">
      {!isRoot && <DefaultHeader />}
      <Outlet />
    </div>
  );
};
export default DefaultLayout;
