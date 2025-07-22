export const messages = {
  auth: {
    loginSuccess: "Login Successful",
    loginFailed : "Failed to login in. Please try again later.",
    fetchUserFailed: "Failed to fetch user data.",
    invalidToken : "Invalid Authentication Token",
    invalidCredentials : "Invalid Credentials",

    signupFailed : "Failed to sign up, Please try again later",
    signupSuccess : "Signup Successfull, Please Log in.",

    resetLinkSuccess : "Reset Link Successfully, Please check your email",
    resetLinkFailed : "Failed to send Reset Link ! Please try again later",

    resetPasswordSuccess : "Password resetted Successfully.",
    resetPasswordFailed : "Failed to reset password ! Please try again later.",
  },
  profile : {
    updateSuccess: "Profile updated successfully",
  },
  error : {
    internalServerError: "Something went wrong! Please try again later.",
  },
  posts : {
    postCreatedSuccess : "Post(s) created successfully",
    postCreationError : "Error in Post(s) creation"
  },
  connections : {
    requestSentSuccess : "Follow Request Sent Successfully",
    requestSentFailed : "Failed to send Follow request",
    postLikedSuccess : "Post Liked Successfully",
    commentAddSuccess : "Comment Added Successfully"
  }
};

export const generateUpdatedSuccessMessage = (entity: string) => {
  return `${entity} updated Successfully`;
};
