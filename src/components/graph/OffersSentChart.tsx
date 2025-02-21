import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';
import { useAuth } from 'context/authContext';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions

interface ChartData {
  series: { name: string; data: number[]; color?: string }[];
  categories: string[];
}

const OffersSentChart = () => {
  const { token } = useAuth();
  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://dummy-1.hiublue.com/api/dashboard/stat?filter=this-week',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        if (!data.offers_sent) return;

        const offersSent = data.offers_sent as Record<string, number>;
        const days = Object.keys(offersSent);
        const offersData = days.map((day) => offersSent[day]);

        const shortDays = days.map((day) => day.slice(0, 3));

        setChartData({
          series: [{ name: 'Offers Sent', data: offersData, color: '#000' }],
          categories: shortDays,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  // Explicitly type 'options' as ApexOptions
  const options: ApexOptions = {
    chart: { type: 'line', height: 318, width: 500 },
    stroke: { curve: 'smooth', width: 2, colors: ['#000'] },
    xaxis: { categories: chartData.categories },
    yaxis: { title: { text: 'Offers Sent' } },
    tooltip: { y: { formatter: (val: number) => `${val} offers` } },
  };

  return (
    <Card sx={{ width: '555px' }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold">
          Offers sent
        </Typography>
        <div style={{ width: '528px', height: '318px' }}>
          <ApexCharts
            options={options}
            series={chartData.series}
            type="line"
            height={318}
            width={528}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersSentChart;


