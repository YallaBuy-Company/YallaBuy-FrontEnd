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

function LoginSignupPopup() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rpassword: '',
    age: '',
    fullName: ''
  });
  const { setUserMode } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeTab = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
    setFormData({ email: '', password: '', rpassword: '', age: '', fullName: '' });
    setErrors({});
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const { email, password } = formData;
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });

      localStorage.setItem('authToken', response.data.token);

      const userDetails = await axios.get('http://localhost:3000/users/details', {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
          'Content-Type': 'application/json'
        },
        params: { email: email }
      });

      setUserMode('user', userDetails.data);

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
    try {
      const { rpassword, ...userData } = formData;
      const response = await axios.post('http://localhost:3000/auth/signup', userData);

      localStorage.setItem('authToken', response.data.token);

      const userDetails = await axios.get('http://localhost:3000/user/details', {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
          'Content-Type': 'application/json'
        },
        params: { email: userData.email }
      });

      setUserMode('user', userDetails.data);

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
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        name="password"
        onChange={handleInputChange}
        value={formData.password}
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
      />
      <TextField
        margin="dense"
        label="Age"
        type="number"
        fullWidth
        name="age"
        onChange={handleInputChange}
        value={formData.age}
      />
      <TextField
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        name="email"
        onChange={handleInputChange}
        value={formData.email}
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        name="password"
        onChange={handleInputChange}
        value={formData.password}
      />
      <TextField
        margin="dense"
        label="Repeat Password"
        type="password"
        fullWidth
        name="rpassword"
        onChange={handleInputChange}
        value={formData.rpassword}
      />
    </>
  );

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{activeTab === 0 ? 'Login' : 'Signup'}</DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={handleChangeTab}>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          {activeTab === 0 ? renderLoginForm() : renderSignupForm()}
        </DialogContent>
        {errors.message && (
          <DialogContentText color="error">
            {errors.message}
          </DialogContentText>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {activeTab === 0 ? (
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          ) : (
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
