import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch('https://polar-bastion-89865.herokuapp.com/cycles', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => console.log(result))

        reset()
    };
    return (
        <Box sx={{mt: 8, textAlign: 'center'}}>
            <Typography color='primary' variant='h4' component='div'>
                Add A Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="image">Image Url</label>
                <br />
                <input  id='image' placeholder='Image URL' type='url' {...register("productImg",  { required: true })} />
                <br />
                <label htmlFor="title">Title</label>
                <br />
                <input  id='title' placeholder='Product Title' type='text' {...register("productTitle",  { required: true })} />
                <br />
                <label htmlFor="desc">Description</label>
                <br />
                <textarea  id='desc' placeholder='Product description' type='text' {...register("productDesc",  { required: true })} />
                <br />
                <label htmlFor="price">Price</label>
                <br />
                <input  id='price' placeholder='Product Price' type='number' {...register("productPrice",  { required: true })} />
                <br />
      
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input style={{marginTop: 10}} type="submit" value='Add Product'/>
    </form>
        </Box>
    );
};

export default AddProduct;