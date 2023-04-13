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
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./index.css";
import { storeCart } from "../../redux/actions/ProductAction";

export default function BasicTable() {
  const { cart } = useSelector((state) => state.allProducts);
  const [productsInCart, setProducts] = useState(cart);
  const [open, setOpen] = useState(false);
  const [seletedpro,setSelectedPro] = useState();
  const dispatch = useDispatch();

  const onQuantityChange = (i, count) => {
    productsInCart[i].count = count
  setProducts([...productsInCart]);
    
  };

  const handleClickOpen = (id) => {
    setSelectedPro(id)
    setOpen(true);
  };

  const handledeletetrue = () => {
    const test = productsInCart.filter((rec)=> rec.id !== seletedpro)
    setProducts([...test]);
    setOpen(false);
    dispatch(storeCart(test))
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handledelteall = () => {
    productsInCart.length = 0;
    return cart;
    
  };

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
              {productsInCart?.map((product,i) => (
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
                        onQuantityChange(i, event.target.value);
                      }}
                    >
                      {[...Array(10).keys()]?.map((number) => {
                        const num = number + 1;
                        return (
                          <option  value={num} key={num} defaultValue="1">
                            {num}
                          </option>
                        );
                      })}
                    </select>
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
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete this product?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button
                          onClick={ handledeletetrue}
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
      {productsInCart.length >= 2 && (
        <center><Button  style={{marginTop:15,border:"1px",borderColor:"blue",borderWidth:1}} onClick={handledelteall}>RemoveAll</Button></center>
      )}
    </>
  );
}
