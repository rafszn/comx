import { Link, Outlet, useLocation } from "react-router-dom";
import Container from "../components/Container";

const SigninLayout = () => {
  const { pathname } = useLocation();
  const isWelcomeRoute = pathname === "/welcome";
  const isSigninRoute = pathname === "/welcome/sign-in";

  return (
    <Container>
      <div className="signin-layout">
        {(isWelcomeRoute || isSigninRoute) && (
          <h1 className="title">Sign in to ComX</h1>
        )}

        {isWelcomeRoute && (
          <div className="signin">
            <p>welcome to ComX</p>
            <div className="btn">
              <Link to={"sign-in"} className="signinlink">
                Sign in
              </Link>
            </div>
          </div>
        )}

        {isWelcomeRoute && (
          <div className="createaccount">
            <h1>Create an Account</h1>
            <p>Join the Family</p>
            <div className="btn">
              <Link to={"/register/individual"} className="signinlink">
                Register
              </Link>
            </div>
          </div>
        )}

        <Outlet />
      </div>
    </Container>
  );
};
export default SigninLayout;
