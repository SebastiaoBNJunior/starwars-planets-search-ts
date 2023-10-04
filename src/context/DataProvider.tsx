import { useEffect, useState } from 'react';
import DataContext from './DataContext';
import { PlanetType } from '../types';
import fetchApiData from '../api/planetsApi';

type DataProviderProps = {
  children: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<PlanetType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchApiData();
      console.log(response);
      setData(response.map((planet: PlanetType) => {
        delete planet.residents;
        return planet;
      }));
    };
    getData();
  }, []);

  const context = {
    data,
  };

  return (
    <DataContext.Provider value={ context }>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
