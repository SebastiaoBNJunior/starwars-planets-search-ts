import { createContext } from 'react';
import { PlanetType } from '../types';

type TypeDataContext = {
  data: PlanetType[];
};

const DataContext = createContext({} as TypeDataContext);

export default DataContext;
