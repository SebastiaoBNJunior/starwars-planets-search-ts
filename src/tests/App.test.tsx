import { act, render, screen } from '@testing-library/react';
import PlanetsProvider from '../context/DataProvider';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {vi} from 'vitest';
import testData from './testData';


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
    <PlanetsProvider>
      <App />
    </PlanetsProvider>);
    const inputNameFIlter = screen.getByTestId(/name-filter/i);
    const columnFilter = screen.getByTestId(/column-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const inputFilter = screen.getByTestId(/value-filter/i);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const table = await screen.findByRole('table');

    expect(inputNameFIlter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(inputFilter).toBeInTheDocument();
    expect(table.querySelectorAll('tr')).toHaveLength(11)
  });

  test('Verificando filtro por texto', async () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>);
    const inputNameFIlter = screen.getByTestId(/name-filter/i);
    await act(async () => {
      userEvent.type(inputNameFIlter, 'oo');
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    const table = await screen.findByRole('table');
    expect(table.querySelectorAll('tr')).toHaveLength(3)
  });

  test('Verificando filtro maior que', async () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>);
    const inputFilter = screen.getByTestId(/value-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);

    await act(async () => {
      userEvent.type(inputFilter, '200000');
      userEvent.click(buttonFilter);
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    const table = await screen.findByRole('table');
    expect(table.querySelectorAll('tr')).toHaveLength(7)
  });

  test('Verificando filtro menor que', async () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>);
    const inputFilter = screen.getByTestId(/value-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);

    await act(async () => {
      userEvent.type(inputFilter, '200000');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.click(buttonFilter);
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    const table = await screen.findByRole('table');
    expect(table.querySelectorAll('tr')).toHaveLength(2)
  });

  test('Verificando filtro igual a', async () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>);
    const inputFilter = screen.getByTestId(/value-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);

    await act(async () => {
      userEvent.type(inputFilter, '200000');
      userEvent.selectOptions(comparisonFilter, 'igual a');
      userEvent.click(buttonFilter);
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    const table = await screen.findByRole('table');
    expect(table.querySelectorAll('tr')).toHaveLength(2)
  });

  test('Verificando filtro igual a', async () => {
    render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>);
    const inputFilter = screen.getByTestId(/value-filter/i);
    const columnFilter = screen.getByTestId(/column-filter/i);
    const comparisonFilter = screen.getByTestId(/comparison-filter/i);
    const buttonFilter = screen.getByTestId(/button-filter/i);

    await act(async () => {
      userEvent.type(inputFilter, '8900');
      userEvent.selectOptions(columnFilter, 'diameter');
      userEvent.selectOptions(comparisonFilter, 'maior que');
      userEvent.click(buttonFilter);
    })
    await act(async () => {
      userEvent.type(inputFilter, '100000');
      userEvent.selectOptions(columnFilter, 'population');
      userEvent.selectOptions(comparisonFilter, 'menor que');
      userEvent.click(buttonFilter);
    })
    await new Promise(resolve => setTimeout(resolve, 2000));
    const filtesEl = screen.getAllByTestId('filter');
    console.log(filtesEl.length);
    expect(filtesEl).toHaveLength(2);
    await act(async () => {
      userEvent.click(filtesEl[0].querySelector('button')!);
    })
    const filtesEl2 = screen.getAllByTestId('filter');
    expect(filtesEl2).toHaveLength(1);
  });
});
