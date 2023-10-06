import { PlanetType } from '../types';

export const fetchPlanetsApi = async () => {
  const URL_API = 'https://swapi.dev/api/planets';
  const response = await fetch(URL_API);
  const data = await response.json();
  const results = await data.results;

  const returnPlanet = results.map((planet: PlanetType) => {
    const { residents, ...resultType } = planet;
    return resultType;
  });
  return returnPlanet;
};
