import React, { useState } from "react";
import { useSelector } from "react-redux";

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
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";

import './index.css'

export default function BasicTable() {
  const { cart } = useSelector((state) => state.allProducts);
  const [productsInCart, setProducts] = useState(cart);
  const [open, setOpen] = useState(false);

  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onProductRemove = (product) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  const handledeletetrue = (product) => {
    setOpen(false);
    onProductRemove(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {productsInCart?.length === 0 ? (
        <span className="empty-text">Your basket is currently empty</span>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, mt: 10 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price&nbsp;</TableCell>
                <TableCell align="left">Qty&nbsp;</TableCell>
                <TableCell align="left">Actions&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsInCart?.map((product) => (
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
                  <TableCell align="left">
                    {product.price * product.count || product.price * 1}$
                  </TableCell>
                  <TableCell align="left">
                    <select
                      className="count"
                      value={product.count}
                      onChange={(event) => {
                        onQuantityChange(product.id, event.target.value);
                      }}
                    >
                      {[...Array(10).keys()]?.map((number) => {
                        const num = number + 1;
                        return (
                          <option value={num} key={num} defaultValue="1">
                            {num}
                          </option>
                        );
                      })}
                    </select>
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <Button
                      className="btn remove-btn"
                      onClick={handleClickOpen}
                    >
                      <RiDeleteBin6Line size={20} />
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete this product?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={handleClose} >
                          Disagree
                        </Button>
                        <Button
                          onClick={() => handledeletetrue(product)}
                          autoFocus
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
    </>
  );
}
