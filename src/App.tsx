import React from 'react';
import './App.css';
import Table from './components/Table';
import FilterNumerics from './components/Filters';

function App() {
  return (
    <>
      <FilterNumerics />
      <Table />
    </>
  );
}

export default App;
