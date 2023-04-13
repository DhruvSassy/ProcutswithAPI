import React, { useEffect } from "react";

import Card from "@mui/material/Card";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { storeCart, selectedProduct } from "../../redux/actions/ProductAction";

import ImageZoom from "../../components/Imagezoom";
import CardDetails from "../../components/Productdetails";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, cart } = useSelector((state) => state.allProducts);
 

  const { productId } = useParams();

  useEffect(() => {
    dispatch(selectedProduct(productId));
  }, [dispatch, productId]);

  const homeHandler = () => {
    navigate("/");
  };

  const addProductToCart = () => {
    cart.push(products);
    dispatch(storeCart(cart));
  };
  return (
    <Card sx={{ mt: 15 }}>
      <div
        className="container"
        style={{
          width: 1300,
          height: 1050,
          marginLeft: "5%",
          margin: 10,
          display: "inline-block",
        }}
      >
        <ImageZoom products={products}/>
      </div>
      <div style={{ marginTop: "-83%" }}>
        <CardDetails addProductToCart={addProductToCart} products={products} homeHandler={homeHandler}/>
      </div>
    </Card>
  );
};

export default ProductDetail;
