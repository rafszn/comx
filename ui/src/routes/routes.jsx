import { Route } from "react-router-dom";
import CorporateRegistration from "../components/corporateRegistration/CorporateRegistration";
import IndividualRegistration from "../components/individualRegistration/IndividualRegistration";
import ResetPassword from "../components/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import RegistrationLayout from "../layouts/RegistrationLayout";
import SigninLayout from "../layouts/SigninLayout";
import PasswordResetPage from "../pages/PasswordResetPage";
import SigninPage from "../pages/SigninPage";
import ProtectedRoute from "../contexts/auth/ProtectedRoute";
import PublicRoute from "../contexts/auth/PublicRoute";

export const routes = [
  {
    path: "register",
    element: RegistrationLayout,
    public: true,
    children: [
      {
        path: "corporate",
        element: CorporateRegistration,
      },
      {
        path: "individual",
        element: IndividualRegistration,
      },
    ],
  },
  {
    path: "welcome",
    element: SigninLayout,
    public: true,
    children: [
      {
        path: "sign-in",
        element: SigninPage,
        children: [
          {
            path: "password-reset",
            element: PasswordResetPage,
            children: [
              {
                path: "pass",
                element: ResetPassword,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: DashboardLayout,
    protected: true,
  },
];

export const createRoutes = (routesArray) =>
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
