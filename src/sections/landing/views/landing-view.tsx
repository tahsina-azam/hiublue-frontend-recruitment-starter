'use client';

import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(to bottom right, #FFD700, #32CD32)', // Yellow to Green Gradient
        padding: 2,
      }}
    >
      {/* Heading & Description */}
      <Typography variant="h1" fontWeight="bold" color="black" gutterBottom>
        Welcome to Dashboard
      </Typography>
      <Typography variant="h4" color="white" maxWidth={600} mb={3}>
        In this dashboard, get visualizations of system data and send offers to
        new users. Monitor progress and insights efficiently.
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: 'white',
          color: 'black',
          '&:hover': { bgcolor: '#f0f0f0' },
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
        onClick={() => router.push('/login')}
      >
        Go to my dashboard <ArrowForwardIcon />
      </Button>
    </Box>
  );
}
