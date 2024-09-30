import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/product.module.css";

const ProductCard = ({ product }) => {
  const history = useNavigate();
  const { _id, productImg, productTitle, productDesc, productPrice } = product;

  const handlePurchase = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <Grid item xs={4} sm={4} md={4}>
      <Card
        className="product"
        sx={{ boxShadow: 0, maxWidth: 345, textAlign: "center", py: 2 }}
      >
        <CardMedia
          component="img"
          height="280"
          image={productImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            fontWeight="medium"
            gutterBottom
            variant="h5"
            component="div"
          >
            {productTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {productDesc.slice(0, 18)}
          </Typography>
          <Typography
            color="orange"
            fontWeight="medium"
            gutterBottom
            variant="h5"
            component="div"
          >
            Price ${productPrice}
          </Typography>
        </CardContent>

        <Button
          onClick={() => handlePurchase(_id)}
          variant="contained"
          color="primary"
        >
          Purchase
        </Button>
      </Card>
    </Grid>
  );
};

export default ProductCard;
