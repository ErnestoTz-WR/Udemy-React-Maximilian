# 11 Food Order Application

## Notes

### Separating `Context & Provider` logic.

When using Context and separating the logic between `Context & Provider` (In this case `cart-context.js` and `CartProvider.js`) REMEMBER we **always have to call the functions defined on the `context` file (`cart-context`) event if the `useState` hook of the variables is defined on the `Provider` file (`CartProvider`)**.


### Conditional styles

```JS
 const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`
 ```