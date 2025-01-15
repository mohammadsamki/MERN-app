import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'category', headerName: 'category', width: 130 },
    { field: 'name', headerName: 'name', width: 130 },
    { field: 'price', headerName: 'price', width: 130 },


  ];
  const rows = [
    { id: 1, category: 'Snow', name: 'Jon', price: 35 },
    { id: 2, category: 'Lannister', name: 'Cersei', price: 42 },
    { id: 3, category: 'Lannister', name: 'Jaime', price: 45 },
    { id: 4, category: 'Stark', name: 'Arya', price: 16 },
    { id: 5, category: 'Targaryen', name: 'Daenerys', price: 100 },
    { id: 6, category: 'Melisandre', name: null, price: 150 },
    { id: 7, category: 'Clifford', name: 'Ferrara', price: 44 },
    { id: 8, category: 'Frances', name: 'Rossini', price: 36 },
    { id: 9, category: 'Roxie', name: 'Harvey', price: 65 },
  ];
  const getTotalPrice = (rows) => rows.reduce((acc, row) => acc + (row.price || 0), 0);
const totalPrice = getTotalPrice(rows);
  const paginationModel = { pprice: 0, ppriceSize: 5 };

export default function Orders() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const token = sessionStorage.getItem('jwt');
      try {
        const res = await axios.get('http://127.0.0.1:5001/api/getCart',
          {
            headers:{
              'Auth': 'Bearer '+token
            }
          }

        );
        console.log(res.data.products);
        setCart(res.data.products);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCart();
  }, []);

    return(
        <>
        <h1>Cart </h1>
        <Paper sx={{ height: 400, width: '100%' }}>
      {/* <DataGrid
        rows={cart}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        ppriceSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      /> */}
      {cart.map((item,index) => (
        <>
        <h1>{item.productId._id}</h1>
        <h1>{item.productId.name}</h1>
        <h1>{item.productId.price}</h1>

        <h1>{item.quantity}</h1>
        </>
      ))}
    </Paper>
    <h1>this is the toal price {totalPrice} $</h1>
        </>
    )
}
