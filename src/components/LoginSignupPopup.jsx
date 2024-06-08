import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateRepeatPassword,
} from '../assets/validation';

const LoginSignupPopup = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rpassword: '',
    age: '',
    fullName: '',
  });
  const { setToken, setEmail } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeTab = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
    setFormData({ email: '', password: '', rpassword: '', age: '', fullName: '' });
    setErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    let validationError = '';
    switch (name) {
      case 'email':
        validationError = validateEmail(value);
        break;
      case 'password':
        validationError = validatePassword(value);
        break;
      case 'rpassword':
        validationError = validateRepeatPassword(formData.password, value);
        break;
      case 'age':
        validationError = validateAge(value);
        break;
      case 'fullName':
        validationError = validateName(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: validationError });
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.rpassword = activeTab === 1 ? validateRepeatPassword(formData.password, formData.rpassword) : '';
    newErrors.age = activeTab === 1 ? validateAge(formData.age) : '';
    newErrors.fullName = activeTab === 1 ? validateName(formData.fullName) : '';

    setErrors(newErrors);

    // Check if there are any errors
    return Object.values(newErrors).every((error) => !error);
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const { email, password } = formData;
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });

      setToken(response.data.token); // Only update the token in the context
      setEmail(email); // Set the email in the context

      setErrors({});
      handleClose();
      navigate('/');
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      setErrors(errorData || { message: 'Error logging in' });
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const { rpassword, ...userData } = formData;
      const response = await axios.post('http://localhost:3000/auth/signup', userData);

      setToken(response.data.token); // Only update the token in the context
      setEmail(userData.email); // Set the email in the context

      setErrors({});
      handleClose();
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      setErrors(errorData || { message: 'Error signing up' });
    }
  };

  const renderLoginForm = () => (
    <>
      <DialogContentText>Please enter your login credentials.</DialogContentText>
      <TextField
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        name="email"
        onChange={handleInputChange}
        value={formData.email}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        name="password"
        onChange={handleInputChange}
        value={formData.password}
        error={!!errors.password}
        helperText={errors.password}
      />
    </>
  );

  const renderSignupForm = () => (
    <>
      <DialogContentText>Please enter your details to create a new account.</DialogContentText>
      <TextField
        margin="dense"
        label="Full Name"
        type="text"
        fullWidth
        name="fullName"
        onChange={handleInputChange}
        value={formData.fullName}
        error={!!errors.fullName}
        helperText={errors.fullName}
      />
      <TextField
        margin="dense"
        label="Age"
        type="number"
        fullWidth
        name="age"
        onChange={handleInputChange}
        value={formData.age}
        error={!!errors.age}
        helperText={errors.age}
      />
      <TextField
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        name="email"
        onChange={handleInputChange}
        value={formData.email}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        name="password"
        onChange={handleInputChange}
        value={formData.password}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        margin="dense"
        label="Repeat Password"
        type="password"
        fullWidth
        name="rpassword"
        onChange={handleInputChange}
        value={formData.rpassword}
        error={!!errors.rpassword}
        helperText={errors.rpassword}
      />
    </>
  );

  return (
    <>
      <Button color="inherit" onClick={handleOpen}>
        {activeTab === 0 ? 'Login' : 'Signup'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{activeTab === 0 ? 'Login' : 'Signup'}</DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={handleChangeTab} centered>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          {activeTab === 0 ? renderLoginForm() : renderSignupForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={activeTab === 0 ? handleLogin : handleSignup} color="primary">
            {activeTab === 0 ? 'Login' : 'Signup'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginSignupPopup;

