import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Step4 = ({ formData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/welcome");
    }, 2000);
    return () => clearTimeout();
  }, [navigate]);
  return (
    <div className="step4">
      <div className="img-wrapper absolute top-0 left-0 bg-white w-full h-[30vh] flex items-center justify-center">
        <img src="/Clipped.svg" alt="clipped" style={{ scale: "1.2" }} />
      </div>

      <div className="h-[10vh]" />

      <h1>Registration Complete</h1>
      <p>Dear {formData.firstname}. Your registration is now complete.</p>
      <p>You may proceed to your dashboard and start trading commodities.</p>
      <Link to={"/welcome"} className="button">
        <button>Go to Sign in</button>
      </Link>
    </div>
  );
};
export default Step4;
