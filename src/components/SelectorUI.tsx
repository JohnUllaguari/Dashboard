// src/components/SelectorUI.tsx
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export interface SelectorUIProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function SelectorUI({
  selectedCity,
  onCityChange,
}: SelectorUIProps) {
  const handleChange = (e: SelectChangeEvent<string>) => {
    onCityChange(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-label">Ciudad</InputLabel>
      <Select
        labelId="city-label"
        value={selectedCity}
        label="Ciudad"
        onChange={handleChange}
      >
        <MenuItem value="" disabled>
          <em>Seleccione una ciudad</em>
        </MenuItem>
        <MenuItem value="guayaquil">Guayaquil</MenuItem>
        <MenuItem value="quito">Quito</MenuItem>
        <MenuItem value="manta">Manta</MenuItem>
        <MenuItem value="cuenca">Cuenca</MenuItem>
      </Select>
    </FormControl>
  );
}
