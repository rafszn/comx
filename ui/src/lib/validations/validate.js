import emailRegex from "../regex/emailRegex";

export const validateCorporateStepOne = (formData) => {
  let newErrors = {};
  if (!formData.companyName) newErrors.companyName = "Company Name is required";
  if (!formData.businessType || formData.businessType === "select a type")
    newErrors.businessType = "Select a valid business type";
  if (!formData.dateOfIncorporation)
    newErrors.dateOfIncorporation = "Date of Incorporation is required";

  return newErrors;
};

export const validateCorporateStepTwo = (formData) => {
  let newErrors = {};
  if (!formData.companyEmail) {
    newErrors.companyEmail = "Company Email is required";
  } else if (!emailRegex.test(formData.companyEmail)) {
    newErrors.companyEmail = "Email address is incorrect.";
  }
  if (!formData.password) newErrors.password = "Password is Required";
  if (formData.password.length <= 7)
    newErrors.password = "Password must be at least 8 characters long";
  if (!formData.confirmPassword)
    newErrors.confirmPassword = "Confirm password is Required";
  if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match";

  return newErrors;
};

export const validateIndividualStepOne = (formData) => {
  let newErrors = {};
  if (!formData.firstname) newErrors.firstname = "This field is required";
  if (!formData.lastname) newErrors.lastname = "This field is Required";
  if (!formData.email) {
    newErrors.email = "Email is Required";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Email address is incorrect.";
  }
  return newErrors;
};

export const validateIndividualStepTwo = (formData) => {
  let newErrors = {};

  if (!formData.password) newErrors.password = "Password is Required";
  if (formData.password.length <= 7)
    newErrors.password = "Password must be at least 8 characters long";
  if (!formData.confirmPassword)
    newErrors.confirmPassword = "Confirm password is Required";
  if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match";
  if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is Required";
  if (/[A-Za-z]/.test(formData.phoneNumber))
    newErrors.phoneNumber = "Invalid phone number";

  return newErrors;
};
