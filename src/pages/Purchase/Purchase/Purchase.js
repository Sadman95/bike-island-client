import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../backend/api";
import PlaceOrderModal from "../../PlaceOrder/PlaceOrderModal/PlaceOrderModal";

const Purchase = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`${baseUrl}/cycles/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    return () => {
      setProduct(null);
    };
  }, [id]);
  return (
    <>
      <Container sx={{ mt: 24 }}>
        <Grid
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            alignItems: "center",
          }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 4, md: 12 }}
        >
          <Box>
            <img width={"100%"} src={product.productImg} alt="" />
          </Box>
          <Box sx={{ padding: 4, textAlign: "justify" }}>
            <Typography
              mb="16px"
              variant="h4"
              component="div"
              fontWeight="bold"
            >
              {product.productTitle}
            </Typography>
            <Typography
              mb="24px"
              variant="p"
              component="div"
              fontWeight="medium"
              color="GrayText"
            >
              {product.productDesc}
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold">
              ${product.productPrice}
            </Typography>
            <Button onClick={handleOpen} variant="contained" color="error">
              Place Order
            </Button>
            <PlaceOrderModal
              product={product}
              open={open}
              handleClose={handleClose}
            ></PlaceOrderModal>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default Purchase;
