import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Paper, Divider } from '@mui/material';
import { CartItem, Event } from '../types';

interface CartProps {
  cartItems: CartItem[];
  events: Event[];
  onRemoveFromCart: (eventId: string, seatId: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, events, onRemoveFromCart, onCheckout }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const event = events.find(e => e.id === item.eventId);
      return total + (event ? event.price * item.seats.length : 0);
    }, 0);
  };

  return (
    <Paper elevation={3} sx={{ mt: 4, p: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item, index) => {
              const event = events.find(e => e.id === item.eventId);
              return (
                <React.Fragment key={item.eventId}>
                  <ListItem alignItems="flex-start" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                    <ListItemText
                      primary={event?.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Seats: {item.seats.join(', ')}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'block' }}>
                            Price: ${event ? event.price * item.seats.length : 0}
                          </Typography>
                        </>
                      }
                    />
                    <Box sx={{ mt: { xs: 1, sm: 0 } }}>
                      {item.seats.map((seatId) => (
                        <Button
                          key={seatId}
                          onClick={() => onRemoveFromCart(item.eventId, seatId)}
                          size="small"
                          color="secondary"
                        >
                          Remove
                        </Button>
                      ))}
                    </Box>
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Typography variant="h6">
              Total: ${getTotalPrice()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={onCheckout}
              sx={{ mt: 2 }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Cart;