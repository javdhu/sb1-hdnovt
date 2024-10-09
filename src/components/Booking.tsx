import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { createBooking } from '../api';

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);

  const handleBooking = async () => {
    if (id) {
      try {
        await createBooking({
          eventId: id,
          userId: 'user123',
          seats: [],
        });
        alert('Booking successful!');
        navigate('/');
      } catch (error) {
        console.error('Booking failed:', error);
        alert('Booking failed. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Book Tickets
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Number of Tickets"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          InputProps={{ inputProps: { min: 1 } }}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleBooking}
        >
          Confirm Booking
        </Button>
      </Box>
    </Container>
  );
};

export default Booking;