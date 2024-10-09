import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Divider, Paper, Skeleton } from '@mui/material';
import { Event, CartItem } from '../types';
import { getEvent } from '../api';
import Seatmap from './Seatmap';
import Cart from './Cart';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = React.useState<Event | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const fetchedEvent = await getEvent(id);
          setEvent(fetchedEvent);
        } catch (error) {
          console.error('Failed to fetch event:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEvent();
  }, [id]);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleAddToCart = () => {
    if (event) {
      setCartItems((prev) => [
        ...prev,
        { eventId: event.id, seats: selectedSeats }
      ]);
      setSelectedSeats([]);
    }
  };

  const handleRemoveFromCart = (eventId: string, seatId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.eventId === eventId
          ? { ...item, seats: item.seats.filter((id) => id !== seatId) }
          : item
      ).filter((item) => item.seats.length > 0)
    );
  };

  const handleCheckout = () => {
    console.log('Checkout with:', cartItems);
    alert('Booking successful!');
    setCartItems([]);
    navigate('/');
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}>
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={300} />
      </Container>
    );
  }

  if (!event) {
    return <Typography>Event not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {new Date(event.date).toLocaleString()}
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        {event.description}
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: { xs: 1, sm: 0 } }}>
          Price: ${event.price.toFixed(2)}
        </Typography>
        <Typography variant="h6">
          Available Tickets: {event.availableTickets}
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
        <Seatmap
          seatmap={event.seatmap}
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
        />
        <Box sx={{ mt: 2 }}>
          <Typography>
            Selected Seats: {selectedSeats.join(', ')}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
            Total: ${event.price * selectedSeats.length}
          </Typography>
          <Button 
            onClick={handleAddToCart} 
            disabled={selectedSeats.length === 0}
            variant="contained"
            color="primary"
            fullWidth
          >
            Add to Cart
          </Button>
        </Box>
      </Paper>
      <Cart
        cartItems={cartItems}
        events={[event]}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </Container>
  );
};

export default EventDetails;