import { useState } from "react";
import { validateCorporateStepOne } from "../../lib/validations/validate";

const Step1 = ({ onChange, setStep, formData }) => {
  const [errors, setErrors] = useState({});
  const next = (e) => {
    e.preventDefault();
    const newErrors = validateCorporateStepOne(formData);
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <>
      <label>Company Name</label>
      <input
        type="text"
        name="companyName"
        placeholder="Enter your Company Name"
        onChange={onChange}
      />
      {errors.companyName && (
        <p className="text-red-500 error">{errors.companyName}</p>
      )}

      <div className="type-date">
        <div className="type">
          <label>Type of Business</label>
          <select name="businessType" id="businessType" onChange={onChange}>
            <option>select a type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          {errors.businessType && (
            <p className="text-red-500 error">{errors.businessType}</p>
          )}
        </div>

        <div className="date">
          <label>Date of Incorporation</label>
          <input
            type="date"
            name="dateOfIncorporation"
            placeholder="select date"
            onChange={onChange}
          />
          {errors.dateOfIncorporation && (
            <p className="text-red-500 error">{errors.dateOfIncorporation}</p>
          )}
        </div>
      </div>

      <div className="button">
        <button onClick={next} type="submit">
          NEXT STEP
        </button>
      </div>
    </>
  );
};
export default Step1;
