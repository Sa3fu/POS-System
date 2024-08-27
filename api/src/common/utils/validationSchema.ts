// Validation to create user
export const createUserValidation = {
  username: {
    isLength: {
      options: { min: 5 },
      errorMessage: 'Username should be minimum 5 characters',
    },
    isString: {
      errorMessage: 'Username should be string',
    },
    notEmpty: { errorMessage: 'Username should not be empty' },
  },
  email: {
    isEmail: { errorMessage: 'Enter Valid Email' },
    notEmpty: { errorMessage: 'Email should not be empty' },
  },
  password: {
    isString: { errorMessage: 'Password must be string' },
    notEmpty: { errorMessage: 'Password must not be empty' },
  },
  role: {
    isString: { errorMessage: 'role name must be string' },
    notEmpty: { errorMessage: 'role name must not be empty' },
  },
}

// Validation to create category
export const createCategoryValidation = {
  name: {
    notEmpty: { errorMessage: 'Category name should not be empty' },
    isString: { errorMessage: 'Category name should be a string' },
  },
}

//Validation to create product
export const createProductValidation = {
  brand: {
    isString: { errorMessage: 'Brand should be string' },
    notEmpty: { errorMessage: 'Brand should not be empty' },
  },
  model: {
    isString: { errorMessage: 'Model should be string' },
    notEmpty: { errorMessage: 'Model should not be empty' },
  },
  price: {
    isString: { errorMessage: 'price should be number' },
    notEmpty: { errorMessage: 'Price should not be empty' },
  },
  sku: {
    isString: { errorMessage: 'sku should be string' },
    notEmpty: { errorMessage: 'sku should not be empty' },
  },
  barcode: {
    isString: { errorMessage: 'Barcode should be string' },
    notEmpty: { errorMessage: 'Barcode should not be empty' },
  },
  categoryId: {
    isNumeric: { errorMessage: 'Category id should be Number' },
    notEmpty: { errorMessage: 'Category id should not be empty' },
  },
}
