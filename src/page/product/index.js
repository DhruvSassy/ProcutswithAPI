import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  setProduct,
  categorydetailProduct,
} from "../../redux/actions/ProductAction";
import ProductComponent from "../../components/ProductCard/index.js";
import ProductSearch from "../../components/Search";
import { searchProduct } from "../../redux/actions/ProductAction";

const ProductList = () => {
  const { products } = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const location = useLocation();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setInput(value);

    dispatch(searchProduct(value));
  };

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(setProduct());
    } else {
      dispatch(categorydetailProduct(location.pathname.replace("/", "")));
    }
  }, [dispatch, location.pathname]);
  return (
    <>
      <ProductSearch  handleChange={handleChange} input={input} />
      <ProductComponent products={products} navigate={navigate} />
    </>
  );
};

export default ProductList;