import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: number;
  change: number;
}

export default function DashboardCard({
  title,
  value,
  change,
}: DashboardCardProps) {
  return (
    <Box
      sx={{
        width: 400,
        height: 178,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ width: 350, height: 148 }}>
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="h3" fontWeight="bold">
            {value.toLocaleString()}
          </Typography>
          <Typography variant="subtitle2">
            <span
              style={{
                color: change >= 0 ? 'green' : 'red', // Arrows color: green for increase, red for decrease
              }}
            >
              {change >= 0 ? '▲' : '▼'}
            </span>{' '}
            <span style={{ fontWeight: 'bold', color: 'black' }}>
              {change.toFixed(2)}%
            </span>{' '}
            <span style={{ color: 'grey' }}>previous month</span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
