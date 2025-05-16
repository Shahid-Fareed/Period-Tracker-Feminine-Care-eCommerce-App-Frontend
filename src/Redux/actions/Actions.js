import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SET_SHIPPING_INFO,
  SUBSCRIPTION_TYPE,
  UPDATE_CART_ITEM_QUANTITY,
  ADD_TOKEN,
} from "../ActionTypes";

export const addItemToCart = (data) => ({
  type: ADD_TO_CART,
  payload: data,
});
export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index,
});
export const updateCartItemQuantity = (itemId, quantity) => {
  return {
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { itemId, quantity },
  };
};
export const setShippingInfo = (info) => ({
  type: SET_SHIPPING_INFO,
  payload: info,
});

export const emptyCart = () => ({
  type: CLEAR_CART,
});

export const sybscriptionType = (name) => ({
  type: SUBSCRIPTION_TYPE,
  payload: name,
});

export const addTokenType = (token) => ({
  type: ADD_TOKEN,
  payload: token,
});
