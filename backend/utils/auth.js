import bcrypt from "bcrypt";

const saltRounds = 10;
export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Utility to compare passwords
export const comparePasswords = async (storedPassword, inputPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword);
  return isMatch;
};
