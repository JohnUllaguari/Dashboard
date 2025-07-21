// src/layouts/DashboardLayout.tsx
import React from 'react';
import Grid from '@mui/material/Grid';

import useDataFetcher from '../functions/useDataFetcher';
import HeaderUI from '../components/HeaderUI';
import AlertUI from '../components/AlertUI';
import SelectorUI from '../components/SelectorUI';
import IndicatorUI from '../components/IndicatorUI';
import ChartUI from '../components/ChartUI';
import TableUI from '../components/TableUI';
import AdditionalInfo from '../components/AdditionalInfo';

interface DashboardLayoutProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function DashboardLayout({
  selectedCity,
  onCityChange,
}: DashboardLayoutProps) {
  const { data, loading, error } = useDataFetcher(selectedCity);

  return (
    <Grid
      container
      component="section"                        // ← indicamos el componente raíz
      spacing={3}
      sx={{ p: 3 }}
    >
      {/* Encabezado */}
      <Grid item component="div" xs={12}>        {/* ← y aquí también */}
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid
        item
        component="div"
        xs={12}
        container
        justifyContent="flex-end"
      >
        <AlertUI description="No se prevén lluvias" />
      </Grid>

      {/* Selector */}
      <Grid item component="div" xs={12} md={3}>
        <SelectorUI
          selectedCity={selectedCity}
          onCityChange={onCityChange}
        />
      </Grid>

      {/* Indicadores */}
      <Grid item component="div" xs={12} md={9} container spacing={2}>
        {loading && (
          <Grid item component="div" xs={12}>
            Cargando datos…
          </Grid>
        )}
        {error && (
          <Grid item component="div" xs={12} sx={{ color: 'error.main' }}>
            {error}
          </Grid>
        )}
        {data && (
          <>
            <Grid item component="div" xs={12} md={3}>
              <IndicatorUI
                title="Temperatura (2m)"
                description={`${data.current_weather.temperature} ${data.hourly_units.temperature_2m}`}
              />
            </Grid>
            {/* …resto de indicadores… */}
          </>
        )}
      </Grid>

      {/* Gráfico */}
      {data && (
        <Grid
          item
          component="div"
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <ChartUI
            labels={data.hourly.time}
            series1={data.hourly.temperature_2m}
            series2={data.hourly.wind_speed_10m}
          />
        </Grid>
      )}

      {/* Tabla */}
      {data && (
        <Grid
          item
          component="div"
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <TableUI
            labels={data.hourly.time}
            values1={data.hourly.temperature_2m}
            values2={data.hourly.wind_speed_10m}
          />
        </Grid>
      )}

      {/* Información adicional */}
      <Grid item component="div" xs={12}>
        <AdditionalInfo />
      </Grid>
    </Grid>
  );
}
