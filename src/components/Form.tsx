import React, { useCallback, useEffect, useState } from 'react';
import Table from './Table';
import { FilterType } from '../types';

// Valores iniciais para os filtros
const INITIAL_FILTER_VALUES = {
  columnFilter: 'population',
  comparisonFilter: 'maior que',
  valueFilter: '0',
};

function Form() {
  // State para o valor do filtro de texto
  const [inputFilter, setInputFilter] = useState('');

  // State para os valores dos filtros numéricos
  const [filterValues, setFilterValues] = useState(INITIAL_FILTER_VALUES);

  // State para manter a lista de filtros numéricos aplicados
  const [listNumericFilter, setListNumericFilter] = useState<FilterType[]>([]);

  // Opções de filtro por coluna
  const optionsColumFilter = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  // Opções de comparação
  const comparison = ['maior que', 'menor que', 'igual a'];

  // Função para atualizar o valor do filtro de texto
  const handleInputFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter(event.target.value);
  };

  // Função para atualizar os valores dos filtros numéricos
  const handleNumericFilter = (event: React.
    ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Retorna as opções de filtro de coluna disponíveis
  const columnFilter = () => {
    if (listNumericFilter.length === 0) return optionsColumFilter;

    return optionsColumFilter.filter((option) => (
      listNumericFilter.some((filter) => filter.columnFilter !== option)
    ));
  };

  // Função para aplicar um novo filtro numérico
  const handleFilterClick = () => {
    const hasFilter = listNumericFilter.some((filter) => (
      filter.columnFilter === filterValues.columnFilter
    ));

    if (!hasFilter) {
      setListNumericFilter((prev) => [...prev, filterValues]);
    }
  };

  // Função para remover um filtro numérico
  const handleRemoveFilter = (column: string) => {
    setListNumericFilter((prev) => prev
      .filter((filter) => filter.columnFilter !== column));
  };

  // Seleciona a primeira opção disponível para o filtro de coluna
  const selectFirstOption = useCallback(() => {
    if (listNumericFilter.length === 0) {
      setFilterValues((prev) => ({
        ...prev,
        columnFilter: optionsColumFilter[0],
      }));
      return;
    }

    const column = optionsColumFilter.filter((option) => (
      listNumericFilter.some((filter) => filter.columnFilter !== option)
    ))[0];
    setFilterValues((prev) => ({
      ...prev,
      columnFilter: column,
    }));
  }, [listNumericFilter]);

  // Efeito colateral para selecionar a primeira opção disponível ao montar o componente
  useEffect(() => {
    selectFirstOption();
  }, [selectFirstOption]);

  return (
    <div>
      <section>
        {/* Input para filtrar por texto */}
        <input
          onChange={ handleInputFilter }
          data-testid="name-filter"
          type="text"
        />
      </section>
      <section>
        {/* Formulário de filtros numéricos */}
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
          Value:
          <input
            onChange={ (e) => handleNumericFilter(e) }
            value={ filterValues.valueFilter }
            data-testid="value-filter"
            id="valueFilter"
            name="valueFilter"
            type="text"
          />
        </label>
        {/* Botão para aplicar o filtro */}
        <button
          onClick={ handleFilterClick }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </section>
      <section>
        {/* Lista de filtros numéricos aplicados */}
        <ul>
          {listNumericFilter.map((filter) => (
            <li key={ filter.columnFilter } data-testid="filter">
              {`${filter.columnFilter} ${filter.comparisonFilter} ${filter.valueFilter}`}
              {/* Botão para remover o filtro */}
              <button onClick={ () => handleRemoveFilter(filter.columnFilter) }>X</button>
            </li>
          ))}
          {/* Botão para remover todos os filtros */}
          <button
            data-testid="button-remove-filters"
            onClick={ () => setListNumericFilter([]) }
          >
            Remover todas filtragens
          </button>
        </ul>
      </section>
      {/* Componente de tabela que recebe os filtros */}
      <Table inputFilter={ inputFilter } listNumericFilter={ listNumericFilter } />
    </div>
  );
}

export default Form;
