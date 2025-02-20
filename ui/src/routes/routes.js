import CorporateRegistration from "../components/corporateRegistration/CorporateRegistration";
import IndividualRegistration from "../components/individualRegistration/IndividualRegistration";
import ResetPassword from "../components/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import RegistrationLayout from "../layouts/RegistrationLayout";
import SigninLayout from "../layouts/SigninLayout";
import PasswordResetPage from "../pages/PasswordResetPage";
import SigninPage from "../pages/SigninPage";

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
    protected: true
  },
];
