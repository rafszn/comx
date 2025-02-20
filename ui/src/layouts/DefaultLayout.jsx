import { Outlet, useLocation } from "react-router-dom";
import DefaultHeader from "../components/DefaultHeader";

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/";
  return (
    <div className="default">
      {!isRoot && <DefaultHeader />}
      <Outlet />
    </div>
  );
};
export default DefaultLayout;
