import { useState } from "react";
import countryCodes from "../../lib/countryCodes";
import { validateIndividualStepTwo } from "../../lib/validations/validate";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authService";

const Step2 = ({ onChange, setStep, formData }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleDubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateIndividualStepTwo(formData);
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
        placeholder="Confirm password"
        onChange={onChange}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 error">{errors.confirmPassword}</p>
      )}

      <label>Phone Number</label>
      <div className="phoneinput">
        <select name="countryCode" id="countryCode" onChange={onChange}>
          {countryCodes.map(({ code }) => (
            <option key={code} value={code}>
              ({code})
            </option>
          ))}
        </select>

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Enter phone number"
          onChange={onChange}
        />
      </div>
      {errors.phoneNumber && (
        <p className="text-red-500 error">{errors.phoneNumber}</p>
      )}

      <div className="button">
        <button onClick={handleDubmit} type="submit" disabled={loading}>
          {loading ? "SUBMITTING..." : "NEXT STEP"}
        </button>
      </div>
    </>
  );
};
export default Step2;
