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
  businessName: {
    isString: { errorMessage: "business name must be string" },
    notEmpty: { errorMessage: "business name must not be empty" },
  },
  address: {
    isString: { errorMessage: "address must be string" },
    notEmpty: { errorMessage: "address must not be empty" },
  },
};
