import "./global.scss";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { createRoutes, routes } from "./routes/routes";
import { ToastContainer } from "react-toastify";

const App = () => {
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
