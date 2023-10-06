// import React, { useContext, useState } from 'react';
// import DataContext from '../context/DataContext';

// export default function FilterNumerics() {
//   const [selectedValues, setSelectedValues] = useState([
//     'population',
//     'orbital_period',
//     'diameter',
//     'rotation_period',
//     'surface_water',
//   ]);
//   const { form, handleSelect,
//     handleSubmit, handleChange,
//     inputValue, newValuesProps, handleOrder,
//     ordenation, filtredOrder } = useContext(DataContext);

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     handleSubmit();
//   };

//   const orderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     filtredOrder();
//   };

//   return (
//     <>
//       <form onSubmit={ onSubmit }>
//         <input
//           data-testid="name-filter"
//           type="text"
//           onChange={ handleChange }
//           placeholder="Search"
//           value={ inputValue }
//         />
//         <select
//           id="column-filter"
//           name="column"
//           data-testid="column-filter"
//           onChange={ handleSelect }
//         >
//           {newValuesProps.map((value, index) => (
//             <option key={ index } value={ value }>{value}</option>
//           ))}
//         </select>
//         <select
//           id="comparison-filter"
//           name="operador"
//           onChange={ handleSelect }
//           data-testid="comparison-filter"
//         >
//           <option value="maior que">maior que</option>
//           <option value="menor que">menor que</option>
//           <option value="igual a">igual a</option>
//         </select>
//         <input
//           id="value-filter"
//           name="valueFilter"
//           type="number"
//           data-testid="value-filter"
//           value={ form.valueFilter }
//           onChange={ handleSelect }
//         />
//         <button data-testid="button-filter">Filtrar</button>
//       </form>
//       <form onSubmit={ orderSubmit }>
//         <select
//           name="column"
//           data-testid="column-sort"
//           onChange={ handleOrder }
//         >
//           {selectedValues.map((value, index) => (
//             <option key={ index } value={ value }>{value}</option>
//           ))}
//         </select>
//         <label>
//           Ascendente
//           <input
//             type="radio"
//             value="ASC"
//             name="sort-order"
//             data-testid="column-sort-input-asc"
//             onChange={ handleOrder }
//             checked={ ordenation.order.sort === 'ASC' }
//           />
//         </label>
//         <label>
//           Descendente
//           <input
//             type="radio"
//             value="DESC"
//             name="sort-order"
//             data-testid="column-sort-input-desc"
//             onChange={ handleOrder }
//             checked={ ordenation.order.sort === 'DESC' }
//           />
//         </label>
//         <button data-testid="column-sort-button">Ordenar</button>
//       </form>
//     </>
//   );
// }
