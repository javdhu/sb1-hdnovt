import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import Booking from './components/Booking';
import { Event } from './types';
import { getEvents } from './api';

const App: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
          <Routes>
            <Route path="/" element={<EventList events={events} loading={loading} error={error} />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;