import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./page/product";

import "./App.css";
import Header from "./components/Header/";
import ProductDetail from "./page/product/productDetail";
import axiosUtil from "./config/axios";
import Error from "./page/Error/";
import Shopingcart from "./page/Shopingcart";
import UserForm from "./page/UserDeatails";

axiosUtil.initalise();

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/"  exact Component={ProductList} />
          <Route path="/:product" Component={ProductList} />
          <Route path="/:product/:productId" exact Component={ProductDetail} />
          <Route path="/cart" exact Component={Shopingcart} />
          <Route path="/address" exact Component={UserForm} />
          <Route path="*"  Component={Error} />
        </Routes>
      </Router>
  );
}

export default App;
