import { createContext } from 'react';
import { PlanetType } from '../types';

type TypeDataContext = {
  data: PlanetType[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const DataContext = createContext({} as TypeDataContext);

export default DataContext;
