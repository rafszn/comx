import { useState } from "react";
import { validateIndividualStepOne } from "../../lib/validations/validate";

const Step1 = ({ onChange, setStep, formData }) => {
  const [errors, setErrors] = useState({});
  const next = (e) => {
    e.preventDefault();
    const newErrors = validateIndividualStepOne(formData);
    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };
  return (
    <>
      <div className="first-last">
        <div className="first">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter your first name"
            onChange={onChange}
          />
          {errors.firstname && (
            <p className="text-red-500 error">{errors.firstname}</p>
          )}
        </div>

        <div className="last">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter your last name"
            onChange={onChange}
          />
          {errors.lastname && (
            <p className="text-red-500 error">{errors.lastname}</p>
          )}
        </div>
      </div>

      <label>Your email</label>
      <input
        type="text"
        name="email"
        placeholder="Enter your Email"
        onChange={onChange}
      />
      {errors.email && <p className="text-red-500 error">{errors.email}</p>}

      <div className="button">
        <button onClick={next} type="submit">
          NEXT STEP
        </button>
      </div>
    </>
  );
};
export default Step1;
