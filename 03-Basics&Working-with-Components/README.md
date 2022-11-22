# 03 React Basics and working with components

## Components

A component in React is just a function, special kind of function, but at the end a function. We return the end-state HTML code we want to render.

We define components on a new file and then export it and import it wherever we would like to use it.

> One important rule is that we the returned HTML element should have only one root HTML tag.


## Import CSS


## Props

In order to communicate parent-child components we have `props`. Every time we create a new component React will make sure there is one object passed as parameters and it is the `props` object. From the parent component we can include additional information inside the tag, this data will be inserted as key-value information into the `props` object. If we want to use dynamic data we need to include it inside single curly braces `{}`

```JavaScript
import Expenses from "./components/Expenses";

function App() {
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
  ];
  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses expenses={expenses}/>
    </div>
  );
}

export default App;
```

```JavaScript
import ExpenseItem from "./ExpenseItem";
import './Expenses.css'

function Expenses(props) {
  return (
    <div className="expenses">
      <ExpenseItem
        title={props.expenses[0].title}
        amount={props.expenses[0].amount}
        date={props.expenses[0].date}
      ></ExpenseItem>
    </div>
  );
}

export default Expenses;
```
## Composition => `props.children`

In case we want to include content inside a custom created component we need to specify that on the **"shel"** component by adding the reserve property `props.children`.

```JavaScript
import './Card.css'

function Card(props){
  const classes = 'card '+ props.className; // Dynamic class
  return(
    <div className={classes}>{props.children}</div>
  );
}

export default Card;
```

> **TIP**: In this case we also passed `className` as props and then we dynamically assign a default class + any other class we pass with props for the shell component.

