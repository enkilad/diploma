import React, { useEffect, useState } from 'react';
import { loadData, ProcessedData } from '../loadData';

export const TableContainer = () => {
  const [tableRows, setTableRows] = useState<ProcessedData[]>([]);
  console.log('tableRows :>> ', tableRows);

  useEffect(() => {
    const load = async () => {
      const data = await loadData();

      setTableRows(data);

      
    };

    load();
  }, []);

  if (!tableRows) return <div>Error!</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Classification</th>
        </tr>
      </thead>
      <tbody>
        {tableRows?.map((row) => {
          return (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.category}</td>
              <td>{row.classification}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
