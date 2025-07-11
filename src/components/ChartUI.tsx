// src/components/ChartUI.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

interface ChartUIProps {
  labels: string[];
  series1: number[];
  series2: number[];
}

export default function ChartUI({ labels, series1, series2 }: ChartUIProps) {
  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura y Viento por hora
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: series1, label: 'Temp (2m)' },
          { data: series2, label: 'Viento 10m' },
        ]}
        xAxis={[{ scaleType: 'point', data: labels }]}
      />
    </>
  );
}
