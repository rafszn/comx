import { useState } from "react";
import { validateCorporateStepTwo } from "../../lib/validations/validate";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";

const Step2 = ({ onChange, setStep, formData }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateCorporateStepTwo(formData);
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }

    // Register user
    setLoading(true);
    const result = await registerUser(formData);
    setLoading(false);
    if (result.success) {
      toast.success("Account created");
      setStep(3);
    } else {
      toast.error(result.error);
    }
  };
  return (
    <>
      <label>Company Email</label>
      <input
        type="text"
        name="companyEmail"
        placeholder="Enter your Company Email"
        onChange={onChange}
      />
      {errors.companyEmail && (
        <p className="text-red-500 error">{errors.companyEmail}</p>
      )}

      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={onChange}
      />
      {errors.password && (
        <p className="text-red-500 error">{errors.password}</p>
      )}

      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        onChange={onChange}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 error">{errors.confirmPassword}</p>
      )}

      <div className="button">
        <button onClick={handleSubmit} type="submit" disabled={loading}>
          {loading ? "SUBMITTING..." : "NEXT STEP"}
        </button>
      </div>
    </>
  );
};
export default Step2;
