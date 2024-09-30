import { Button, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { baseUrl } from "../../../backend/api";
import useAuth from "../../../hooks/useAuth";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "white",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	textAlign: "center",
};

const PlaceOrderModal = ({ product, open, handleClose }) => {
	const history = useNavigate();

	const { user } = useAuth();

	const { productTitle, productPrice, productImg } = product;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		data.status = "pending";
		data.image = productImg;
		data.title = productTitle;
		data.price = productPrice;

		fetch(`${baseUrl}/orders`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					swal("Well Done!", "Order is placed successfully!", "success");
					handleClose();
					history.replace("/products");
				}
			});
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					<Typography variant="h6" component="div">
						{productTitle}
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input type="number" disabled defaultValue={productPrice} />
						<br />
						{errors.productPrice && <span>This field is required</span>}
						<br />
						<input
							type="text"
							defaultValue={user.displayName}
							{...register("userName")}
						/>
						<br />
						<br />
						<input
							type="email"
							defaultValue={user.email}
							{...register("userEmail", { required: true })}
						/>
						<br />
						{errors.userEmail && <span>This field is required</span>}
						<br />
						<input
							type="number"
							placeholder="Phone Number"
							{...register("phoneNumber", { required: true })}
						/>
						<br />
						{errors.phoneNumber && <span>This field is required</span>}
						<br />
						<input
							type="text"
							placeholder="Address"
							{...register("address", { required: true })}
						/>
						<br />
						{errors.address && <span>This field is required</span>}
						<br />

						<Button type="submit" variant="contained" color="success">
							Confirm Shipping
						</Button>
					</form>
				</Box>
			</Fade>
		</Modal>
	);
};

export default PlaceOrderModal;
