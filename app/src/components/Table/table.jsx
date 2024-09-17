import React from 'react'

const Table = ({ columns, data }) => {
  return (
    <table className='min-w-full border-collapse border border-gray-400 items-center flex-col'>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className='border border-gray-300 p-2'>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex} className='border border-gray-300 p-1.5'>
                {col.render ? col.render(item) : item[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
