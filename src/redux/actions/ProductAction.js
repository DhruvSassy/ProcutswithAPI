import axios from "axios";
import { ActionTypes } from "../constants/action-types";

export const setProduct = () => {
  return (dispatch) => {
    return axios
      .get("/products")
      .then((response) => {
        if (response?.status === 200) {
          dispatch({
            type: ActionTypes.SET_PRODUCTS,
            payload: response.data,
          });
          return Promise.resolve(response);
        }
      })
      .catch((err) => {
        return Promise.resolve(err);
      });
  };
};

export const selectedProduct = (productID) => {
  
  return (dispatch) => {
    return axios
      .get(`/products/${productID}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.SELECTED_PRODUCT,
            payload: response.data,
          });
          return Promise.resolve(response);
        }
      })
      .catch((err) => {
        return Promise.resolve(err);
      });
  };
};

export const searchProduct = (title) => {
  return (dispatch) => {
    return axios
      .get(`/products/search?q=${title}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.SET_PRODUCTS,
            payload: response.data,
          });
          return Promise.resolve(response);
        }
      })
      .catch((err) => {
        return Promise.resolve(err);
      });
  };
};

export const categoryProduct = () => {
  return (dispatch) => {
    return axios
      .get("/products/categories")
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.SET_CATEGORY,
            payload: response.data,
          });
          return Promise.resolve(response);
        }
      })
      .catch((err) => {
        return Promise.resolve(err);
      });
  };
};

export const categorydetailProduct = (value) => {
  return (dispatch) => {
    return axios
      .get(`/products/category/${value}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.SET_PRODUCTS,
            payload: response.data,
          });
          return Promise.resolve(response);
        }
      })
      .catch((err) => {
        return Promise.resolve(err);
      });
  };
};

export const storeCart = (data) => {
  return (dispatch) => {
          dispatch({
            type: ActionTypes.CART_PRODUCT,
            payload: data,
          });
         
        }
}


