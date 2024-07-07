import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const STATUS = ["Recieved", "Processing", "Ready", "picked up"];
function AdminUI() {
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch('http://localhost/locker-app-backend/api.php?action=getOrders');
    const data = await response.json();
    setOrders(data);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await fetch('http://localhost/locker-app-backend/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateStatus', orderId, newStatus }),
    });
    fetchOrders();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Admin Interface
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id} divider>
            <ListItemText 
              primary={`Order ${order.id}`} 
              secondary={`Contact: ${order.contact}`}
            />
            <Chip label={STATUS[order.status]} color="primary" sx={{ mr: 1 }} />
            {order.status != 3 ? (
            <>
              {order.status != 1?
              <Button
                variant="outlined"
                onClick={() => updateOrderStatus(order.id, 1)}
                sx={{ mr: 1 }}
              >
                Processing
              </Button>
              : null}
              {order.status != 2? 
              <Button
                variant="outlined"
                onClick={() => updateOrderStatus(order.id, 2)}
              >
                Ready
              </Button>
              : null}
            </>
          ) : null}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AdminUI;