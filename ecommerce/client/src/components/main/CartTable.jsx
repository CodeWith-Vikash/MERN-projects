import React, { useMemo, useState, useEffect, useCallback, useContext } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import { toast } from 'react-toastify';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const CartTable = ({ cart, setcart }) => {
  const { baseurl, userdata } = useContext(MainContext);
  const [deleting, setdeleting] = useState(false);

  // Memoize the `onQuantityChange` with debouncing
  const onQuantityChange = useCallback((productId, quantity) => {
    if (userdata) {
      axios
        .patch(`${baseurl}/api/cart/quantity/${userdata._id}`, { productId, quantity })
        .then((result) => {
          console.log(result);
          setcart(result.data.cart.items);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response ? err.response.data.message : 'Something went wrong');
        });
    }
  }, [baseurl, userdata]);

  const onQuantityChangeDebounced = useMemo(
    () => debounce(onQuantityChange, 500),
    [onQuantityChange]
  );

  const handleDelete = (item) => {
    const { product } = item;
    if (userdata && product) {
      setdeleting(true);
      axios
        .patch(`${baseurl}/api/cart/remove/${userdata._id}`, { productId: product._id })
        .then((result) => {
          console.log(result);
          setcart(result.data.cart.items);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response ? err.response.data.message : 'Something went wrong');
        })
        .finally(() => setdeleting(false));
    } else {
      toast.error('No user data available, try again');
    }
  };

  // Memoize the columns
  const columns = useMemo(
    () => [
      {
        Header: 'Photo',
        accessor: 'product.image',
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            alt="Product"
            className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg"
          />
        ),
      },
      {
        Header: 'Name',
        accessor: 'product.name',
        headerClassName: 'hidden md:table-cell',
        cellClassName: 'hidden md:table-cell',
        Cell: ({ cell: { value } }) => (
          <p className="text-xs md:text-sm lg:text-base">{value}</p>
        ),
      },
      {
        Header: 'Total Price',
        Cell: ({ row }) => {
          const { quantity, product } = row.original;
          if (!product) return <p className="text-xs md:text-sm lg:text-base">N/A</p>;
          const actualprice = (
            product.price - (product.price * product.discount) / 100
          ).toFixed(0);
          const totalPrice = quantity * actualprice;
          return <p className="text-xs md:text-sm lg:text-base">${totalPrice.toFixed(0)}</p>;
        },
      },
      {
        Header: 'Quantity',
        Cell: ({ row }) => {
          const [quantity, setQuantity] = useState(row.original.quantity);

          useEffect(() => {
            if (row.original.product?._id) {
              onQuantityChangeDebounced(row.original.product._id, quantity);
            }
          }, [quantity, row.original.product?._id, onQuantityChangeDebounced]);

          const increaseQuantity = () =>
            quantity < row.original.product.stock && setQuantity((prev) => prev + 1);
          const decreaseQuantity = () =>
            quantity > 1 && setQuantity((prev) => prev - 1);

          return (
            <div className="flex items-center space-x-2">
              <button
                className="border-2 border-gray-300 w-8 h-8 flex justify-center items-center text-lg font-bold text-gray-700 hover:bg-gray-200"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <p className="text-center w-8">{quantity}</p>
              <button
                className="border-2 border-gray-300 w-8 h-8 flex justify-center items-center text-lg font-bold text-gray-700 hover:bg-gray-200"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          );
        },
      },
      {
        Header: 'Delete',
        Cell: ({ row }) => (
          <button
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition text-xs md:text-sm flex items-center justify-center gap-1"
            onClick={() => handleDelete(row.original)}
          >
            Delete
            {deleting && <img src="/loader.gif" className="h-4 rounded-full" />}
          </button>
        ),
      },
    ],
    [onQuantityChangeDebounced, deleting]
  );

  // Memoize the data and filter out items without a product
  const data = useMemo(() => cart.filter(item => item.product), [cart]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

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
                  className={`${column.headerClassName} px-2 py-3 text-left text-gray-600 font-medium text-xs md:text-sm lg:text-base`}
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
                    className={`${cell.column.cellClassName} px-2 py-4 text-gray-900 text-xs md:text-sm lg:text-base`}
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

export default CartTable;
