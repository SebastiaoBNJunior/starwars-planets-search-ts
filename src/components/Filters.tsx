import React, { useContext } from 'react';
import DataContext from '../context/DataContext';

export default function Filters() {
  const { form, handleSelect, handleSubmit } = useContext(DataContext);

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="column-filter">
        Coluna:
        <select
          id="column-filter"
          name="column"
          data-testid="column-filter"
          onChange={ handleSelect }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador:
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
      </label>
      <input
        id="value-filter"
        name="valueFilter"
        type="number"
        data-testid="value-filter"
        value={ form.valueFilter }
        onChange={ handleSelect }
      />
      <button type="submit" data-testid="button-filter">Filtrar</button>
    </form>
  );
}
