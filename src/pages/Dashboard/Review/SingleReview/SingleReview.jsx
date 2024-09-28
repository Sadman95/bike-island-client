import { CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { baseUrl } from "../../../../backend/api";
import useAuth from "../../../../hooks/useAuth/useAuth";

const SingleReview = ({ order }) => {
  const { image, title } = order;
  const { user } = useAuth();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    data.userName = user.displayName;
    data.imgUrl = image;
    data.title = title;
    fetch(`${baseUrl}/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          swal("Hello!", "...review is added!");
        }
      });

    reset();
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={image}
            alt="orderImg"
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                style={{ display: "block", width: "100%" }}
                placeholder="Give your review"
                {...register("reviewMsg")}
              />
              <br />
              <input
                style={{ display: "block", width: "100%" }}
                type="number"
                placeholder="Rating out of 5"
                {...register("rating", { maxLength: 1 })}
              />
              <br />
              <br />
              <input type="submit" value="Send" className="btn btn-primary" />
            </form>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default SingleReview;
