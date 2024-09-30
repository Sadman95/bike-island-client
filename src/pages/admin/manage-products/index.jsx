import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { baseUrl } from "../../../backend/api";
import ManageModal from "../../../components/modals/manage-modal";

const ManageProducts = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/cycles`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  /* product delete */
  const handleDelete = (id) => {
    fetch(`${baseUrl}/cycles/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          swal("Are you sure you want to delete this?", {
            buttons: ["No!", "Yes!"],
          });
        }
        const restProducts = products.filter((product) => product._id !== id);
        setProducts(restProducts);
      });
  };

  return (
    <div>
      <TableContainer sx={{ mt: 2 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Image</TableCell>
              <TableCell align="center">Product Title</TableCell>
              <TableCell align="center">Product Description</TableCell>
              <TableCell align="center">Product Price($)</TableCell>
              <TableCell align="center">Action</TableCell>
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
                    sx={{ mb: 1 }}
                    onClick={handleOpen}
                    variant="contained"
                    color="secondary"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(row._id)}
                    variant="contained"
                    color="success"
                  >
                    Delete
                  </Button>
                  <ManageModal
                    id={row._id}
                    image={row.productImg}
                    name={row.productTitle}
                    description={row.productDesc}
                    price={row.productPrice}
                    open={open}
                    handleClose={handleClose}
                  ></ManageModal>
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
