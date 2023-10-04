import { useEffect } from 'react';
import { fetchApiData } from '../api/planetsApi';
import { PlanetType } from '../types';

export default function Table() {
  useEffect(() => {
    async function getCurrency() {
      const planetsData = await fetchApiData();
      const { results } = planetsData;
      console.log(results);
    }
    getCurrency();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Rotation Period
            </th>
            <th>
              Orbital Period
            </th>
            <th>
              Diameter
            </th>
            <th>
              Climate
            </th>
            <th>
              Gravity
            </th>
            <th>
              Terrain
            </th>
            <th>
              Surface Water
            </th>
            <th>
              Population
            </th>
            <th>
              Films
            </th>
            <th>
              Created
            </th>
            <th>
              Edited
            </th>
            <th>
              URL
            </th>
          </tr>
        </thead>
        <tbody>
          <p>COLOQUE A API AQUI</p>
        </tbody>
      </table>
    </div>
  );
}
