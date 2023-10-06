export type PlanetType = {
  [key: string]: any,
  name:string,
  rotation_period:string,
  orbital_period:string,
  diameter:string,
  climate:string,
  gravity:string,
  terrain:string,
  residents?:string[]
  surface_water:string,
  population:string,
  films:string,
  created:string,
  edited:string,
  url:string,
};

export type FilterType = {
  columnFilter: string,
  comparisonFilter: string,
  valueFilter: string,
};
