import React, { forwardRef, useEffect, useState } from "react";

import {Card  , Snackbar   } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { storeCart, selectedProduct } from "../../redux/actions/ProductAction";

import ImageZoom from "../../components/Imagezoom";
import CardDetails from "../../components/Productdetails";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" direction="up" {...props} />;
});

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, cart } = useSelector((state) => state.allProducts);
  const [open, setOpen] = useState(false);

  const { productId } = useParams();

  //Call Single Product API
  useEffect(() => {
    dispatch(selectedProduct(productId));
  }, [dispatch, productId]);

  //Navigate to Home Page
  const homeHandler = () => {
    navigate("/");
  };

  //Add to Cart Product
  const addProductToCart = () => {
    const isexist =cart.filter((rec) => rec.id === products.id)
    if (isexist.length) {
      setOpen(true)
    } else {      
      cart.push(products);
      dispatch(storeCart(cart));
    } 
  };

  //Alert Box close 
  const handleClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  return (
    <>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  style={{marginTop:1000}}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          This product already add in cart!
        </Alert>
      </Snackbar>
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
        <ImageZoom products={products} />
      </div>
      <div style={{ marginTop: "-83%" }}>
        <CardDetails
          addProductToCart={addProductToCart}
          products={products}
          homeHandler={homeHandler}
        />
        
      </div>
    </Card>
    </>
  );
};

export default ProductDetail;