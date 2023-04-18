import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {PopperUnstyled,ClickAwayListener} from "@mui/base";
import { styled } from "@mui/joy/styles";
import {Button,MenuList,MenuItem} from "@mui/joy";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { categoryProduct } from "../../redux/actions/ProductAction";

import './index.css'


const Popup = styled(PopperUnstyled)({
  zIndex: 1000,
});

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const  category  = useSelector((state) => state.allProducts.category);
  const {cart} = useSelector((state) => state.allProducts);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  //Open category list menu
  const handleClickevent = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //Close category list menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Call Category product list API
  useEffect(() => {
    dispatch(categoryProduct())
  }, [dispatch]);

  //Navigate to category proudct
  const handleCategory = (value) => {
   navigate(`/${value}`)
  };

  //Category list selected item and close menu
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      setAnchorEl(null);
    } else if (event.key === "Escape") {
      anchorEl?.focus();
      setAnchorEl(null);
    } 
  };

  //Navigate to home page
  const handleHome = () => {
      navigate("/");
  }

  //Navigate to Cart Page
  const cartHandler = () => {
   navigate('/cart');
  }

  //Style of category menu
  const myComponent = {
    width: '200px',
    height: '550px',
    overflowY: 'scroll',
    overflowX: 'hidden'
}

  return (
      <AppBar>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
          
          <Typography variant="h6" color="inherit" component="div" onClick={handleHome} style={{cursor:"pointer"}}>
            Ecommerce
          </Typography>
          <Button
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="outlined"
            color="neutral"
            onClick={handleClickevent}
            sx={{ borderRadius: 0, ml: 7, color: "white" ,mr:120}}
          >
            Category
          </Button>
          <Popup
            role={undefined}
            id="composition-menu"
            open={open}
            anchorEl={anchorEl}
            style={myComponent}
            disablePortal
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 4],
                },
              },
            ]}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                variant="outlined"
                onKeyDown={handleListKeyDown}
                onClick={handleClose}
                sx={{ boxShadow: "md", bgcolor: "background.body" }}
              >
                {category.map((value) => (
                  <MenuItem onClick={()=>handleCategory(value)} >{value}</MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Popup>
          
              <ShoppingCartIcon onClick={cartHandler}/>
              <span className="count1">{cart.length}</span>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
