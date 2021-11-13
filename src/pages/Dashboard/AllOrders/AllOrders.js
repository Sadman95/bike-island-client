import { Table, TableContainer, TableBody, TableHead, TableCell, TableRow, Button, Paper, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';


const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [remove, setRemove] = useState(false);
    const [shipped, setShipped] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:5000/allOrders')
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [])


    /* confirm */
    const confirmOrder = id =>{
        fetch(`http://localhost:5000/orders/${id}`)
        .then(res => res.json())
        .then(data => {
          if(data.status === 'pending'){
            updateStatus(id,data);
          }
        })
    }

    const updateStatus = (id, data) =>{
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
          if(result.modifiedCount === 1){
            setShipped(true);
          }
        })
    }

    /* delete */
    const deleteOrder = id =>{
      fetch(`http://localhost:5000/allOrders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount === 1) {
            setRemove(true);
            const restOrders = orders.filter((order) => order._id !== id);
            setOrders(restOrders);
          }
        });
    };
    


    return (
        <div>
            {remove && <Alert severity="info">Order is deleted!</Alert>}
            {shipped && <Alert severity='success'>Order Shipped Successfully!</Alert>}
                <TableContainer sx={{mt: 2}} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Id</TableCell>
                          <TableCell align="center">User Email</TableCell>
                          <TableCell align="center">Phone Number</TableCell>
                          <TableCell align="center">Location</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell>
                            <TableCell align="center">{row.userEmail}</TableCell>
                            <TableCell align="center">{row.phoneNumber}</TableCell>
                            <TableCell align="center">{row.address}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">
                            <Button sx={{mb: 1}} onClick={()=>confirmOrder(row._id)} variant='contained' color= 'secondary'>Confirm</Button>
                                <Button onClick={()=>deleteOrder(row._id)} variant='contained' color='error'>Delete</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
            
        </div>
    );
};

export default AllOrders;