const EMAIL_REGEX = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;
const PASSWORD_REGEX = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

export const checkValidData = (email, password) => {
  const isEmailValid = EMAIL_REGEX.test(email);
  const isPasswordValid = PASSWORD_REGEX.test(password);

  if (!isEmailValid) return "Email is not valid.";
  if (!isPasswordValid) return "Password must be at least 6 characters with an uppercase letter, a lowercase letter and a number.";

  return null;
};

export const isEmailValid = (email) => EMAIL_REGEX.test(email || '');