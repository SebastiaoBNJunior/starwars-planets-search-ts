const url = 'https://swapi.dev/api/planets';

export const fetchApiData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
