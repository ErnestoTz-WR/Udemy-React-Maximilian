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

## `useState` for forms

We can use this hook to bind data coming from a form. We have 2 options in this scenario:

1. Multiple `useState` (one for each input).
2. Single `useState` (only for once submission button).

Each version has its pros and cons.

### Multiple `States`

It can store changes on every input separately which means data loss is not a concern at all. However, we could end up in redundant code.

1. Create a `useState` per input.
2. Create each function.
3. Bind the function to its appropriate HTML element.

```JavaScript
function ExpenseForm() {
  const [enteredTitle,setEnteredTitle] = useState('');
  const [enteredAmount,setEnteredAmount] = useState('');
  const [enteredDate,setEnteredDate] = useState('');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    console.log(enteredTitle);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    console.log(enteredAmount);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    console.log(enteredDate);
  }
  return(
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type='text' onChange={titleChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type='number'min="0.01" step="0.01" onChange={amountChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type='date' min="2023-01-01" max="2025-12-31" onChange={dateChangeHandler}/>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}
```

### Single `useState`

It provides a cleaner code but we need to make sure that all data and previous state is stored properly.

1. Create a single state, this will require a unique `input` variable and an object as a parameter for `useState`,
2. Inside the object we declare each input,
3. Create a function per input,
4. On every function we copy first the previous state of the object and then update the variable which changed.

```JavaScript
function ExpenseForm() {
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: ''
  });

  const titleChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: event.target.value };
    });
  };

  const amountChangeHandler = (event) => {
     setUserInput((prevState) => {
      return {...prevState, enteredAmount: event.target.value };
    });
  };

  const dateChangeHandler = (event) => {
     setUserInput((prevState) => {
      return {...prevState, enteredDate: event.target.value };
    });
  }
  return(
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type='text' onChange={titleChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type='number'min="0.01" step="0.01" onChange={amountChangeHandler}/>
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type='date' min="2023-01-01" max="2025-12-31" onChange={dateChangeHandler}/>
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}
```

> **NOTE:** This `prevState` syntax forces React to return the actual previous state of the application, if not we could end up working with a previous state which belong 2 or 3 past states since it was schedule to be executed later. It is explained on the vide 55.

## Two way binding
In order to create a two way binding we simply need to add the `value` attribute to the HTML element with the appropriate variable (in this case `enteredTitle`, `enteredAmount` and `enteredDate`):

```JavaScript
return (
  <form onSubmit={submitHandler}>
    <div className="new-expense__controls">
      <div className="new-expense__control">
        <label>Title</label>
        <input
          type="text"
          onChange={titleChangeHandler}
          value={enteredTitle} // 2 way binding 
        />
      </div>
      <div className="new-expense__control">
        <label>Amount</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={enteredAmount} // 2 way binding
          onChange={amountChangeHandler}
        />
      </div>
      <div className="new-expense__control">
        <label>Date</label>
        <input
          type="date"
          min="2023-01-01"
          max="2025-12-31"
          value={enteredDate} // 2 way binding
          onChange={dateChangeHandler}
        />
      </div>
    </div>
    <div className="new-expense__actions">
      <button type="submit">Add Expense</button>
    </div>
  </form>
);
```

## Child-to-parent component communication (bottom up)

We basically create an eventListener on the parent component which will be trigger by the child component. This event listener will be passed as a `prop`. We can't skip component communication so we have to pass props through each intermediate component.

> One convention which can help is to save the prop as `"on-The Action to be Listen to"` (in this case `onSaveExpenseData`\ `onAddExpense` which refers to the submit button of a new expense item).

Steps:
1. Create the eventListener method on the parent/intermediate component, we can receive information for this method as parameters (this information will come from the child component).
2. Pass the created method as a `prop`
3. On the child component get the all the `props`
4. Execute the event on the desired placed and pass the necessary data.

```JavaScript
// ***************** Parent/Intermediate component ************
function NewExpense() {

  //1.
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random.toString()
    }
    console.log(expenseData);
  }

  return(
    //2.
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
    </div>
  );
}

// ****************** Child component *************

function ExpenseForm(props) { //3.
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    props.onSaveExpenseData(expenseData); //4.
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };
```

## "Lifting the Sate up"

We can only communicate from child to parent component. 

Communication between "sibling" components is not possible. That's why we need to use the closest element related to both components.   
We will store the state there and either modify the provided data or we can also pass it to the child component which will modify it.