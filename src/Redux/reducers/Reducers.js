import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAR_CART,
  ADD_TOKEN,
} from "../ActionTypes";

const reducers = (initialState = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (Array.isArray(action.payload)) {
        // Add multiple items to cart
        const updatedState = [...initialState];
        action.payload.forEach((itemToAdd) => {
          const existingItem = updatedState.find(
            (item) => item._id === itemToAdd._id
          );
          if (existingItem) {
            // Item already exists in cart, increase quantity
            updatedState.forEach((item) => {
              if (item._id === itemToAdd._id) {
                item.quantity += 1;
              }
            });
          } else {
            // Item does not exist in cart, add with quantity 1
            updatedState.push({ ...itemToAdd, quantity: 1 });
          }
        });
        AsyncStorage.setItem("cartItems", JSON.stringify(updatedState));
        return updatedState;
      } else {
        // Add single item to cart
        const existingItem = initialState.find(
          (item) => item._id === action.payload._id
        );
        if (existingItem) {
          // Item already exists in cart, increase quantity
          const updatedState = initialState.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          });
          AsyncStorage.setItem("cartItems", JSON.stringify(updatedState));
          return updatedState;
        } else {
          // Item does not exist in cart, add with quantity 1
          const updatedState = [
            ...initialState,
            { ...action.payload, quantity: 1 },
          ];
          AsyncStorage.setItem("cartItems", JSON.stringify(updatedState));
          return updatedState;
        }
      }

    case REMOVE_FROM_CART:
      const deletedArray = initialState.filter((item, index) => {
        return index !== action.payload;
      });
      AsyncStorage.setItem("cartItems", JSON.stringify(deletedArray));
      return deletedArray;
    case UPDATE_CART_ITEM_QUANTITY:
      // update item quantity in cart
      const updatedArray = initialState
        .map((item) => {
          if (item._id === action.payload.itemId) {
            if (action.payload.quantity > 0) {
              return { ...item, quantity: action.payload.quantity };
            } else {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null);
      return updatedArray;

    case CLEAR_CART:
      AsyncStorage.setItem("cartItems", JSON.stringify([]));
      return [];

    case ADD_TOKEN:
      const token = action.payload;

      return token;

    default:
      AsyncStorage.setItem("cartItems", JSON.stringify(initialState));
      return initialState;
  }
};

export default reducers;
