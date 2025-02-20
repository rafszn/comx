import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import ProgressBar from "../ProgressBar";

const IndividualRegistration = () => {
  const [step, setStep] = useState(1);
  const initialValues = {
    userType: "Individual",
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    countryCode: "+234",
  };

  const [formData, setFormData] = useState(initialValues);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="individual-registration">
      <form>
        {step === 1 && (
          <Step1 setStep={setStep} onChange={onChange} formData={formData} />
        )}
        {step === 2 && (
          <Step2 setStep={setStep} onChange={onChange} formData={formData} />
        )}
        {step === 3 && <Step3 setStep={setStep} formData={formData} />}

        {step === 4 && <Step4 setStep={setStep} formData={formData} />}
      </form>
      <ProgressBar step={step} />
    </div>
  );
};
export default IndividualRegistration;
