// App.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomerUI from './components/customers_ui';
import AdminUI from './components/admin_ui';


function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Locker System Simulation
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="interface tabs">
              <Tab label="Customer" />
              <Tab label="Admin" />
            </Tabs>
          </Box>
          {tabValue === 0 ? <CustomerUI /> : <AdminUI />}
        </Box>
  );
}

export default App;