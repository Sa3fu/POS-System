export const createUserValidation = {
  username: {
    isLength: {
      options: { min: 5 },
      errorMessage: "Username should be minimum 5 characters",
    },
    isString: {
      errorMessage: "Username should be string",
    },
    notEmpty: { errorMessage: "Username should not be empty" },
  },
  email: {
    isEmail: { errorMessage: "Enter Valid Email" },
    notEmpty: { errorMessage: "Email should not be empty" },
  },
  password: {
    isString: { errorMessage: "Password must be string" },
    notEmpty: { errorMessage: "Password must not be empty" },
  },
  role: {
    isString: { errorMessage: "role name must be string" },
    notEmpty: { errorMessage: "role name must not be empty" },
  },
};
