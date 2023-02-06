# 05 Rendering Lists and Conditional Content

*The exercise is being develop on the "03-Module/01-starting-setup" application*

## Display dynamic Lists

We use `.map` which is a built-in function from arrays. This will allow us to copy every element inside the array and map it to another specific object (in this case a Custom Component)

```JavaScript
function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("2020");

  const onYearFilterHandler = (year) => {
    setFilteredYear(year);
    console.log("On Expenses, year: " + filteredYear);
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onYearFilter={onYearFilterHandler}
        />
        {props.expenses.map((expense) => ( //Dynamic List (for each "expense" in expenses create the following:)
          <ExpenseItem
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))}
      </Card>
    </div>
  );
}

export default Expenses;

```

## Using Stateful Lists

Here is a [useful link](https://www.techiediaries.com/react-usestate-hook-update-array/).

We need to use the code which was used to update objects by using `useState`:

```JavaScript
const DUMMY_Expenses = [
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
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  }
];

function App() {

  const [expenses,setExpenses] = useState(DUMMY_Expenses);

  const addExpenseHandler = (expense) => {
    setExpenses((prevArray) => { //Before including the new element we need to copy the previous state of the Array.
      return [expense, ...prevArray];
    })
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expenses expenses={expenses}/>
    </div>
  );
}

export default App;
```

