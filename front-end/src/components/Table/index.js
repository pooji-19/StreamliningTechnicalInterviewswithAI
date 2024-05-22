// // TableComponent.jsx
// import React from 'react';
// import './style.css';

// const TableComponent = () => {
    // const data = [
    //     { column1: 'Data 1-1', column2: 'Data 1-2', column3: 'Data 1-3', column4: 'Data 1-4' },
    //     { column1: 'Data 2-1', column2: 'Data 2-2', column3: 'Data 2-3', column4: 'Data 2-4' },
    //     { column1: 'Data 3-1', column2: 'Data 3-2', column3: 'Data 3-3', column4: 'Data 3-4' },
    //     // Add more data as needed
    //   ];
//   return (
//     <div className="table-container">
//       <table>
//         <thead>
//           <tr>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             <th>Column 3</th>
//             <th>Column 4</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               <td>{row.column1}</td>
//               <td>{row.column2}</td>
//               <td>{row.column3}</td>
//               <td>{row.column4}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;

import React from 'react';
import './style.css';

const TableComponent = () => {
  const data = [
    { column1: 'Data 1-1', column2: 'Data 1-2', column3: 'Data 1-3', column4: 'Data 1-4' },
    { column1: 'Data 2-1', column2: 'Data 2-2', column3: 'Data 2-3', column4: 'Data 2-4' },
    { column1: 'Data 3-1', column2: 'Data 3-2', column3: 'Data 3-3', column4: 'Data 3-4' },
    // Add more data as needed
  ];
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              <td>{row.column3}</td>
              <td>{row.column4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;