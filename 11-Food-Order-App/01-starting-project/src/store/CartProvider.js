import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  amount: 0
}

const cartReducer = (state, action) => {
  
  if (action.type === 'ADD') {
    const updatedAmount = state.amount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingCartItem = state.items[existingItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem, amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    else {
      updatedItems = state.items.concat(action.item);
    }
    
    return {
      items: updatedItems,
      amount: updatedAmount
    }
  }
  
  if ( action.type === 'REMOVE') {

    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updatedAmount = state.amount - existingItem.price;
    let updatedItems;
    if ( existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      amount: updatedAmount
    }
  }

  return defaultCartState;
}

const CartProvider = props => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState)
  
  const addItemCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD',
      item: item
    })
  }

  const removeItemCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE',
      id: id
    })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.amount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler
     
  }
  
  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
}

export default CartProvider;