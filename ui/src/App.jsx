import "./global.scss";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { createRoutes, routes } from "./routes/routes";
import { ToastContainer } from "react-toastify";

export const getSubdomain = () => {
  const host = window.location.hostname;
  console.log(host);
  const parts = host.split(".");
  const subdomain = parts.length === 2 ? parts[0] : null;
  return subdomain;
};

const App = () => {
  const subdomian = getSubdomain();
  console.log(subdomian);
  return (
    <div className="">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<DefaultLayout />}>{createRoutes(routes)}</Route>
      </Routes>
    </div>
  );
};
export default App;
