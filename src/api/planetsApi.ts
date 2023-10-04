const fetchApiData = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = (await response.json()).results;
  return data;
};

export default fetchApiData;
