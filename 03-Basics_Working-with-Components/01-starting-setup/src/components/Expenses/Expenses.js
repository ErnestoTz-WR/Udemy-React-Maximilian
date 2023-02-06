import React, {useState} from 'react';

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";

function Expenses(props) {

  const [filteredYear, setFilteredYear] = useState('2020');

  const onYearFilterHandler = year =>{
    setFilteredYear(year);
    console.log('On Expenses, year: '+filteredYear);
  }

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={filteredYear} onYearFilter={onYearFilterHandler}/>
        <ExpenseItem
          title={props.expenses[0].title}
          amount={props.expenses[0].amount}
          date={props.expenses[0].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.expenses[1].title}
          amount={props.expenses[1].amount}
          date={props.expenses[1].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.expenses[2].title}
          amount={props.expenses[2].amount}
          date={props.expenses[2].date}
        ></ExpenseItem>
        <ExpenseItem
          title={props.expenses[3].title}
          amount={props.expenses[3].amount}
          date={props.expenses[3].date}
        ></ExpenseItem>
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
