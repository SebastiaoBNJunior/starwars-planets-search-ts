import React, { useContext } from 'react';
import DataContext from '../context/DataContext';

export default function Filters() {
  const { form, handleSelect,
    handleSubmit, handleChange, inputValue, newValuesProps } = useContext(DataContext);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={ onSubmit }>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handleChange }
        placeholder="Search"
        value={ inputValue }
      />
      <select
        id="column-filter"
        name="column"
        data-testid="column-filter"
        onChange={ handleSelect }
      >
        {newValuesProps.map((value, index) => (
          <option key={ index } value={ value }>{value}</option>
        ))}
      </select>
      <select
        id="comparison-filter"
        name="operador"
        onChange={ handleSelect }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        id="value-filter"
        name="valueFilter"
        type="number"
        data-testid="value-filter"
        value={ form.valueFilter }
        onChange={ handleSelect }
      />
      <button data-testid="button-filter">Filtrar</button>
    </form>
  );
}
