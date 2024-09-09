import React, { useContext, useMemo } from 'react';
import { useTable } from 'react-table';
import { MainContext } from '../context/MainContext';

const ProductTable = ({ setdata }) => {
  const { allproducts } = useContext(MainContext);

  // Handle Manage button click
  const handleManage = (product) => {
    console.log('Product data:', product);
    setdata(product); // Pass the product data to parent or state
  };

  // Memoize the columns to prevent unnecessary re-renders
  const columns = useMemo(() => [
    {
      Header: 'Photo',
      accessor: 'image',
      Cell: ({ cell: { value } }) => (
        <img src={value} alt="Product" className="w-12 h-12 object-cover bg-blue-500" />
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
      Cell: ({ row }) => (
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
          onClick={() => handleManage(row.original)}  // Access handleManage here
        >
          Manage
        </button>
      ),
    },
  ], []);

  // Memoize the data to prevent unnecessary re-renders
  const data = useMemo(() => allproducts, [allproducts]);

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
