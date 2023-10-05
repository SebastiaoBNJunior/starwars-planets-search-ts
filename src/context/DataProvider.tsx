import React, { useEffect, useState } from 'react';
import DataContext from './DataContext';
import { FormInitialType, PlanetType } from '../types';
import fetchApiData from '../api/planetsApi';

type DataProviderProps = {
  children: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
  const valuesProps = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [newValuesProps, setNewValuesProps] = useState<string[]>(valuesProps);
  const [data, setData] = useState<PlanetType[]>([]);
  const [filterData, setFilteredData] = useState<PlanetType[]>([]);
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

  const handleSelect = (event: React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
    setFilteredData(data.filter((planet: PlanetType) => (
      planet.name.toLowerCase().includes(event.target.value)
    )));
  };

  const filteredValuesData = () => {
    const { column, operador, valueFilter } = form;
    if (filterData.length === 0) {
      if (operador === 'maior que') {
        setFilteredData(data.filter((planet: PlanetType) => (
          Number(planet[column]) > Number(valueFilter)
        )));
      }
      if (operador === 'menor que') {
        setFilteredData(data.filter((planet: PlanetType) => (
          Number(planet[column]) < Number(valueFilter)
        )));
      }
      if (operador === 'igual a') {
        setFilteredData(data.filter((planet: PlanetType) => (
          Number(planet[column]) === Number(valueFilter)
        )));
      }
    }
    setNewValuesProps(valuesProps.filter((value) => value !== column));
  };

  const secondFilteredValuesData = () => {
    const { column, operador, valueFilter } = form;
    if (operador === 'maior que') {
      setFilteredData(filterData.filter((planet: PlanetType) => (
        Number(planet[column]) > Number(valueFilter)
      )));
    }
    if (operador === 'menor que') {
      setFilteredData(filterData.filter((planet: PlanetType) => (
        Number(planet[column]) < Number(valueFilter)
      )));
    }
    if (operador === 'igual a') {
      setFilteredData(filterData.filter((planet: PlanetType) => (
        Number(planet[column]) === Number(valueFilter)
      )));
    }
    setNewValuesProps(valuesProps.filter((value) => value !== column));
  };

  const handleSubmit = () => {
    if (filterData.length === 0) {
      filteredValuesData();
    } else {
      secondFilteredValuesData();
    }
  };

  const context = {
    data,
    filterData,
    handleChange,
    inputValue,
    form,
    newValuesProps,
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
