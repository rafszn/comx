import axiosInstance from "./axios/axiosInstance";

export async function registerUser(formData) {
  // formData
  try {
    const response = await axiosInstance.post("/auth.register", formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response.data.message || "something went wrong",
    };
  }
}

export async function verifyConfirmationCode(formData) {
  // userType, companyEmail/email, code
  try {
    const response = await axiosInstance.post("/auth.verify", formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response.data.message || "something went wrong",
    };
  }
}

export async function forgottenPassword(email) {
  // email
  try {
    const response = await axiosInstance.post("/auth.forgotten-pass", {
      email,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response.data.message || "something went wrong",
    };
  }
}

export async function resetPassword(data) {
  // newPassword, reset
  const { newPassword, reset } = data;
  try {
    const response = await axiosInstance.post(
      `/auth.reset-pass?reset=${reset}`,
      { newPassword },
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response.data.message || "something went wrong",
    };
  }
}

export async function signInUser(formData) {
  // email, password, staySignedIn
  try {
    const response = await axiosInstance.post("/auth.signin", formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response.data.message || "something went wrong",
    };
  }
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    return {
      success: false,
      error: "User not authenticated",
    };
  }
  try {
    const response = await axiosInstance.get("/auth.me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data.user };
  } catch (error) {
    return {
      success: false,
      error: error.response.data.message || "something went wrong",
    };
  }
}

export async function resendVerificationCode({ email, userType }) {
  // usertype, email
  try {
    const response = await axiosInstance.post("/auth.resend", {
      email,
      userType,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response.data.message || "something went wrong",
    };
  }
}
