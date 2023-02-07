import React, {useState} from 'react';
import ExpenseForm from './ExpenseForm';

import './NewExpense.css'

function NewExpense(props) {

  const [openForm, setOpenForm] = useState(false);

  const toggleFormHandler = () => {
    setOpenForm(!openForm);
  }

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    props.onAddExpense(expenseData);
    setOpenForm(false);
  }

  let newExpenseContent = <button onClick={toggleFormHandler}>Add New Expense</button>;

  if(openForm) {
    newExpenseContent = <ExpenseForm 
      onSaveExpenseData={saveExpenseDataHandler}
      onCancel={toggleFormHandler}/>;
  }

  return(
    <div className="new-expense">
      {newExpenseContent}
      {/* <button onClick={toggleFormHandler}>Add New Expense</button>
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/> */}
    </div>
  );
}

export default NewExpense;