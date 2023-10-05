import React, { useEffect, useState } from 'react';
import DataContext from './DataContext';
import { FormInitialType, PlanetType } from '../types';
import fetchApiData from '../api/planetsApi';

type DataProviderProps = {
  children: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<PlanetType[]>([]);

  const [filteredData, setFilteredData] = useState<PlanetType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [form, setForm] = useState<FormInitialType>({
    column: 'population',
    operador: 'maior que',
    valueFilter: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetchApiData();
      // console.log(response);
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
    setInputValue(event.target.value);
    setFilteredData(data.filter((planet: PlanetType) => (
      planet.name.toLowerCase().includes(event.target.value)
    )));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { column, operador, valueFilter } = form;
    const filter = data.filter((planet: PlanetType) => {
      if (operador === 'maior que') {
        return Number(planet[column]) > Number(valueFilter);
      }
      if (operador === 'menor que') {
        return Number(planet[column]) < Number(valueFilter);
      }
      return Number(planet[column]) === Number(valueFilter);
    });
    setFilteredData(filter);
  };

  const handleSelect = (event: React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const context = {
    data,
    filteredData,
    handleChange,
    inputValue,
    form,
    handleSubmit,
    handleSelect,
  };

  return (
    <DataContext.Provider value={ context }>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
