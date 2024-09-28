import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../backend/api";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch(`${baseUrl}/cycles`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    reset();
  };

  const addProductStyle = {
    mt: 8,
    textAlign: "center",
    bgcolor: "lightgray",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "32px",
  };

  return (
    <Box sx={addProductStyle}>
      <Typography color="primary" variant="h4" component="div">
        Add A Product
      </Typography>
      <form
        style={{
          width: "50%",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "24px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="image">Image Url</label>
        <br />
        <input
          style={{ width: "90%", marginBottom: "16px" }}
          id="image"
          placeholder="Image URL"
          type="url"
          {...register("productImg", { required: true })}
        />
        <br />
        <label htmlFor="title">Title</label>
        <br />
        <input
          style={{ width: "90%", marginBottom: "16px" }}
          id="title"
          placeholder="Product Title"
          type="text"
          {...register("productTitle", { required: true })}
        />
        <br />
        <label htmlFor="desc">Description</label>
        <br />
        <textarea
          style={{ width: "90%", marginBottom: "16px" }}
          id="desc"
          placeholder="Product description"
          type="text"
          {...register("productDesc", { required: true })}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          style={{ width: "90%", marginBottom: "16px" }}
          id="price"
          placeholder="Product Price"
          type="number"
          {...register("productPrice", { required: true })}
        />
        <br />

        {errors.exampleRequired && <span>This field is required</span>}
        <Button variant="contained" color="success" type="submit">
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
