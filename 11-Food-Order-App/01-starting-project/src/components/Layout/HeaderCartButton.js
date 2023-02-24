import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {

  const cartCtx = useContext(CartContext);
  const [btnBump, setBtnBump] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  },0);
  
  const {items} = cartCtx;
  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`

  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    
    setBtnBump(true);

    const timer = setTimeout(()=> {
      setBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  },[items]);


  return(
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span> Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;