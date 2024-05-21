import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const PersonalDetails = ({ personalDetails }) => {
  const [details, setDetails] = useState(personalDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleUpdate = () => {
    // Implement update logic here
    console.log('Updated personal details:', details);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Personal Details
      </Typography>
      <TextField
        label="Email"
        name="email"
        value={details.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Full Name"
        name="fullName"
        value={details.fullName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        name="age"
        value={details.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Old Password"
        name="oldPassword"
        type="password"
        value={details.oldPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New Password"
        name="newPassword"
        type="password"
        value={details.newPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Container>
  );
};

export default PersonalDetails;
