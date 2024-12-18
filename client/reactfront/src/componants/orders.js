import * as React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'useName', headerName: 'useName', width: 130 },
    { field: 'items', headerName: 'items', width: 130 },
    { field: 'price', headerName: 'price', width: 130 },


  ];
  const rows = [
    { id: 1, useName: 'Snow', items: 'Jon', price: 35 },
    { id: 2, useName: 'Lannister', items: 'Cersei', price: 42 },
    { id: 3, useName: 'Lannister', items: 'Jaime', price: 45 },
    { id: 4, useName: 'Stark', items: 'Arya', price: 16 },
    { id: 5, useName: 'Targaryen', items: 'Daenerys', price: 100 },
    { id: 6, useName: 'Melisandre', items: null, price: 150 },
    { id: 7, useName: 'Clifford', items: 'Ferrara', price: 44 },
    { id: 8, useName: 'Frances', items: 'Rossini', price: 36 },
    { id: 9, useName: 'Roxie', items: 'Harvey', price: 65 },
  ];
  const getTotalPrice = (rows) => rows.reduce((acc, row) => acc + (row.price || 0), 0);
const totalPrice = getTotalPrice(rows);
  const paginationModel = { pprice: 0, ppriceSize: 5 };

export default function Orders() {
    return(
        <>
        <h1>Orders </h1>
        <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        ppriceSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    <h1>this is the toal price {totalPrice} $</h1>
        </>
    )
}
