// src/components/TableUI.tsx
import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TableUIProps {
  labels: string[];
  values1: number[];
  values2: number[];
}

interface Row {
  id: number;
  time: string;
  temp: number;
  wind: number;
}

export default function TableUI({ labels, values1, values2 }: TableUIProps) {
  const rows: Row[] = labels.map((t, i) => ({
    id: i,
    time: t,
    temp: values1[i],
    wind: values2[i],
  }));

  const columns: GridColDef<Row>[] = [
    { field: 'time', headerName: 'Hora', width: 130 },
    { field: 'temp', headerName: 'Temp (°C)', width: 130 },
    { field: 'wind', headerName: 'Viento (km/h)', width: 130 },
  ];

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid<Row>
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
