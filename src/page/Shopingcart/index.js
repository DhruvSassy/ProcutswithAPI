import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";

import { clearCart, storeCart } from "../../redux/actions/ProductAction";

import "./index.css";
import { useNavigate } from "react-router-dom";

export default function BasicTable() {
  const { cart } = useSelector((state) => state.allProducts);
  const [productsInCart, setProducts] = useState(cart);
  const [open, setOpen] = useState(false);
  const [seletedpro, setSelectedPro] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, current) =>
      total + current.price * current.count || total + current.price,
    0
  );

  //Count Qty
  const onQuantityChange = (i, count) => {
    productsInCart[i].count = count;
    setProducts([...productsInCart]);
  };

  //Open Pop-up msg
  const handleClickOpen = (id) => {
    setSelectedPro(id);
    setOpen(true);
  };

  //Delete Selected Product
  const handledeletetrue = () => {
    const test = productsInCart.filter((rec) => rec.id !== seletedpro);
    setProducts([...test]);
    setOpen(false);
    dispatch(storeCart(test));
  };

  //Close pop up msg
  const handleClose = () => {
    setOpen(false);
  };

  //Delete All Products
  const handledelteall = () => {
    dispatch(clearCart());
    window.location.reload("/cart", false);
  };

  //Payments
  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };
  
  const handleOrder = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_4H7PP2p2WT2qfc",
      currency: "USD",
      amount: totalAmount * 100,
      name: "Urban Company",
      description: "Thanks for purchasing",
      timeout: 200,

      handler: function (response) {
        navigate("/success");
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  //Grand Total
  const card = (
    <React.Fragment>
      <CardContent
        style={{
          backgroundColor: "lightblue",
          textAlign: "center",
          padding: 1,
        }}
      >
        <Typography variant="body2">
          <h1 style={{ fontSize: "2rem", padding: 0 }}>Total</h1>
        </Typography>
      </CardContent>
      <Typography>
        {productsInCart.filter(
          (product) => product.stock < product.count || product.count <= 0
        ).length > 0 ? (
          <p style={{ margin: 10, color: "red" }}>Please make cart proper</p>
        ) : (
          <h2 style={{ marginLeft: 30, marginTop: 30, fontSize: "1rem" }}>
            Grand Total:{`${totalAmount}$ ` || 0}
          </h2>
        )}
      </Typography>

      <CardActions>
        {productsInCart.filter(
          (product) => product.stock < product.count || product.count <= 0
        ).length > 0 ? (
          <p style={{ margin: 10, color: "red" }}></p>
        ) : (
          <Button
            variant="contained"
            onClick={handleOrder}
            style={{ width: "100%" }}
          >
            CheckOut
          </Button>
        )}
      </CardActions>
    </React.Fragment>
  );

  //Cart Product
  return (
    <>
      {productsInCart?.length === 0 ? (
        <span className="empty-text">Your basket is currently empty</span>
      ) : (
        <TableContainer component={Paper} enableStickyHeader>
          <Table
            sx={{ minWidth: 650, mt: 10 }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Image</h3>
                </TableCell>
                <TableCell>
                  <h3>Name</h3>
                </TableCell>
                <TableCell align="left">
                  <h3>Description</h3>
                </TableCell>
                <TableCell align="left">
                  <h3>Price&nbsp;</h3>
                </TableCell>
                <TableCell align="left">
                  <h3>Qty&nbsp;</h3>
                </TableCell>
                <TableCell align="left">
                  <h3>Actions&nbsp;</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsInCart?.map((product, i) => (
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="product">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: 100 }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="product">
                    {product.title}
                  </TableCell>

                  <TableCell align="left">{product.description}</TableCell>

                  {product.stock < product.count ? (
                    <p align="left" style={{ marginTop: 36, marginLeft: 25 }}>
                      {product.price}$
                    </p>
                  ) : (
                    <TableCell align="left">
                      {product.price * product.count || product.price * 1}$
                    </TableCell>
                  )}

                  <TableCell align="left">
                    <input
                      type="number"
                      className="countinput"
                      value={product.count}
                      defaultValue={1}
                      min="0"
                      onChange={(event) => {
                        onQuantityChange(i, event.target.value);
                      }}
                    />
                    {product.stock < product.count || product.count <= 0 ? (
                      <p style={{ color: "red", marginTop: 22 }}>
                        Out of Stock
                      </p>
                    ) : (
                      ""
                    )}
                  </TableCell>

                  <TableCell align="left">
                    <button
                      className="btn remove-btn"
                      onClick={() => handleClickOpen(product.id)}
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        style={{ backgroundColor: "lightblue" }}
                      >
                        {"Are you sure you want to delete this product?"}
                      </DialogTitle>
                      <DialogActions style={{ backgroundColor: "lightblue" }}>
                        <Button onClick={handleClose} style={{ color: "red" }}>
                          Disagree
                        </Button>
                        <Button
                          onClick={handledeletetrue}
                          autoFocus
                          style={{ color: "darkgreen" }}
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {productsInCart.length >= 2 && (
        <center>
          <button
            style={{
              marginTop: 15,
              padding: 5,
              borderWidth: 1,
            }}
            onClick={handledelteall}
          >
            RemoveAll
          </button>
        </center>
      )}
      {productsInCart.length >= 1 && (
        <Box style={{ width: "300px", float: "right", marginTop: 40 }}>
          <Card variant="outlined">{card}</Card>
        </Box>
      )}
    </>
  );
}
