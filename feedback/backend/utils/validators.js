// Validators placeholder module
module.exports = {
  validateEmail: (email) => typeof email === 'string' && email.includes('@'),
  validateRequired: (val) => val !== undefined && val !== null && val !== ''
};
