import { Button, Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { baseUrl } from "../../../../backend/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ManageModal = ({ id, open, handleClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    fetch(`${baseUrl}/cycles/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          swal("Good job!", "Product is updated!", "success");
          handleClose();
        }
      });

    reset();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              style={{
                width: "90%",
                display: "block",
                margin: "0px auto 16px auto",
              }}
              type="text"
              placeholder="Product Title"
              {...register("name")}
            />

            <input
              style={{
                width: "90%",
                display: "block",
                margin: "0px auto 16px auto",
              }}
              type="url"
              placeholder="Image Url"
              {...register("image")}
            />

            <textarea
              style={{
                display: "block",
                width: "90%",
                margin: "0px auto 16px auto",
              }}
              type="text"
              placeholder="Description"
              {...register("description")}
            />

            <input
              style={{
                display: "block",
                width: "90%",
                margin: "0px auto 16px auto",
              }}
              type="number"
              placeholder="Product Price"
              {...register("price")}
            />

            <Button variant="contained" color="info" type="submit">
              SEND
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ManageModal;
