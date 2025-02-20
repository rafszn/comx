import { useState } from "react";
import {
  resendVerificationCode,
  verifyConfirmationCode,
} from "../../services/authService";
import { toast } from "react-toastify";

const Step3 = ({ formData, setStep }) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code === "") {
      return;
    }
    setLoading(true);
    const result = await verifyConfirmationCode({ ...formData, code });
    setLoading(false);
    if (result.success) {
      toast.success("Account created");
      setStep(4);
    } else {
      toast.error(result.error);
      setLoading(false)
    }
  };

  const resend = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await resendVerificationCode({
      email: formData.email,
      userType: formData.userType,
    });
    setLoading(false);
    if (result.success) {
      toast.success("code sent");
    } else {
      toast.error(result.error);
    }
  };
  return (
    <>
      <label>Enter the 6-digit code that was sent to {formData.email}</label>
      <input
        type="text"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter Code"
        style={{ marginTop: "1rem" }}
      />

      <button className="text-gray-400" onClick={resend} disabled={loading}>
        {loading ? "Sending..." : "Resend Code"}
      </button>
      <p className="text-gray-400">Verify via Phone Call</p>

      <div className="button">
        <button>BACK</button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "LOADING..." : "FINISH"}
        </button>
      </div>
    </>
  );
};
export default Step3;
