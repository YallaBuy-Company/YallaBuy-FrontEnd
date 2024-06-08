import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { UserContext } from './UserContext';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
} from '../assets/validation';

const PersonalDetails = () => {
  const { user, updateUserDetails } = useContext(UserContext);
  const [details, setDetails] = useState(user);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setDetails(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });

    let validationError = '';
    switch (name) {
      case 'email':
        validationError = validateEmail(value);
        break;
      case 'fullName':
        validationError = validateName(value);
        break;
      case 'age':
        validationError = validateAge(value);
        break;
      case 'newPassword':
        validationError = validatePassword(value);
        break;
      case 'oldPassword':
        validationError = validatePassword(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: validationError });
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(details.email),
      fullName: validateName(details.fullName),
      age: validateAge(details.age),
      newPassword: details.newPassword ? validatePassword(details.newPassword) : '',
      oldPassword: details.oldPassword ? validatePassword(details.oldPassword) : '',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      setErrorMessage('Please fix the validation errors before submitting.');
      setSuccessMessage('');
      return;
    }

    const requestData = {
      email: details.email,
      fullName: details.fullName,
      age: details.age,
    };

    // Include old password and new password only if they are provided
    if (details.oldPassword && details.newPassword) {
      requestData.oldPassword = details.oldPassword;
      requestData.newPassword = details.newPassword;
    }

    try {
      // Update user details in the context
      updateUserDetails(requestData);

      // Send request to update details on the server
      const response = await axios.put(`http://localhost:3000/users/${details.email}`, requestData);

      if (response.status === 200) {
        setSuccessMessage('Personal details updated successfully!');
        setErrorMessage('');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Validation error: ' + error.response.data.message);
        } else if (error.response.status === 404) {
          setErrorMessage('User not found');
        } else {
          setErrorMessage('Failed to update personal details. Please try again later.');
        }
      } else {
        setErrorMessage('An error occurred while updating personal details.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom color={'black'}>
        Personal Details
      </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        label="Email"
        name="email"
        value={details.email}
        onChange={handleChange}
        fullWidth
        disabled
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
        InputLabelProps={{ shrink: true }} // Add this line
      />
      <TextField
        label="Full Name"
        name="fullName"
        value={details.fullName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.fullName}
        helperText={errors.fullName}
        InputLabelProps={{ shrink: true }} // Add this line
      />
      <TextField
        label="Age"
        name="age"
        value={details.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.age}
        helperText={errors.age}
        InputLabelProps={{ shrink: true }} // Add this line
      />
      <TextField
        label="Old Password"
        name="oldPassword"
        type="password"
        value={details.oldPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.oldPassword}
        helperText={errors.oldPassword}
        InputLabelProps={{ shrink: true }} // Add this line
      />
      <TextField
        label="New Password"
        name="newPassword"
        type="password"
        value={details.newPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.newPassword}
        helperText={errors.newPassword}
        InputLabelProps={{ shrink: true }} // Add this line
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Container>
  );
};

export default PersonalDetails;
