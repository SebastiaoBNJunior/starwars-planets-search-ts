import { createContext } from 'react';
import { PlanetType } from '../types';

type TypeDataContext = {
  data: PlanetType[];
  handleChange: (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  inputValue: string;
  form: {
    column: 'population' | 'orbital_period' |
    'diameter' | 'rotation_period' | 'surface_water';
    operador: string;
    valueFilter: number;
  }
  newValuesProps: string[];
  handleSubmit: () => void;
  handleSelect: (event: React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

const DataContext = createContext({} as TypeDataContext);

export default DataContext;
