# 4 React State and Events

When working with events we can refer to the by adding the type of event and pointing to the proper function. We do not need to call the function with parenthesis since that would execute it right away instead of waiting for the eventListener.

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
        <button onclick={clickHandler}>Click me!</button> // eventListener
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

What happens behind the scenes is that we are telling react to re-execute the Component function with the new variable state. This does not happen immediately if we `console.log` the value of the updated variable right on the following line of code we will still see the previous value, React schedules the update and executes it accordingly.

## Hooks notes

1. They should be executed inside the Component function.
2. They should not be called inside a nested function.
3. They usually start with the `use` word.

