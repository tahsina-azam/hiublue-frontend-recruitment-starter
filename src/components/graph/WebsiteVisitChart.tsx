// import React, { useEffect, useState } from 'react';
// import ApexCharts from 'react-apexcharts';
// import { Card, CardContent, Typography } from '@mui/material';
// import { useAuth } from 'context/authContext';
// import { ApexOptions } from 'apexcharts'; // ✅ Import ApexOptions

// interface ChartData {
//   series: { name: string; data: number[]; color?: string }[];
//   categories: string[];
// }

// const WeeklyWebsiteVisitsChart = () => {
//   const { token } = useAuth();
//   const [chartData, setChartData] = useState<ChartData>({
//     series: [],
//     categories: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           'https://dummy-1.hiublue.com/api/dashboard/stat?filter=this-week',
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const data = await response.json();

//         if (!data.website_visits) return;

//         const websiteVisits = data.website_visits as Record<
//           string,
//           { desktop: number; mobile: number }
//         >;
//         const days = Object.keys(websiteVisits);
//         const desktopVisits = days.map((day) => websiteVisits[day].desktop);
//         const mobileVisits = days.map((day) => websiteVisits[day].mobile);

//         // Convert full names to 3-letter format (Mon, Tue, ...)
//         const shortDays = days.map((day) => day.slice(0, 3));

//         // Setting Chart Data
//         setChartData({
//           series: [
//             { name: 'Desktop Visits', data: desktopVisits, color: '#28a745' },
//             { name: 'Mobile Visits', data: mobileVisits, color: '#ffc107' },
//           ],
//           categories: shortDays,
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [token]);

//   // ✅ Explicitly type 'options' as ApexOptions
//   const options: ApexOptions = {
//     chart: { type: 'bar', height: 318, width: 528 },
//     plotOptions: {
//       bar: { horizontal: false, columnWidth: '20px', borderRadius: 5 },
//     },
//     dataLabels: { enabled: false },
//     stroke: { show: true, width: 2, colors: ['transparent'] },
//     xaxis: { categories: chartData.categories },
//     yaxis: { title: { text: 'Visits' } },
//     fill: { opacity: 1 },
//     tooltip: { y: { formatter: (val: number) => `${val} visits` } },
//   };

//   return (
//     <Card sx={{ width: '555px' }}>
//       <CardContent>
//         <Typography variant="h4" fontWeight="bold">
//           Website visits
//         </Typography>
//         <div style={{ width: '528px', height: '318px' }}>
//           <ApexCharts
//             options={options}
//             series={chartData.series}
//             type="bar"
//             height={318}
//             width={528}
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default WeeklyWebsiteVisitsChart;

import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';
import { useAuth } from 'context/authContext';
import { ApexOptions } from 'apexcharts'; // ✅ Import ApexOptions
import { useMediaQuery, useTheme } from '@mui/material';

interface ChartData {
  series: { name: string; data: number[]; color?: string }[];
  categories: string[];
}

const WeeklyWebsiteVisitsChart = () => {
  const { token } = useAuth();
  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    categories: [],
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

        if (!data.website_visits) return;

        const websiteVisits = data.website_visits as Record<
          string,
          { desktop: number; mobile: number }
        >;
        const days = Object.keys(websiteVisits);
        const desktopVisits = days.map((day) => websiteVisits[day].desktop);
        const mobileVisits = days.map((day) => websiteVisits[day].mobile);

        // Convert full names to 3-letter format (Mon, Tue, ...)
        const shortDays = days.map((day) => day.slice(0, 3));

        // Setting Chart Data
        setChartData({
          series: [
            { name: 'Desktop Visits', data: desktopVisits, color: '#28a745' },
            { name: 'Mobile Visits', data: mobileVisits, color: '#ffc107' },
          ],
          categories: shortDays,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  // ✅ Explicitly type 'options' as ApexOptions
  const options: ApexOptions = {
    chart: { type: 'bar', height: isSmallScreen ? 250 : 318, width: '100%' },
    plotOptions: {
      bar: { horizontal: false, columnWidth: '20px', borderRadius: 5 },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: chartData.categories },
    yaxis: { title: { text: 'Visits' } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val: number) => `${val} visits` } },
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold">
          Website visits
        </Typography>
        <div style={{ width: '100%', height: isSmallScreen ? '250px' : '318px' }}>
          <ApexCharts
            options={options}
            series={chartData.series}
            type="bar"
            height={isSmallScreen ? 250 : 318}
            width="100%"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyWebsiteVisitsChart;
