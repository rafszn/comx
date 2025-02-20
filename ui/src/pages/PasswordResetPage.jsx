import { useState } from "react";
import { Link, Outlet, useLocation,  } from "react-router-dom";
import { forgottenPassword } from "../services/authService";
import { toast } from "react-toastify";

const PasswordResetPage = () => {
  const { pathname } = useLocation();
  const [email, setEmail] = useState("");
  const isPasswordResetRoute = pathname === "/welcome/sign-in/password-reset";
  const [loading, setLoading] = useState(false);

  const next = async (e) => {
    e.preventDefault();
    if (email !== "") {
      setLoading(true);
      const result = await forgottenPassword(email);
      setLoading(false);
      if (result.success) {
        toast.success(result.data.message);
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <div className="password-reset">
      <h1>Password Reset</h1>
      <p>Reset your password to continue trading on ComX</p>

      {isPasswordResetRoute && (
        <>
          {" "}
          <form>
            <label className="label">
              Enter the Email Address you registered with
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
          <p>Note that you’ll be sent a Link to the email address provided</p>
          <div className="links">
            <Link to={".."}>BACK</Link>
            <button onClick={next} disabled={loading}>
              {loading ? "LOADING..." : "PROCEED"}
            </button>
          </div>{" "}
        </>
      )}

      <Outlet />
    </div>
  );
};
export default PasswordResetPage;
