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
  const [numericFilterList, setNumericFilterList] = useState<FilterType[]>([]);

  const columnFilterOptions = ['population', 'orbital_period',
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
    if (numericFilterList.length === 0) return columnFilterOptions;

    return columnFilterOptions.filter((option) => (numericFilterList
      .some((filter) => filter.columnFilter !== option)));
  };

  const handleFilterClick = () => {
    const hasFilter = numericFilterList.some((filter) => (
      filter.columnFilter === filterValues.columnFilter
    ));

    if (!hasFilter) {
      setNumericFilterList((prev) => [...prev, filterValues]);
    }
  };

  const handleRemoveFilter = (column: string) => {
    setNumericFilterList((prev) => prev
      .filter((filter) => filter.columnFilter !== column));
  };

  const selectFistOption = useCallback(() => {
    if (numericFilterList.length === 0) {
      setFilterValues((prev) => ({
        ...prev,
        columnFilter: columnFilterOptions[0],
      }));
      return;
    }

    const column = columnFilterOptions.filter((option) => (numericFilterList
      .some((filter) => filter.columnFilter !== option)))[0];
    setFilterValues((prev) => ({
      ...prev,
      columnFilter: column,
    }));
  }, [numericFilterList]);

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
          {numericFilterList.map((filter) => (
            <li key={ filter.columnFilter } data-testid="filter">
              {`${filter.columnFilter} ${filter.comparisonFilter} ${filter.valueFilter}`}
              <button onClick={ () => handleRemoveFilter(filter.columnFilter) }>X</button>
            </li>
          ))}
          <button
            data-testid="button-remove-filters"
            onClick={ () => setNumericFilterList([]) }
          >
            Remover todas filtragens

          </button>
        </ul>
      </section>
      <Table inputFilter={ inputFilter } numericFilterList={ numericFilterList } />
    </div>
  );
}

export default Form;
