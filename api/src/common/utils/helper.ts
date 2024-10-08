import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
