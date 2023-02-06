# 03 React Basics and working with components

## Components

A component in React is just a function, special kind of function, but at the end a function. We return the end-state HTML code we want to render.

Define a new component: 
1. Create a new file (Usually with the component name)
2. Create the function (with the same file name)
3. Export the file
4. Import it wherever we would like to use it. *When using custom components inside the application we should use Upper Case on the HTML tags `<CustomComponent>`

> One important rule is that we the returned HTML element should have only one root HTML tag.


## Import CSS

Simply import the CSS file created into the appropriate component.

> Instead of using `class` we need to use `ClassName`

## Dynamic data

We can add dynamic data inside single curly braces:

```JavaScript
import './ExpenseDate.css'

function ExpenseDate(props) {
  const month = props.date.toLocaleString('en-US', { month: 'long'});
  const day = props.date.toLocaleString('en-US', { day: '2-digit'});
  const year = props.date.getFullYear();

  return(
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
```
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
### Composition => `props.children`

We use composition to avoid code duplication, when we have similar code (it can be HTML, CSS or JS code) and we want to make our application more clean and clear.

In case we want to include content inside a custom created component we need to specify that on the **"shel"** component by adding the reserve property `props.children`. The value of this **children prop** will always be the content define inside the opening and closing tags of the Custom Component.

```JavaScript
// ********** Card component *********** //
import './Card.css'

function Card(props){
  const classes = 'card '+ props.className; // Dynamic class
  return(
    <div className={classes}>{props.children}</div>
  );
}

export default Card;


// ************ Component using Card ********* //

function ExpenseItem(props){
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

> **TIP**: In this case we also passed `className` as props and then we dynamically assign a default class + any other class we pass with props for the shell component.

