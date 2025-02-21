import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { signInUser } from "../services/authService";
import { toast } from "react-toastify";

const SigninPage = () => {
  const { pathname } = useLocation();
  const isSignin = pathname === "/welcome/sign-in";
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checked: false,
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChecked = (event) => {
    setFormData({ ...formData, checked: event.target.checked });
  };

  const signin = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.password) newErrors.password = "Password is Required";
    if (!formData.email) newErrors.email = "Email is Required";

    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const result = await signInUser({
      ...formData,
      staySignedIn: formData.checked,
    });
    setLoading(false);
    if (result.success) {
      localStorage.setItem("token", result.data.token);
      toast.success("sign in success");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      toast.error(result.error);
    }
  };
  return (
    <>
      {isSignin && (
        <div className="signin-page">
          <p>Enter your login credentials below.</p>

          <form>
            <label>Your Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-red-500 error">{errors.email}</p>
            )}

            <label htmlFor="">Your Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="*******"
              onChange={onChange}
            />
            {errors.password && (
              <p className="text-red-500 error">{errors.password}</p>
            )}

            <div className="signedforgotten">
              <div className="checkbox">
                <input
                  type="checkbox"
                  checked={formData.checked}
                  onChange={handleChecked}
                />
                <h1>Stay Signed in</h1>
              </div>

              <Link to={"password-reset"}>Forgotten Password?</Link>
            </div>

            <div className="btn">
              <button onClick={signin} disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="link">
            <Link to={".."}>Back</Link>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};
export default SigninPage;
