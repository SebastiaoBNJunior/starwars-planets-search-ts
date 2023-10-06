export type ApiPlanetsType = {
  count: number,
  next: string,
  previous: null,
  results: TypePlanets[],
};

export type TypePlanets = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents?: string[],
  films: string[],
  created: string,
  edited: string,
  url: string
};

export type FormInitialValuesType = {
  column: 'population' | 'orbital_period' |
  'diameter' | 'rotation_period' | 'surface_water',
  operador: string,
  valueFilter: number,
};

export type OrderType = {
  order: { column: 'population' | 'orbital_period' | 'diameter'
  | 'rotation_period' | 'surface_water',
  sort: 'ASC' | 'DESC' }
};
