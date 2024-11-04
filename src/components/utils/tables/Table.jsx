import React from 'react'


export const Table = ({ data, columns }) => (

    <div className="overflow-x-auto">
      
      <table className="min-w-full  text-slate-300 font-normal">
        <thead className='text-slate-200'>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="py-3 px-4 text-left">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t border-gray-700">
              {columns.map((column) => (
                <td key={column.key} className="py-3 px-4">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  