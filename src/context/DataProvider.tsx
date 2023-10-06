import React, { useEffect, useState } from 'react';
import DataContext from './DataContext';
import { FormInitialValuesType, OrderType, TypePlanets } from '../types';
import fetchApi from '../api/planetsApi';

type DataProviderProps = {
  children: React.ReactNode;
};

function DataProvider({ children }: DataProviderProps) {
  const valuesProps = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [newValuesProps, setNewValuesProps] = useState<string[]>(valuesProps);
  const [data, setData] = useState<TypePlanets[]>([]);
  const [filteredData, setFilteredData] = useState<TypePlanets[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [form, setForm] = useState<FormInitialValuesType>({
    column: 'population',
    operador: 'maior que',
    valueFilter: 0,
  });
  const [ordenation, setOrdenation] = useState<OrderType>({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
  useEffect(() => {
    const getData = async () => {
      const response = await fetchApi();
      // console.log(response);
      setData(response.map((planet: TypePlanets) => {
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
    setFilteredData(data.filter((planet: TypePlanets) => (
      planet.name.toLowerCase().includes(event.target.value)
    )));
  };

  const filteredValuesData = () => {
    const { column, operador, valueFilter } = form;
    if (filteredData.length === 0) {
      if (operador === 'maior que') {
        setFilteredData(data.filter((planet: TypePlanets) => (
          Number(planet[column]) > Number(valueFilter)
        )));
      }
      if (operador === 'menor que') {
        setFilteredData(data.filter((planet: TypePlanets) => (
          Number(planet[column]) < Number(valueFilter)
        )));
      }
      if (operador === 'igual a') {
        setFilteredData(data.filter((planet: TypePlanets) => (
          Number(planet[column]) === Number(valueFilter)
        )));
      }
    }
    setNewValuesProps(valuesProps.filter((value) => value !== column));
  };

  const secondFilteredValuesData = () => {
    const { column, operador, valueFilter } = form;
    if (operador === 'maior que') {
      setFilteredData(filteredData.filter((planet: TypePlanets) => (
        Number(planet[column]) > Number(valueFilter)
      )));
    }
    if (operador === 'menor que') {
      setFilteredData(filteredData.filter((planet: TypePlanets) => (
        Number(planet[column]) < Number(valueFilter)
      )));
    }
    if (operador === 'igual a') {
      setFilteredData(filteredData.filter((planet: TypePlanets) => (
        Number(planet[column]) === Number(valueFilter)
      )));
    }
    setNewValuesProps(valuesProps.filter((value) => value !== column));
  };

  const handleSubmit = () => {
    if (filteredData.length === 0) {
      filteredValuesData();
    } else {
      secondFilteredValuesData();
    }
  };

  const filtredOrder = () => {
    const { column, sort } = ordenation.order;
    console.log(column, sort);
    const newData = [...data];
    if (sort === 'ASC') {
      setFilteredData(newData.sort((a, b) => {
        if (a[column] === 'unknown') return 1;
        if (b[column] === 'unknown') return -1;
        return Number(a[column]) - Number(b[column]);
      }));
    } if (sort === 'DESC') {
      setFilteredData(newData.sort((a, b) => {
        if (a[column] === 'unknown') return 1;
        if (b[column] === 'unknown') return -1;
        return Number(b[column]) - Number(a[column]);
      }));
    }
  };

  const handleOrder = (event: React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'sort-order') {
      setOrdenation({
        order: {
          ...ordenation.order,
          sort: value as 'ASC' | 'DESC',
        },
      });
    } else if (name === 'column') {
      setOrdenation({
        order: {
          ...ordenation.order,
          column: value as 'population' | 'orbital_period' |
          'diameter' | 'rotation_period' | 'surface_water',
        },
      });
    }
  };

  const context = {
    data,
    filteredData,
    handleChange,
    inputValue,
    form,
    newValuesProps,
    ordenation,
    filtredOrder,
    handleOrder,
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
