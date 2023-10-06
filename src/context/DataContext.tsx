import { createContext } from 'react';
import { PlanetType } from '../types';

type ContextPlanetType = {
  PlanetsInfo: PlanetType[];
};

const DataContext = createContext({} as ContextPlanetType);

export default DataContext;
