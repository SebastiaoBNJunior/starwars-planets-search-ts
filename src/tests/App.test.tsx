import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {vi} from 'vitest';
import testData from './testData';
import DataProvider from '../context/DataProvider';


describe('Teste completo do projeto',  () => {

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      {
        json: async () => testData,
      } as Response)
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Verificando se o componente APP é renderizado da forma correta', async () => {
    render(
    <DataProvider>
      <App />
    </DataProvider>);
    const nameFilterInput = screen.getByTestId(/name-filter/i);
    const columFilter = screen.getByTestId(/column-filter/i);
    const comparatorFilter = screen.getByTestId(/comparison-filter/i);
    const inputFilter = screen.getByTestId(/value-filter/i);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const tableTag = await screen.findByRole('table');

    expect(nameFilterInput).toBeInTheDocument();
    expect(columFilter).toBeInTheDocument();
    expect(comparatorFilter).toBeInTheDocument();
    expect(inputFilter).toBeInTheDocument();
    expect(tableTag.querySelectorAll('tr')).toHaveLength(11)
  });

  test('Verificando filtro por texto', async () => {
    render(
    <DataProvider>
      <App />
    </DataProvider>);
    const inputNameFIlter = screen.getByTestId(/name-filter/i);
    await act(async () => {
      userEvent.type(inputNameFIlter, 'oo');
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    const tableTag = await screen.findByRole('table');
    expect(tableTag.querySelectorAll('tr')).toHaveLength(3)
  });

  test('Verificando filtro maior que', async () => {
    render(
    <DataProvider>
      <App />
    </DataProvider>);
    const inputFilter = screen.getByTestId(/value-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);

    await act(async () => {
      userEvent.type(inputFilter, '200000');
      userEvent.click(buttonFilter);
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    const tableTag = await screen.findByRole('table');
    expect(tableTag.querySelectorAll('tr')).toHaveLength(7)
  });

  test('Verificando filtro igual a', async () => {
    render(
    <DataProvider>
      <App />
    </DataProvider>);
    const inputFilter = screen.getByTestId(/value-filter/i);
    const columFilter = screen.getByTestId(/column-filter/i);
    const comparatorFilter = screen.getByTestId(/comparison-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);

    await act(async () => {
      userEvent.type(inputFilter, '8900');
      userEvent.selectOptions(columFilter, 'diameter');
      userEvent.selectOptions(comparatorFilter, 'maior que');
      userEvent.click(buttonFilter);
    })
    await act(async () => {
      userEvent.type(inputFilter, '100000');
      userEvent.selectOptions(columFilter, 'population');
      userEvent.selectOptions(comparatorFilter, 'menor que');
      userEvent.click(buttonFilter);
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    const filtersEl = screen.getAllByTestId('filter');
    console.log(filtersEl.length);
    expect(filtersEl).toHaveLength(2);
    await act(async () => {
      userEvent.click(filtersEl[0].querySelector('button')!);
    })
    const filtersEl2 = screen.getAllByTestId('filter');
    expect(filtersEl2).toHaveLength(1);
  });
});
