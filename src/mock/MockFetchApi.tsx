import mockDataApi from './MockDataApi';

const mockFetchApi = () => Promise.resolve({
  json: () => Promise.resolve(mockDataApi),
});

export default mockFetchApi;
