module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  let errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty!';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty!';
  } else {
    const regExEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regExEmail)) {
      errors.email = 'Email must be a valid email!';
    }
  }
  if (password.trim() === '') {
    errors.password = 'password must not be empty!';
  }
  if (confirmPassword.trim() === '') {
    errors.confirmPassword = 'confirmPassword must not be empty!';
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Password and confirmPassword must to match!';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

module.exports.validateLoginInput = (username, password) => {
  let errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty!';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty!';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
