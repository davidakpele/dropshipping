export const validateSignup = (userDetails) => {
  let errorMessages = {};
  if (
    userDetails.first_name &&
    !/^[a-zA-Z][a-zA-Z0-9]+$/.test(userDetails.first_name)
  ) {
    errorMessages.first_name =
      "First name must start with a letter and with no special character";
  }

  if (
    userDetails.last_name &&
    !/^[a-zA-Z][a-zA-Z0-9]+$/.test(userDetails.last_name)
  ) {
    errorMessages.last_name =
      "Last name must start with a letter and with no special character";
  }

  if (
    (userDetails.phone_number && userDetails.phone_number.length < 11) ||
    userDetails.phone_number.length > 11
  ) {
    errorMessages.phone_number =
      "Phone number length should be 11 characters: for example - 80...";
  }

  if (!userDetails.gender) {
    errorMessages.gender = "Gender is required";
  }

  if (userDetails.email && !/\S+@\S+\.\S+/.test(userDetails.email)) {
    errorMessages.email = "Email address is invalid";
  }

  if (userDetails.password && userDetails.password.length < 8) {
    errorMessages.password = "Password needs to be 8 characters or more";
  }

  if (
    userDetails.password_confirmation &&
    userDetails.password_confirmation !== userDetails.password
  ) {
    errorMessages.password_confirmation = "Passwords do not match";
  }

  return errorMessages;
};

export const validateLogin = (userDetails) => {
  let errorMessages = {};

  if (userDetails.email && !/\S+@\S+\.\S+/.test(userDetails.email)) {
    errorMessages.email = "Email address is invalid";
  }

  if (userDetails.password && userDetails.password.length < 8) {
    errorMessages.password = "Password needs to be 8 characters or more";
  }

  return errorMessages;
};

export const validateReset = (userDetails) => {
  let errorMessages = {};
  if (userDetails.password && userDetails.password.length < 8) {
    errorMessages.password = "Password needs to be 8 characters or more";
  }

  if (
    userDetails.password_confirmation &&
    userDetails.password_confirmation !== userDetails.password
  ) {
    errorMessages.password_confirmation = "Passwords do not match";
  }

  if (
    (userDetails.password_reset_token &&
      userDetails.password_reset_token.length < 6) ||
    userDetails.password_reset_token.length > 6
  ) {
    errorMessages.password_reset_token = "OTP needs to be 6 characters";
  }

  return errorMessages;
};

export const validateAddress = (address) => {
  let errorMessages = {};

  if (
    address.first_name &&
    !/^[a-zA-Z][a-zA-Z0-9]+$/.test(address.first_name)
  ) {
    errorMessages.first_name =
      "First name must start with a letter and with no special character";
  }

  if (address.last_name && !/^[a-zA-Z][a-zA-Z0-9]+$/.test(address.last_name)) {
    errorMessages.last_name =
      "Last name must start with a letter and with no special character";
  }

  if (
    (address.phone_number && address.phone_number.length < 10) ||
    (address.phone_number && address.phone_number.length > 10)
  ) {
    errorMessages.phone_number =
      "Remove the first '0' of your phone number: for example - 80...";
  }

  if (address.address && !/[a-zA-Z][a-zA-Z0-9]/.test(address.address)) {
    errorMessages.address = "Address should include text or number";
  } else if (address.address && address.address.length > 45) {
    errorMessages.address = "Address maximum length is 45 characters";
  }

  if (address.city && !/^[a-zA-Z][a-zA-Z]/.test(address.city)) {
    errorMessages.city = "City can only be text";
  }

  return errorMessages;
};
