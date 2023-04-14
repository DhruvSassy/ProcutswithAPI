import React from "react";
import {
  Button,
  CardActions,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";

const CardDetails = (props) => {
  const { addProductToCart, products, homeHandler } = props;

  const { title, price, description, rating, discountPercentage, stock } =
    products;

  return (
    <>
      <CardContent
        style={{
          marginLeft: "50%",
          textAlign: "left",
          fontWeight: 100,
          lineHeight: 1.5,
          display: "'flex'",
          marginTop: 35,
        }}
      >
        <Typography gutterBottom variant="h3" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          ${price}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ color: "green" }}
        >
          {discountPercentage} %off
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Stock:{stock}
        </Typography>
        <br />
        <Typography variant="h6" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" gutterBottom color="text.secondary">
          <Rating name="read-only" value={parseInt(rating)} readOnly></Rating>
        </Typography>
        <CardActions>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "black",
              backgroundColor: "orange",
              borderColor: "green",
              marginRight:3
            }}
            onClick={homeHandler}
          >
            Back
          </Button>
        
          <Button
            size="large"
            variant="outlined"
            sx={{
              color: "black",
              backgroundColor: "orange",
              borderColor: "green",
            }}
            onClick={addProductToCart}
          >
            Add to Cart
          </Button>
        </CardActions>
      </CardContent>
    </>
  );
};

export default CardDetails;