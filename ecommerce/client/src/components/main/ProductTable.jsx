import React from 'react';
import { useTable } from 'react-table';

// Sample product data
const data = [
  {
    photo: '/path-to-image/shoe1.png', // Replace with actual image paths
    name: 'Puma Shoes Air Jordan Cook Niga 2023',
    price: 690,
    stock: 3,
  },
  {
    photo: '/path-to-image/macbook.png',
    name: 'Macbook',
    price: 232223,
    stock: 213,
  },
  // Add more products if needed
];

// Define the columns array
const columns = [
  {
    Header: 'Photo',
    accessor: 'photo',
    Cell: ({ cell: { value } }) => (
      <img src={value} alt="Product" className="w-12 h-12 object-cover" />
    ),
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: 'Stock',
    accessor: 'stock',
  },
  {
    Header: 'Action',
    Cell: () => (
      <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition">
        Manage
      </button>
    ),
  },
];

// Main ProductTable Component
const ProductTable = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-gray-600 font-medium"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 text-sm text-gray-900"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
