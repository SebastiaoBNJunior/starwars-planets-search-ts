import { useEffect, useState } from 'react';
import { fetchPlanetsApi } from '../api/planetsApi';
import PlanetContext from './DataContext';
import { PlanetType } from '../types';

// type PlanetsProviderProps = {
  children: React.ReactNode;
};

export default function PlanetsProvider({ children } : PlanetsProviderProps) {
  const [infoPlanet, setInfoPlanet] = useState<PlanetType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const planets = await fetchPlanetsApi();
      return setInfoPlanet(planets);
    };
    getData();
  }, []);

  const values = {
    PlanetsInfo: infoPlanet,
  };

  return (
    <PlanetContext.Provider value={ values }>
      {children}
    </PlanetContext.Provider>
  );
}
