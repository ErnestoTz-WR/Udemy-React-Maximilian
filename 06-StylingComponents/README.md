# 6 Styling React Components

When working with inline styles on React, we can add the `style` property inside the element.
This element expects an object so we can use the following syntax:

```JavaScript
const isValid = true;

<label style={{ color: !isValid ? "red" : "black" }}>Course Goal</label>
<input
  style={{
    borderColor: !isValid ? "red" : "#ccc",
    background: !isValid ? "salmon" : "transparent",
  }}
  type="text"
  onChange={goalInputChangeHandler}
/>
```

If the CSS property we are trying to target contains a dash in the middle (e.g. `background-color`, `border-size`), we need to include the Camel Case version:

* `background-color` => `backgroundColor`
* `border-size` => `borderSize`

> Inline styling (as the previous example) will always override any other styling. For this reason it is not recommended to use them unless that is what we intend.

## Setting Classes Dynamically

A better alternative is to add a class dynamically on the component. For this we need to:

1. Define the class on the CSS file.
2. Apply the class on the React component using a template literal (with back ticks **``**)

```CSS
.form-control.invalid input {
  bordxwer-color: red;
  background: rgb(218, 168, 168);
}
.form-control.invalid label{
  color: red;
}
```

```JavaScript
  <div className={`form-control ${!isValid ? 'invalid' : ''}`}> // 2. 
    <label>Course Goal</label>
    <input
      type="text"
      onChange={goalInputChangeHandler}
    />
  </div>
```

## Styled Components

When we define styles by adding a CSS file and importing it to the component we are actually defining styles globally, this means any other component with the same class name will inherit those styles.
If we want to scope the styles to each component we can achieve in the following ways:

### Style Components Package

By using the [Style-components](https://styled-components.com/) package.

### CSS Modules

This will split the code applied to each component.

Steps:
1. Declare the CSS file of the component as a `module`,
2. Import it (with that name as well) and declare a variable for that file (in this case it is `styles`),
3. Include the styles on every component similar to how we use `props`

```JavaScript

// **** Button.js
import styles from './Button.module.css'; //2.

const Button = props => {
  return (
    <button 
      type={props.type} 
      className={styles.button} // 3.
      onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;

// ******* Button.module.css    1.
.button {
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;
}

.button:focus {
  outline: none;
}

.button:hover,
.button:active {
  background: #ac0e77;
  border-color: #ac0e77;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
}
```

When using CSS modules Dynamic styling will change a bit:

```JavaScript
// Without CSS Modules
<div className={`form-control ${!isValid ? 'invalid' : ''}`}>

// With CSS Modules
<div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
```

We have to ways of pointing at the class defined on the CSS file:

* Similar to props: `styles.className` (in this case `styles.invalid`)
* Pointing at the exact class within square braces `styles.['class-name']` (in this case `styles['form-control']`).

