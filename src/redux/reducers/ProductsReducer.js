import { ActionTypes } from "../constants/action-types";

export const initialState = {
  products: [],
  product: {},
  category: [],
  cart: [],
  isLoading:true
};

export const productRdeucers = (state = initialState, { type, payload }) => {

  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, products: payload,isLoading:false };
    case ActionTypes.SET_CATEGORY:
      return { ...state, category: payload };
    case ActionTypes.CART_PRODUCT:
      return{...state, cart: payload};
    case ActionTypes.CLEAR_CART:
      return{...state,cart:[]}
    default:
      return state;
  }
};
