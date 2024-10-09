import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              textDecoration: 'none', 
              color: 'primary.main',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            EVENT TICKET
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;