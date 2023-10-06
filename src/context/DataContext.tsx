import { createContext } from 'react';
import { PlanetType } from '../types';

type ContextPlanetType = {
  PlanetsInfo: PlanetType[];
};

const PlanetContext = createContext({} as ContextPlanetType);

export default PlanetContext;
