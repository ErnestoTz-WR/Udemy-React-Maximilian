import React, { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";

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
        {props.expenses.map((expense) => (
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

// Another way to do it

// const Expenses = ({ expenses }) => {
//   return (
//       <div className='expenses'>
//           {expenses.map((entry) => (
//               <ExpenseItem
//                   title={entry.title}
//                   amount={entry.amount}
//                   date={entry.date}
//               />
//           ))}
//       </div>
//   );
// };
