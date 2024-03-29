import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {

  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const addToCartHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };

  const removeFromCartHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) =>
        <CartItem 
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addToCartHandler.bind(null, item)}
          onRemove={removeFromCartHandler.bind(null, item.id)}
          />
      )}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
