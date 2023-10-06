import { createContext } from 'react';
import { TypePlanets } from '../types';

type TypeDataContext = {
  data: TypePlanets[];
  filteredData: TypePlanets[];
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
  ordenation: {
    order: {
      column: 'population' | 'orbital_period'
      | 'diameter' | 'rotation_period' | 'surface_water';
      sort: 'ASC' | 'DESC';
    }
  }
  filtredOrder: () => void;
  handleOrder: (event: React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleSubmit: () => void;
  handleSelect: (event: React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;

};

const DataContext = createContext({} as TypeDataContext);

export default DataContext;
