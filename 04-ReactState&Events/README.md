# 4 React State and Events

*The exercise is being develop on the "03-Module/01-starting-setup" application*

## Event Listeners

When working with events we can refer to them by adding the type of event and pointing to the proper function. 

We do not need to call the function with parenthesis since that would execute it right away, instead we want the eventListener to execute it.

Steps:
1. Create the function which will be executed by the eventListener
2. Add the event which should be trigger (in this case `onClick`) on the proper HTML element
3. Give the proper parameters.

```JavaScript

function ExpenseItem(props){
  function clickHandler() {
    console.log('clicked!!');
  }

  return (
    <Card className="expense-item">
      <div className="expense-item__description">
        <h2> {props.title} </h2>
        <div className="expense-item__price"> $ {props.amount} </div>
        <button onClick={clickHandler}>Click me!</button> // eventListener
      </div>
    </Card>
  )
}

export default ExpenseItem;
```

It is a convention that we call functions which are called by an event handler with the `Handler` termination. That way we can differentiate them form the other functions.

## State - making components dynamic

Regular variables are not reevaluated. If we want React to reevaluate the content displayed and make it dynamic, we need to use one of the so-called hooks, the `useState` hook.

### `useState`

It always return 2 values.   
It returns an array, the first value is the variable itself and the second variable is a function to updating that. 

1. Import it from the library
2. Called that function inside the component function
3. Provide a `useState` value as a variable
4. We can use array destruction to separate both variables (`const [value1, value2] = useState(assignedValue)`)
5. Call `setFunction` with the new value.

> It is convention to use a name for the variable and then to repeat the variable name and add `set` for the returned function.

```JavaScript
import {useState} from 'react'; // 1.
import ExpenseDate from './ExpenseDate';
import Card from './Card'
import './ExpenseItem.css'

function ExpenseItem(props){

  const [title, setTitle] = useState(props.title); // 2, 3 & 4

  function clickHandler() {
    setTitle('Updated'); // 5
    console.log(title);
  }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2> {title} </h2>
        <div className="expense-item__price"> $ {props.amount} </div>
        <button onClick={clickHandler}>Click me!</button>
      </div>
    </Card>
  )
}

export default ExpenseItem;

```

What happens behind the scenes is that we are telling react to **re-execute the Component function** with the new variable state. 
However, this does not happen immediately if we `console.log` the value of the updated variable right on the following line of code we will still see the previous value, React schedules the update and executes it accordingly.

With `State` React will look for changes only in this specific component using the hook. (Not in every component).

### Hooks notes

* They should be executed inside the Component function.
* They should not be called inside a nested function.
* They usually start with the `use` word.

### State 

`useState` register changes only in this specific component using the hook. (Not in every component). It actually registers it for an specific component instance, if the application uses more than one instance of the same component, ever item receives their own state.

Only the specific instance using the state is reevaluated if there are several similar components only the one which trigger the change will be revaluated.

`useState` keeps track of how many times it has been called, this way it knows the initial state registered of each variable (in the example above the first state is props.title).

