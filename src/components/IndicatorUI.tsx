import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IndicatorUIProps {
  title?: string;
  description?: string;
}

export default function IndicatorUI({ title, description }: IndicatorUIProps) {
  return (
    <Card>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h5" component="div">
          {description}
        </Typography>
        <Typography variant="body2" component="p" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
