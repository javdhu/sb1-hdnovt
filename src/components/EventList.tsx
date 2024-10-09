import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Event } from '../types';

interface EventListProps {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const EventList: React.FC<EventListProps> = ({ events, loading, error }) => {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: { xs: 3, sm: 6 } }}>
        Upcoming Events
      </Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {event.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {event.description.substring(0, 100)}...
                </Typography>
              </CardContent>
              <Button 
                component={Link} 
                to={`/event/${event.id}`} 
                variant="outlined" 
                sx={{ m: 2 }}
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventList;