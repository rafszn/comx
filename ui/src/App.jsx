import "./global.scss";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { routes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./contexts/auth/ProtectedRoute";
import PublicRoute from "./contexts/auth/PublicRoute";

const createRoutes = (routesArray) =>
  routesArray.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        route.protected ? (
          <ProtectedRoute element={route.element} />
        ) : route.public ? (
          <PublicRoute element={route.element} />
        ) : (
          <route.element />
        )
      }
    >
      {route.children && createRoutes(route.children)}
    </Route>
  ));

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
