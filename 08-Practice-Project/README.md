# 8 - Project Practice

## Important notes

### Passing CSS classes to child components as props

When using CSS modules we need to import the CSS file and apply those classes similar to calling `props`. When using a styling on the parent component which will be used as well on the child component we need a trick to apply these stylings.

1. Import the CSS module into the parent component.
2. Pass the classes to the child Custom Component as props
3. Use template literal to apply the styles on the Child component

```JavaScript
// Parent Component (AddUsers.js)
import Card from "../UI/Card";
import classes from './AddUsers.module.css' // 1.

const AddUser = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card className={classes.input}>// 2.
      <form onSubmit={submitHandler}>
        <label htmlFor="user-name">User Name:</label>
        <input name="user-name" type="text" />
        <label htmlFor="user-age">User Age:</label>
        <input name="user-age" type="number" />
        <button type="submit">Submit</button>
      </form>
    </Card>
  );
};


// Child Component (Card.js)
import classes from './Card.module.css'

const Card = props => {
  return(
    <div className={`${classes.card} ${props.className}`}> //3. 
      {props.children}
    </div>
  );
}

```
> In this case `classes.card` come from `'./Card.module.css'` and `props.className` come from `'./AddUsers.module.css'`

### Empty `useState`

We can define an empty `useState`, it will be instantiated as `undefined` this will allow us to later on declare any value we want (such as an object). However it is advised to declare an state with a predefine type even if it is an empty string, array or object.

In case it is an object and we need to clear the state of that variable, we can define it as `null`.