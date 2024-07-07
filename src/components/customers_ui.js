import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Stack } from '@mui/material';

function CustomersUI() {
  const [mode, setMode] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/locker-app-backend/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, contactInfo, otp }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Customer Interface
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => setMode('dropoff')}
          sx={{ mr: 1 }}
        >
          Drop Off
        </Button>
        <Button 
          variant="contained" 
          onClick={() => setMode('pickup')}
        >
          Pick Up
        </Button>
      </Box>
      
      {mode === 'dropoff' && (
        
        <form onSubmit={handleSubmit}>
        <Stack justifyContent={'center'} direction={'row'} alignItems={'center'} gap={2}>
          <TextField
            sx={{ width: '250px' }}
            label="Phone No or Email"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Submit
          </Button>
          </Stack>
        </form>
      )}
      
      {mode === 'pickup' && (
        <form onSubmit={handleSubmit}>
        <Stack justifyContent={'center'} direction={'row'} alignItems={'center'} gap={2}>
          <TextField
            sx={{ width: '250px' }}
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Submit
          </Button>
          </Stack>
        </form>
      )}
      
      {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
    </Box>
  );
}

export default CustomersUI;