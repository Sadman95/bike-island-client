import { Button, Container, Grid, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../backend/api";
import Product from "../product";

const Products = () => {
	const [products, setProducts] = useState([]);

	//aos init:

	useEffect(() => {
		AOS.init({
			duration: 2000,
		});
		AOS.refresh();
	}, []);

	const navigate = useNavigate();

	const goToStore = () => {
		navigate("/products");
	};

	useEffect(() => {
		fetch(`${baseUrl}/cycles`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
			});
	}, []);
	return (
		<div id="products">
			<Container sx={{ mt: 28, textAlign: "center" }}>
				<Typography
					mb="24px"
					fontWeight="bold"
					textAlign="center"
					variant="h4"
					component="div"
				>
					Products
				</Typography>
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 12, sm: 12, md: 12 }}
				>
					{products.slice(0, 6).map((product) => (
						<Product key={product._id} product={product}></Product>
					))}
				</Grid>
				<Button onClick={goToStore} variant="contained" color="warning">
					Bike Store
				</Button>
			</Container>
		</div>
	);
};

export default Products;
