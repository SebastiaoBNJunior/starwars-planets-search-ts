import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/DataContext';
import { FilterType, PlanetType } from '../types';

    type TableProps = {
      inputFilter: string;
      numericFilterList: FilterType[];
    };

function Table(props: TableProps) {
  const { PlanetsInfo } = useContext(PlanetContext);
  const [filtered, setFiltered] = useState<PlanetType[]>([]);
  const { inputFilter, numericFilterList } = props;

  useEffect(() => {
    setFiltered(PlanetsInfo);
    if (inputFilter !== '') {
      setFiltered(PlanetsInfo.filter((planet) => planet.name.includes(inputFilter)));
    }

    if (numericFilterList!.length > 0) {
      numericFilterList.forEach((filter) => {
        const { columnFilter, comparisonFilter, valueFilter } = filter;
        const valueFilterNumber = Number(valueFilter);
        switch (comparisonFilter) {
          case 'maior que':
            setFiltered((prev) => prev
              .filter((planet) => Number(planet[columnFilter]) > valueFilterNumber));
            break;
          case 'menor que':
            setFiltered((prev) => prev
              .filter((planet) => Number(planet[columnFilter]) < valueFilterNumber));
            break;
          case 'igual a':
            setFiltered((prev) => prev
              .filter((planet) => Number(planet[columnFilter]) === valueFilterNumber));
            break;
          default:
            break;
        }
      });
    }
  }, [inputFilter, PlanetsInfo, numericFilterList]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>rotation Period</th>
          <th>orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
