import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../backend/api";
import PlaceOrderModal from "../../components/modals/place-order";

const Purchase = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`${baseUrl}/cycles/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  /* const incCart = useCallback(() => {
    const newCart = [...cart, product];
    setCart(newCart)
  }, []);
 const subCart = useCallback(() => {
    if (cart) {
      setCart(cart - 1);
    }
  }, []); */

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
            <img width={"100%"} src={product?.productImg} alt="" />
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
            <Box>
              {/* onclick handler to be added */}
              <Button>
                <AddBoxIcon color="action" />
              </Button>
              {cart}
              {/* onclick handler to be added */}

              <Button>
                <IndeterminateCheckBoxIcon
                  color={cart !== 1 ? "action" : "disabled"}
                />
              </Button>
            </Box>
            <Typography variant="h3" component="div" fontWeight="bold">
              {/* productprice to be calculated with order amount */}$
              {product.productPrice}
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
