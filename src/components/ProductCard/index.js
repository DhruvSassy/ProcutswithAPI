/* eslint-disable no-unused-vars */
import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Container } from "@mui/system";
import { Box } from "@mui/material";

const ProductComponent = ({ products, navigate }) => {
  const renderList = products?.map((products, i) => {
    const { id, title, images, price, category } = products;

    //Navigate to Product detail page
    const detailHandler = () => {
      navigate(`/${category}/${id}`);
    };
    
    return (
      <>
        <Container key={i} onClick={detailHandler}>
          <ImageListItem key={i}>
            <img
              src={images[0]}
              style={{ width: "252px", height: "252px", marginTop: "1200px" }}
              alt={title}
              loading="lazy"
              onClick={detailHandler}
            />

            <ImageListItemBar
              title={title}
              subtitle={`$${price}`}
              position="below"
              key={i}
              onClick={detailHandler}
            />
          </ImageListItem>
        </Container>
      </>
    );
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            width: 300,
            height: 300,
            mt: 10,
          },
        }}
      >
        {renderList}
      </Box>
    </>
  );
};

export default ProductComponent;
