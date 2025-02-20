import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const reset = searchParams.get("reset");
  const navigate = useNavigate();
  console.log(reset);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password === "" || !reset) {
      console.log("none");
      return;
    }

    setLoading(true);
    const result = await resetPassword({ newPassword: password, reset });
    setLoading(false);
    if (result.success) {
      toast.success("password change success");
      navigate(`/welcome/sign-in`);
      setTimeout(() => {
        navigate(`/welcome/sign-in`);
      }, 1000);
    } else {
      toast.error(result.error);
      setTimeout(() => {
        navigate(`/welcome/sign-in`);
      }, 3000);
    }
  }
  return (
    <>
      {" "}
      <form>
        <label className="label">Enter your new password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <div className="links">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "LOADING" : "PROCEED"}
        </button>
      </div>{" "}
    </>
  );
};
export default ResetPassword;
