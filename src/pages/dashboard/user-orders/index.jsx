import {
	Alert,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../backend/api";
import useAuth from "../../../hooks/useAuth";

const UserOrders = () => {
	const { user } = useAuth();
	const [myOrders, setMyOrders] = useState([]);
	const [remove, setRemove] = useState(false);

	useEffect(() => {
		fetch(`${baseUrl}/orders?email=${user.email}`)
			.then((res) => res.json())
			.then((data) => setMyOrders(data));
	}, [user.email]);

	/* delete order */
	const deleteOrder = (id) => {
		fetch(`${baseUrl}/orders/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deletedCount === 1) {
					setRemove(true);
					const restOrders = myOrders.filter((order) => order._id !== id);
					setMyOrders(restOrders);
				}
			});
	};

	return (
		<>
			{remove && <Alert severity="info">Product is deleted!</Alert>}
			{myOrders.length !== 0 ? (
				<TableContainer sx={{ mt: 2 }} component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Product Image</TableCell>
								<TableCell align="center">Product Title</TableCell>
								<TableCell align="center">Product Price</TableCell>
								<TableCell align="center">Status</TableCell>
								<TableCell align="center">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{myOrders.map((row) => (
								<TableRow
									key={row._id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										<img width="100px" src={row.image} alt="img" />
									</TableCell>
									<TableCell align="center">{row.title}</TableCell>
									<TableCell align="center">${row.price}</TableCell>
									<TableCell align="center">{row.status}</TableCell>
									<TableCell align="center">
										<Button
											onClick={() => deleteOrder(row._id)}
											variant="contained"
											color="error"
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				" "
			)}
		</>
	);
};

export default UserOrders;
