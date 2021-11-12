import { TableContainer, Table, TableBody, TableCell, TableRow, TableHead, Button,Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ManageModal from './ManageModal/ManageModal';

const ManageProducts = () => {

    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/cycles')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])



    return (
        <div>
            <TableContainer sx={{ mt: 2 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Image</TableCell>
                <TableCell align="center">Product Title</TableCell>
                <TableCell align="center">Product Description</TableCell>
                <TableCell align='center'>Product Price($)</TableCell>
                <TableCell align='center'>Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img width="100px" src={row.productImg} alt="img" />
                  </TableCell>
                  <TableCell align="center">{row.productTitle}</TableCell>
                  <TableCell align="center">{row.productDesc}</TableCell>
                  <TableCell align="center">{row.productPrice}</TableCell>
                  <TableCell align="right">
                    
                    <Button
                      onClick={handleOpen}
                      variant="contained"
                      color="secondary"
                    >
                      Update
                    </Button>
                    <ManageModal id={row._id} image={row.productImg} name={row.productTitle} description={row.productDesc} price={row.productPrice} open={open} handleClose={handleClose}></ManageModal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    );
};

export default ManageProducts;