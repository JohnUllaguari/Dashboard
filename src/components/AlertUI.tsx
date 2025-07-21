import React from 'react';
import Alert from '@mui/material/Alert';

interface AlertConfig {
  description: string;
}

export default function AlertUI({ description }: AlertConfig) {
  return (
    <Alert severity="success" variant="outlined">
      {description}
    </Alert>
  );
}
