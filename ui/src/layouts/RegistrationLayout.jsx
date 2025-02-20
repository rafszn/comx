import { Link, Outlet, useLocation } from "react-router-dom";
import Container from "../components/Container";

const RegistrationLayout = () => {
  const { pathname } = useLocation();
  const isCorporate = pathname.includes("corporate");
  const isIndividual = pathname.includes("individual");

  const corporateStyles = isCorporate
    ? { backgroundColor: "black", color: "white" }
    : {};

  const individualStyles = isIndividual
    ? { backgroundColor: "black", color: "white" }
    : {};

  return (
    <Container>
      <div className="registration-layout">
        <h1 className="text-center text-4xl font-[400]">
          Register a new account
        </h1>
        <p className="text-center text-[1rem] font-[400]">
          Sign up for an account and start trading today
        </p>

        <p className="text-center">or</p>

        <Link className="text-center underline text-purple-700" to={"/welcome"}>Sign in</Link>

        <div className="categories">
          <h1>Select the category that best describes you</h1>

          <div className="links">
            <Link to={"individual"} style={individualStyles}>
              Individual
            </Link>
            <Link to={"corporate"} style={corporateStyles}>
              Corporate
            </Link>
          </div>
        </div>

        <Outlet />
      </div>

      <div className="chat">
        <img src="/chat.svg" alt="chat" />
      </div>
    </Container>
  );
};
export default RegistrationLayout;
