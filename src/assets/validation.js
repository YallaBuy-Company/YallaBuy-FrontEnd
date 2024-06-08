export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };
  
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password) {
      return 'Password is required';
    }
    if (!passwordRegex.test(password)) {
      return 'Password must be 8 characters A-Z,a-z,1-9';
    }
    return '';
  };
  
  export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name) {
      return 'Full name is required';
    }
    if (!nameRegex.test(name)) {
      return 'Full name can only contain letters and spaces';
    }
    return '';
  };
  
  export const validateAge = (age) => {
    if (!age) {
      return 'Age is required';
    }
    if (isNaN(age) || age < 1 || age > 100) {
      return 'Age must be a number between 1 and 100';
    }
    return '';
  };
  
  export const validateRepeatPassword = (password, repeatPassword) => {
    if (!repeatPassword) {
      return 'Please repeat the password';
    }
    if (password !== repeatPassword) {
      return 'Passwords do not match';
    }
    return '';
  };
  