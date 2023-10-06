import React, { useCallback, useEffect, useState } from 'react';
import Table from './Table';
import { FilterType } from '../types';

const INITIAL_FILTER_VALUES = {
  columnFilter: 'population',
  comparisonFilter: 'maior que',
  valueFilter: '0',
};

function Form() {
  const [inputFilter, setInputFilter] = useState('');
  const [filterValues, setFilterValues] = useState(INITIAL_FILTER_VALUES);
  const [listNumericFilter, setListNumericFilter] = useState<FilterType[]>([]);

  const optionsColumFilter = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const comparison = ['maior que', 'menor que', 'igual a'];

  const handleInputFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter(event.target.value);
  };

  const handleNumericFilter = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columnFilter = () => {
    if (listNumericFilter.length === 0) return optionsColumFilter;

    return optionsColumFilter.filter((option) => (listNumericFilter
      .some((filter) => filter.columnFilter !== option)));
  };

  const handleFilterClick = () => {
    const hasFilter = listNumericFilter.some((filter) => (
      filter.columnFilter === filterValues.columnFilter
    ));

    if (!hasFilter) {
      setListNumericFilter((prev) => [...prev, filterValues]);
    }
  };

  const handleRemoveFilter = (column: string) => {
    setListNumericFilter((prev) => prev
      .filter((filter) => filter.columnFilter !== column));
  };

  const selectFistOption = useCallback(() => {
    if (listNumericFilter.length === 0) {
      setFilterValues((prev) => ({
        ...prev,
        columnFilter: optionsColumFilter[0],
      }));
      return;
    }

    const column = optionsColumFilter.filter((option) => (listNumericFilter
      .some((filter) => filter.columnFilter !== option)))[0];
    setFilterValues((prev) => ({
      ...prev,
      columnFilter: column,
    }));
  }, [listNumericFilter]);

  useEffect(() => {
    selectFistOption();
  }, [selectFistOption]);

  return (
    <div>
      <section>
        <input
          onChange={ handleInputFilter }
          data-testid="name-filter"
          type="text"
        />
      </section>
      <section>
        <label htmlFor="columnFilter">
          Filter by column:
          <select
            onChange={ (e) => handleNumericFilter(e) }
            value={ filterValues.columnFilter }
            data-testid="column-filter"
            id="columnFilter"
            name="columnFilter"
          >
            {columnFilter().map((option) => (
              <option key={ option }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparisonFilter">
          Comparison:
          <select
            onChange={ (e) => handleNumericFilter(e) }
            value={ filterValues.comparisonFilter }
            data-testid="comparison-filter"
            id="comparisonFilter"
            name="comparisonFilter"
          >
            {comparison.map((option) => (
              <option key={ option }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="valueFilter">
          Valor:
          <input
            onChange={ (e) => handleNumericFilter(e) }
            value={ filterValues.valueFilter }
            data-testid="value-filter"
            id="valueFilter"
            name="valueFilter"
            type="text"
          />
        </label>
        <button
          onClick={ handleFilterClick }
          data-testid="button-filter"
        >
          Filtrar

        </button>
      </section>
      <section>
        <ul>
          {listNumericFilter.map((filter) => (
            <li key={ filter.columnFilter } data-testid="filter">
              {`${filter.columnFilter} ${filter.comparisonFilter} ${filter.valueFilter}`}
              <button onClick={ () => handleRemoveFilter(filter.columnFilter) }>X</button>
            </li>
          ))}
          <button
            data-testid="button-remove-filters"
            onClick={ () => setListNumericFilter([]) }
          >
            Remover todas filtragens

          </button>
        </ul>
      </section>
      <Table inputFilter={ inputFilter } listNumericFilter={ listNumericFilter } />
    </div>
  );
}

export default Form;
