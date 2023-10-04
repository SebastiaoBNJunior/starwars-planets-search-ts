import React, { useEffect, useState } from 'react';
import DataContext from './DataContext';
import { PlanetType } from '../types';
import fetchApiData from '../api/planetsApi';

type DataProviderProps = {
  children: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<PlanetType[]>([]);

  const [filteredData, setFilteredData] = useState<PlanetType[]>([]);
  const [value, setValue] = useState('');

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

  const handleChange = (event: React.ChangeEvent<
  HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.target.value);
    setFilteredData(data.filter((planet: PlanetType) => (
      planet.name.toLowerCase().includes(event.target.value)
    )));
  };

  const context = {
    data,
    filteredData,
    handleChange,
    value,
  };

  return (
    <DataContext.Provider value={ context }>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
