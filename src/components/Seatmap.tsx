import React from 'react';
import { Box, Button, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import { Seat } from '../types';

interface SeatmapProps {
  seatmap: Seat[][];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

const Seatmap: React.FC<SeatmapProps> = ({ seatmap, selectedSeats, onSeatSelect }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));

  const getSeatSize = () => {
    if (isXs) return 24;
    if (isSm) return 28;
    if (isMd) return 32;
    return 36;
  };

  const seatSize = getSeatSize();

  return (
    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'background.default' }}>
      <Typography variant="h6" gutterBottom align="center">
        Select Your Seats
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.2)',
          borderRadius: '4px',
        },
      }}>
        <Box sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          {seatmap.map((row, rowIndex) => (
            <Box key={rowIndex} sx={{ display: 'flex', mb: 1 }}>
              {row.map((seat) => (
                <Button
                  key={seat.id}
                  variant={selectedSeats.includes(seat.id) ? 'contained' : 'outlined'}
                  color={seat.status === 'available' ? 'primary' : 'error'}
                  disabled={seat.status !== 'available'}
                  onClick={() => onSeatSelect(seat.id)}
                  sx={{ 
                    minWidth: seatSize, 
                    m: 0.5, 
                    p: 0,
                    width: seatSize,
                    height: seatSize,
                    borderRadius: '50%',
                    fontSize: theme.typography.pxToRem(seatSize / 2),
                  }}
                >
                  {`${seat.row}-${seat.column}`}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default Seatmap;