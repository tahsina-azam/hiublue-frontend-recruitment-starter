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
      <Card sx={{ width: 344, height: 148 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h4" fontWeight="bold">
            {value.toLocaleString()}
          </Typography>
          <Typography
            variant="subtitle2"
            color={change >= 0 ? 'success.main' : 'error.main'}
          >
            {change >= 0
              ? `▲ ${change.toFixed(2)}% Increase`
              : `▼ ${Math.abs(change).toFixed(2)}% Decrease`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
