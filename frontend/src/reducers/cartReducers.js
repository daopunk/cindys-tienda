import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find((x)=>x.product === item.product);

      if (existItem) {
        // don't add item bc it's already in the cart
        return { ...state, cartItems: state.cartItems.map((x)=>x.product === existItem.product ? item : x)}
      } else {
        // add item
        return { ...state, cartItems: [...state.cartItems, item] }
      }

    case CART_REMOVE_ITEM:
      return { ...state, cartItems: state.cartItems.filter((x)=>x.product !== action.payload )}

    case CART_SAVE_SHIPPING:
      return { ...state, shippingAddress: action.payload }

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload }

    default:
      return state
  }
}