import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom'; // Import for redirection

function LoginSignupPopup() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState({}); // State for errors
  const [formData, setFormData] = useState({ // State for form data
    email: '',
    password: '',
    rpassword:'',
    age:''
  });
  const navigate = useNavigate(); // Hook for redirection

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeTab = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
    // Clear form data when switching tabs (optional)
    setFormData({ email: '', password: '' });
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const { email, password } = formData;
      const response = await axios.post('/auth/login', { email, password });

      // Store token in local storage
      localStorage.setItem('authToken', response.data.token);

      // Clear errors and redirect
      setErrors({});
      handleClose();
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error(error);
      // Set error messages based on response
      const errorData = error.response?.data;
      setErrors(errorData || { message: 'Error logging in' });
    }
  };

  const handleSignup = async () => {
    try {
      const userData = formData; // Assuming all signup data is in formData
      const response = await axios.post('/auth/signup', userData);

      // Store token in local storage
      localStorage.setItem('authToken', response.data.token);

      // Clear errors and display success message (optional)
      setErrors({});
      handleClose();
      // Show success message or redirect (optional)
    } catch (error) {
      console.error(error);
      // Set error messages based on response
      const errorData = error.response?.data;
      setErrors(errorData || { message: 'Error signing up' });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>
          {activeTab === 0 ? 'Login' : 'Signup'}
        </DialogTitle>

        <DialogContent>

          <Tabs value={activeTab} onChange={handleChangeTab}>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>

          {activeTab === 0 && (
            <DialogContentText>
              Please enter your login credentials.
            </DialogContentText>
          )}

          {activeTab === 1 && (
            <DialogContentText>
              Please enter your details to create a new account.
            </DialogContentText>,

            <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            name="fullName" // Add name attribute for signup data
            onChange={handleInputChange}
            value={formData.fullName} // Set value from formData
            />,

            <TextField 
            autoFocus
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            name="age" // Add name attribute for signup data
            onChange={handleInputChange}
            value={formData.age} // Set value from formData
            />
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type={activeTab === 0 ? "text" : "email"}
            fullWidth
            name="email" // Add name attribute for signup data
            onChange={handleInputChange}
            value={formData.email} // Set value from formData
          />

            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              name="password" // Add name attribute for signup data
              onChange={handleInputChange}
              value={formData.password} // Set value from formData
            />

          {activeTab === 1 && (
            <TextField
            margin="dense"
            label="Repeat password"
            type="password"
            fullWidth
            name="rpassword" // Add name attribute for signup data
            onChange={handleInputChange}
            value={formData.rpassword} // Set value from formData
          />
          )}
        </DialogContent>

        {errors.message && (
        <DialogContentText color="error">
          {errors.message}
        </DialogContentText>
      )}
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {activeTab === 0 && (
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        )}
        {activeTab === 1 && (
          <Button variant="contained" onClick={handleSignup}>
            Signup
          </Button>
        )}
      </DialogActions>

      </Dialog>
    </>
  );
}

export default LoginSignupPopup;
